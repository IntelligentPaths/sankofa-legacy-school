#!/usr/bin/env node
/**
 * Usage: node scripts/process-images.mjs <source-file> <target-path>
 *
 * Example: node scripts/process-images.mjs public/raw/girl.png public/images/students/identity-african.jpg
 *
 * Converts any input image to optimized JPG (quality 85) and max-width 1920px.
 * Preserves aspect ratio. Creates target directory if it doesn't exist.
 * Also generates a WebP variant alongside for modern browsers.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { existsSync } from "node:fs";

const [source, target] = process.argv.slice(2);

if (!source || !target) {
  console.error("Usage: node scripts/process-images.mjs <source> <target>");
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`Source file not found: ${source}`);
  process.exit(1);
}

await mkdir(dirname(target), { recursive: true });

// Main JPG output
await sharp(source)
  .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 85, progressive: true, mozjpeg: true })
  .toFile(target);

// WebP variant (same basename, .webp extension)
const webpTarget = target.replace(/\.(jpg|jpeg|png)$/i, ".webp");
await sharp(source)
  .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(webpTarget);

console.log(`✓ Processed: ${source}`);
console.log(`  → ${target}`);
console.log(`  → ${webpTarget}`);
