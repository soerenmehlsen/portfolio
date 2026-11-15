import { readFile, writeFile, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// Trim ADTS AAC at the frame nearest 00:47, then rewrap without re-encoding.
// Usage: node scripts/prepare-background-track.mjs /path/to/source.aac
const input = process.argv[2];
if (!input) throw new Error("Provide the source AAC file path.");
const bytes = await readFile(input);
const rates = [
  96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025,
  8000, 7350,
];
const rate = rates[(bytes[2] >> 2) & 15];
if (!rate) throw new Error("Unsupported AAC sample rate.");
const packets = [];
let offset = 0,
  samples = 0;
while (offset + 7 <= bytes.length) {
  if (bytes[offset] !== 255 || (bytes[offset + 1] & 246) !== 240)
    throw new Error("Expected ADTS AAC frames.");
  const length =
    ((bytes[offset + 3] & 3) << 11) |
    (bytes[offset + 4] << 3) |
    (bytes[offset + 5] >> 5);
  if (length < 7 || offset + length > bytes.length)
    throw new Error("Truncated AAC frame.");
  packets.push({ offset, samples });
  samples += 1024 * ((bytes[offset + 6] & 3) + 1);
  offset += length;
}
if (samples / rate <= 47)
  throw new Error("Source must be longer than 47 seconds.");
const first = packets.reduce((best, p) =>
  Math.abs(p.samples / rate - 47) < Math.abs(best.samples / rate - 47)
    ? p
    : best
);
const temporary = join(tmpdir(), `portfolio-mizmo-${process.pid}.aac`);
await writeFile(temporary, bytes.subarray(first.offset));
try {
  const output = new URL(
    "../public/audio/mizmo-hello-the-sun-from-47s.m4a",
    import.meta.url
  ).pathname;
  const result = spawnSync(
    "afconvert",
    [
      temporary,
      output,
      "-f",
      "m4af",
      "-d",
      "0",
      "--prime-override",
      "0",
      "0",
      "?",
    ],
    { encoding: "utf8" }
  );
  if (result.status !== 0)
    throw new Error(result.stderr || "AAC rewrapping failed.");
} finally {
  await unlink(temporary);
}
console.log(
  `Prepared source audio from ${(first.samples / rate).toFixed(3)}s; ${((samples - first.samples) / rate).toFixed(3)}s remain. Original AAC packets preserved.`
);
