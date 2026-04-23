#!/usr/bin/env node
/**
 * Usage:
 *   node scripts/process-images.mjs <source> <target> [--duotone]
 *
 * With --duotone, applies a shadow→midtone→highlight color map matching
 * the Sankofa brand palette:
 *   - shadows   → near-black  #1C1B20
 *   - midtones  → deep amber  #E38C07
 *   - highlights→ primary gold #FBCD32
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { existsSync } from "node:fs";

const args = process.argv.slice(2);
const flags = args.filter(a => a.startsWith("--"));
const positional = args.filter(a => !a.startsWith("--"));
const [source, target] = positional;
const duotone = flags.includes("--duotone");

if (!source || !target) {
  console.error("Usage: node scripts/process-images.mjs <source> <target> [--duotone]");
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`Source file not found: ${source}`);
  process.exit(1);
}

await mkdir(dirname(target), { recursive: true });

function buildDuotoneLUT() {
  // 4-point gradient gives a richer tonal map than 3-point:
  // deep shadow → warm shadow → amber midtone → gold highlight
  // Highlight color is dialed back from #FBCD32 to #F5C04A so bright
  // areas don't all crush to the same neon-yellow.
  const stops = [
    { at: 0,   r: 0x0A, g: 0x08, b: 0x0C }, // near-pure black, deeper than near-black
    { at: 90,  r: 0x3A, g: 0x26, b: 0x0A }, // warm dark brown shadow
    { at: 180, r: 0xB8, g: 0x75, b: 0x18 }, // rich amber midtone
    { at: 255, r: 0xDB, g: 0xA1, b: 0x3C }, // darker richer gold — not neon
  ];

  const lut = { r: new Uint8Array(256), g: new Uint8Array(256), b: new Uint8Array(256) };
  const lerp = (a, b, t) => Math.round(a + (b - a) * t);

  for (let i = 0; i < 256; i++) {
    // Find the two stops this value falls between
    let lo = stops[0], hi = stops[stops.length - 1];
    for (let s = 0; s < stops.length - 1; s++) {
      if (i >= stops[s].at && i <= stops[s + 1].at) {
        lo = stops[s];
        hi = stops[s + 1];
        break;
      }
    }
    const range = hi.at - lo.at;
    const t = range === 0 ? 0 : (i - lo.at) / range;
    lut.r[i] = lerp(lo.r, hi.r, t);
    lut.g[i] = lerp(lo.g, hi.g, t);
    lut.b[i] = lerp(lo.b, hi.b, t);
  }
  return lut;
}

async function processImage(src, dst, useDuotone) {
  if (!useDuotone) {
    // Standard path: resize + encode
    await sharp(src)
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(dst);

    const webp = dst.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    await sharp(src)
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(webp);
    return;
  }

  // Duotone path: greyscale + mild contrast bump, then LUT to brand-palette RGB.
  // .linear(1.15, -15) replaces .normalise() — avoids crushing highlights by
  // stretching each image's histogram to the full 0..255 range.
  const { data, info } = await sharp(src)
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .greyscale()
    .linear(0.85, -10)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lut = buildDuotoneLUT();
  const rgb = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    rgb[i * 3 + 0] = lut.r[v];
    rgb[i * 3 + 1] = lut.g[v];
    rgb[i * 3 + 2] = lut.b[v];
  }

  const rawInput = {
    raw: { width: info.width, height: info.height, channels: 3 },
  };

  await sharp(rgb, rawInput)
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(dst);

  const webp = dst.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  await sharp(rgb, rawInput)
    .webp({ quality: 82 })
    .toFile(webp);
}

await processImage(source, target, duotone);

console.log(`✓ Processed${duotone ? " (duotone)" : ""}: ${source}`);
console.log(`  → ${target}`);
console.log(`  → ${target.replace(/\.(jpg|jpeg|png)$/i, ".webp")}`);
