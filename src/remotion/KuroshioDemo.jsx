import { AbsoluteFill, Freeze, Sequence, interpolate, useCurrentFrame } from "remotion";

import { SceneEnergy } from "./scenes/SceneEnergy";
import { SceneHandoff } from "./scenes/SceneHandoff";
import { ScenePredict } from "./scenes/ScenePredict";
import { C, CHAPTERS, F } from "./theme";

const SCENES = {
  energy: SceneEnergy,
  predict: ScenePredict,
  handoff: SceneHandoff,
};

function Cut({ duration, last, children }) {
  const frame = useCurrentFrame();
  const opacity = Math.min(
    interpolate(frame, [0, 7], [0, 1], { extrapolateRight: "clamp" }),
    last ? 1 : interpolate(frame, [duration - 8, duration - 1], [1, 0], { extrapolateLeft: "clamp" })
  );
  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
}

export function KuroshioDemo() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.canvas, fontFamily: F.sans }}>

      {CHAPTERS.map((chapter, index) => {
        const Scene = SCENES[chapter.id];
        return (
          <Sequence
            durationInFrames={chapter.duration}
            from={chapter.from}
            key={chapter.id}
            layout="none"
          >
            {/* A settled first-scene preview stays visible until the user presses Play. */}
            <Freeze frame={180} active={frame === 0}>
              <Cut duration={chapter.duration} last={index === CHAPTERS.length - 1}>
                <Scene />
              </Cut>
            </Freeze>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
