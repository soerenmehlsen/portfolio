/** One reusable, quiet 45ms click. Created only after the user enables sound. */
export function createInterfaceAudio() {
  if (typeof AudioContext === "undefined") return null;
  let context: AudioContext;
  try {
    context = new AudioContext({ latencyHint: "interactive" });
  } catch {
    return null;
  }
  const buffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * 0.045),
    context.sampleRate
  );
  const samples = buffer.getChannelData(0);
  let noise = 104729,
    filtered = 0;
  for (let i = 0; i < samples.length; i++) {
    const t = i / context.sampleRate;
    noise = (noise * 16807) % 2147483647;
    filtered += 0.18 * ((noise / 2147483647) * 2 - 1 - filtered);
    const envelope = Math.min(1, t / 0.002) * Math.exp(-t * 140);
    samples[i] =
      (filtered * 0.7 + Math.sin(t * Math.PI * 2 * 180) * 0.3) * envelope;
  }
  const output = context.createGain();
  output.gain.value = 0.15;
  output.connect(context.destination);
  let lastClick = -Infinity;
  return {
    resume: () => {
      void context.resume().catch(() => {});
    },
    suspend: () => {
      if (context.state !== "closed") void context.suspend().catch(() => {});
    },
    close: () => {
      void context.close().catch(() => {});
    },
    click: () => {
      if (context.state !== "running" || performance.now() - lastClick < 70)
        return;
      lastClick = performance.now();
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(output);
      source.onended = () => source.disconnect();
      source.start();
    },
  };
}
