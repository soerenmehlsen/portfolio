import { mkdir, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import assets from "../src/app/lib/image-assets.json" with { type: "json" };

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const outputDir = `${publicDir}/optimized`;
await mkdir(outputDir, { recursive: true });
const files = await readdir(publicDir);
const recipeTime = Math.max(
  (await stat(fileURLToPath(import.meta.url))).mtimeMs,
  (
    await stat(
      fileURLToPath(
        new URL("../src/app/lib/image-assets.json", import.meta.url)
      )
    )
  ).mtimeMs
);

// Resolve case-insensitively: historical asset names differ between Git and macOS.
for (const [src, widths] of Object.entries(assets)) {
  const filename = files.find(
    (file) => file.toLowerCase() === src.slice(1).toLowerCase()
  );
  if (!filename) throw new Error(`Missing source image: ${src}`);
  const input = `${publicDir}/${filename}`;
  const source = await stat(input);
  const stem = src
    .slice(1)
    .replace(/\.[^.]+$/, "")
    .toLowerCase();
  for (const width of widths) {
    for (const format of ["avif", "webp"]) {
      const output = `${outputDir}/${stem}-${width}.${format}`;
      const existing = await stat(output).catch(() => null);
      if (existing && existing.mtimeMs > Math.max(source.mtimeMs, recipeTime))
        continue;
      await sharp(input)
        .rotate()
        .resize({ width })
        [format]({ quality: format === "avif" ? 55 : 80 })
        .toFile(output);
    }
  }
  console.log(`Optimized ${src}: ${widths.length} sizes, AVIF + WebP`);
}
