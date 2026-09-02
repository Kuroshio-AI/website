import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";

import { GridBackdrop, Mono } from "./parts";
import { SceneBlind } from "./scenes/SceneBlind";
import { SceneEnergy } from "./scenes/SceneEnergy";
import { SceneHandoff } from "./scenes/SceneHandoff";
import { SceneInstall } from "./scenes/SceneInstall";
import { ScenePredict } from "./scenes/ScenePredict";
import { SceneProof } from "./scenes/SceneProof";
import { C, CHAPTERS, F, VIDEO } from "./theme";

const SCENES = {
  blind: SceneBlind,
  install: SceneInstall,
  energy: SceneEnergy,
  predict: ScenePredict,
  handoff: SceneHandoff,
  proof: SceneProof,
};

/** Fades a scene in and out at its own boundaries so cuts never flash. */
function Cut({ duration, children, fadeIn = true }) {
  const frame = useCurrentFrame();
  const opacity = Math.min(
    fadeIn ? interpolate(frame, [0, 7], [0, 1], { extrapolateRight: "clamp" }) : 1,
    interpolate(frame, [duration - 8, duration - 1], [1, 0], { extrapolateLeft: "clamp" })
  );
  const sweep = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
      {sweep < 1 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${sweep * 100}%`,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${C.brand}, transparent)`,
            opacity: 1 - sweep,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
}

function Chrome() {
  const frame = useCurrentFrame();
  const active =
    CHAPTERS.find((c) => frame >= c.from && frame < c.from + c.duration) ?? CHAPTERS[0];
  const totalProgress = frame / VIDEO.durationInFrames;
  const seconds = frame / VIDEO.fps;
  const timecode = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    Math.floor(seconds % 60)
  ).padStart(2, "0")}`;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 74,
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${C.hairline}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 8,
              background: C.brand,
              opacity: frame % 40 < 20 ? 1 : 0.3,
            }}
          />
          <Mono size={13} color={C.ink}>
            Kuroshio AI · platform walkthrough
          </Mono>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mono size={13} color={C.brand}>
            {active.index} / 06
          </Mono>
          <span style={{ width: 1, height: 16, background: C.hairlineStrong }} />
          <Mono size={13} color={C.inkDim}>
            {active.label}
          </Mono>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 58,
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          borderTop: `1px solid ${C.hairline}`,
        }}
      >
        <Mono size={12} color={C.inkFaint}>
          {timecode}
        </Mono>
        <div style={{ position: "relative", flex: 1, height: 2, background: C.hairline }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: `${totalProgress * 100}%`,
              background: C.brand,
            }}
          />
          {CHAPTERS.map((c) => (
            <span
              key={c.id}
              style={{
                position: "absolute",
                left: `${(c.from / VIDEO.durationInFrames) * 100}%`,
                top: -4,
                width: 1,
                height: 10,
                background: C.hairlineStrong,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.inkFaint,
          }}
        >
          Illustrative data
        </span>
      </div>
    </AbsoluteFill>
  );
}

export function KuroshioDemo() {
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
            <Cut duration={chapter.duration} fadeIn={index > 0}>
              <Scene />
            </Cut>
          </Sequence>
        );
      })}

      <Chrome />

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
