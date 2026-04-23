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

// Build a 256-entry RGB lookup table that maps luminance 0..255 through:
// shadow → midtone (at L=128) → highlight
function buildDuotoneLUT() {
  const shadow    = { r: 0x1C, g: 0x1B, b: 0x20 };
  const mid       = { r: 0xE3, g: 0x8C, b: 0x07 };
  const highlight = { r: 0xFB, g: 0xCD, b: 0x32 };
  const lut = { r: new Uint8Array(256), g: new Uint8Array(256), b: new Uint8Array(256) };
  const lerp = (a, b, t) => Math.round(a + (b - a) * t);
  for (let i = 0; i < 256; i++) {
    let r, g, b;
    if (i < 128) {
      const t = i / 128;
      r = lerp(shadow.r, mid.r, t);
      g = lerp(shadow.g, mid.g, t);
      b = lerp(shadow.b, mid.b, t);
    } else {
      const t = (i - 128) / 127;
      r = lerp(mid.r, highlight.r, t);
      g = lerp(mid.g, highlight.g, t);
      b = lerp(mid.b, highlight.b, t);
    }
    lut.r[i] = r; lut.g[i] = g; lut.b[i] = b;
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

  // Duotone path: greyscale + normalize, then LUT to brand-palette RGB
  const { data, info } = await sharp(src)
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .greyscale()
    .normalise()
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
