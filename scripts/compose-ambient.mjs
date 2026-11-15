import { mkdir, writeFile, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// Original composition: "Quiet Current". A 64-second, 60 BPM electronic loop,
// composed specifically for this portfolio; no sampled or third-party music.
const rate = 32000,
  seconds = 64,
  frames = rate * seconds;
const left = new Float64Array(frames),
  right = new Float64Array(frames);
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const add = (start, duration, midi, gain, pan, voice = "pad") => {
  const pad = voice === "pad",
    bass = voice === "bass";
  const frequency = hz(midi),
    samples = Math.floor(duration * rate);
  const l = Math.sqrt((1 - pan) / 2),
    r = Math.sqrt((1 + pan) / 2);
  for (let i = 0; i < samples; i++) {
    const t = i / rate;
    const attack = 1 - Math.exp(-t / (pad ? 2.2 : bass ? 0.035 : 0.045));
    const release = Math.min(1, (duration - t) / (pad ? 4 : 1.5));
    const envelope = pad
      ? attack * release ** 2
      : attack * Math.exp(-t / (bass ? 0.65 : 1.2)) * release;
    const phase = 2 * Math.PI * frequency * t;
    const tone = pad
      ? (Math.sin(phase) +
          0.3 * Math.sin(phase * 1.0017) +
          0.08 * Math.sin(phase * 3)) /
        1.42
      : bass
        ? Math.sin(phase) + 0.18 * Math.sin(phase * 2)
        : Math.sin(phase + 0.28 * Math.exp(-t / 0.25) * Math.sin(phase * 2)) +
          0.06 * Math.sin(phase * 3);
    const value = tone * envelope * gain;
    const index = (Math.floor(start * rate) + i) % frames;
    left[index] += value * l;
    right[index] += value * r;
  }
};
const chords = [
  [45, 52, 59, 60, 64],
  [41, 48, 52, 57, 60],
  [48, 55, 59, 62, 64],
  [43, 50, 57, 59, 62],
];
chords.forEach((chord, i) =>
  chord.forEach((note, j) =>
    add(i * 16, 21, note, j === 0 ? 0.028 : 0.032, (j - 2) * 0.28)
  )
);
const melody = [71, 76, 79, 76, 69, 72, 76, 72, 71, 74, 79, 74, 69, 71, 74, 71];
melody.forEach((note, i) =>
  add(i * 4 + 2, 6, note, 0.025, Math.sin(i * 1.7) * 0.45, "pluck")
);
for (let i = 0; i < 32; i++) {
  const root = chords[Math.floor(i / 8)][0] - 12;
  add(i * 2, 2.2, root, i % 4 === 0 ? 0.12 : 0.09, 0, "bass");
  // A small, soft electronic tick between pulses; no sharp percussion.
  let noise = 104729;
  for (let j = 0; j < rate * 0.045; j++) {
    noise = (noise * 16807) % 2147483647;
    const t = j / rate,
      envelope = Math.min(1, t / 0.004) * Math.exp(-t * 130);
    const tick = ((noise / 2147483647) * 2 - 1) * envelope * 0.006;
    const index = (Math.round((i * 2 + 1.25) * rate) + j) % frames;
    left[index] += tick * 0.65;
    right[index] += tick * 0.35;
  }
}
// Circular stereo echoes preserve the loop seam and add a soft spatial tail.
const dryL = left.slice(),
  dryR = right.slice();
for (const [delay, gain] of [
  [0.375, 0.16],
  [0.75, 0.12],
  [1.5, 0.09],
  [3, 0.06],
]) {
  const offset = Math.round(delay * rate);
  for (let i = 0; i < frames; i++) {
    const index = (i + offset) % frames;
    left[index] += dryR[i] * gain;
    right[index] += dryL[i] * gain;
  }
}
let peak = 0,
  energy = 0;
for (let i = 0; i < frames; i++) {
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  energy += left[i] ** 2 + right[i] ** 2;
}
const gain = Math.min(0.42 / peak, 0.1 / Math.sqrt(energy / (frames * 2)));
const wav = Buffer.alloc(44 + frames * 4);
wav.write("RIFF", 0);
wav.writeUInt32LE(wav.length - 8, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(rate, 24);
wav.writeUInt32LE(rate * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(frames * 4, 40);
for (let i = 0; i < frames; i++) {
  wav.writeInt16LE(Math.round(left[i] * gain * 32767), 44 + i * 4);
  wav.writeInt16LE(Math.round(right[i] * gain * 32767), 46 + i * 4);
}
const directory = new URL("../public/audio/", import.meta.url);
await mkdir(directory, { recursive: true });
const temporary = join(tmpdir(), `portfolio-quiet-current-${process.pid}.wav`);
await writeFile(temporary, wav);
try {
  const conversion = spawnSync(
    "afconvert",
    [
      "-f",
      "m4af",
      "-d",
      "aac ",
      "-b",
      "96000",
      "-q",
      "127",
      temporary,
      new URL("quiet-current.m4a", directory).pathname,
    ],
    { encoding: "utf8" }
  );
  if (conversion.status !== 0)
    throw new Error(
      conversion.stderr || "AAC encoding requires macOS afconvert."
    );
} finally {
  await unlink(temporary);
}
await unlink(new URL("soft-orbit.m4a", directory)).catch((error) => {
  if (error.code !== "ENOENT") throw error;
});
console.log(
  `Composed Quiet Current: ${seconds}s, stereo AAC, peak ${(peak * gain).toFixed(3)}.`
);
