import { AbsoluteFill, Freeze, Sequence, interpolate, useCurrentFrame } from "remotion";

import { GridBackdrop } from "./parts";
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
  const sweep = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const opacity = Math.min(
    interpolate(frame, [0, 7], [0, 1], { extrapolateRight: "clamp" }),
    last ? 1 : interpolate(frame, [duration - 8, duration - 1], [1, 0], { extrapolateLeft: "clamp" })
  );
  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
      {sweep < 1 && <div style={{
        position: "absolute", left: 0, right: 0, top: `${sweep * 100}%`, height: 1,
        background: `linear-gradient(90deg, transparent, ${C.brand}, transparent)`, opacity: 1 - sweep,
      }} />}
    </AbsoluteFill>
  );
}

export function KuroshioDemo() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.canvas, fontFamily: F.sans }}>
      <GridBackdrop opacity={0.9} />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(9,76,178,0.07), transparent 70%)",
        }}
      />

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

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 62%, rgba(39,39,42,0.06) 100%)",
        }}
      />
    </AbsoluteFill>
  );
}
