import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/** Spring 0→1 that starts `delay` frames into the current sequence. */
export function useRise(delay = 0, damping = 200) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.6 } });
}

/** Linear 0→1 ramp between two local frames. */
export function useRamp(from, to) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Progressive stroke drawing without measuring the real path length. */
export function drawStyle(progress, length = 2400) {
  return {
    strokeDasharray: length,
    strokeDashoffset: length * (1 - progress),
  };
}
