import { interpolate, useCurrentFrame } from "remotion";

import { Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
import { useRamp } from "../timing";
import { C, F } from "../theme";

const START_ANGLE = -222;
const SWEEP = 264;

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx, cy, r, fromDeg, toDeg) {
  const [x1, y1] = polar(cx, cy, r, fromDeg);
  const [x2, y2] = polar(cx, cy, r, toDeg);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

const BANDS = Array.from({ length: 34 }, (_, i) => {
  const base = 0.1 + Math.abs(Math.sin(i * 0.9)) * 0.28 + (i < 4 ? 0.5 : 0);
  return { i, base: Math.min(0.95, base), sideband: i === 17 || i === 23 };
});

export function ScenePredict() {
  const frame = useCurrentFrame();
  const settle = useRamp(10, 46);
  const degrade = useRamp(64, 140);
  const score = 96 - 25 * degrade;
  const alertIn = useRamp(120, 150);

  const angle = START_ANGLE + SWEEP * (score / 100) * settle;
  const tone = interpolate(degrade, [0, 0.55, 1], [0, 0, 1], { extrapolateRight: "clamp" });
  const arcColor = tone > 0.5 ? C.flare : C.signal;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "126px 88px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Rise delay={0}>
            <Mono color={C.signal}>Predictive maintenance</Mono>
          </Rise>
          <Rise delay={4}>
            <Headline size={62}>
              We see the bearing fail <span style={{ color: C.flare }}>twelve days early.</span>
            </Headline>
          </Rise>
        </div>
        <Rise delay={10}>
          <Body size={20} style={{ maxWidth: 420, textAlign: "right" }}>
            Motor current signature analysis, scored continuously against the
            machine's own baseline — not a generic model.
          </Body>
        </Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 470px 1fr", gap: 20, flex: 1 }}>
        <Panel title="Current signature" meta="FFT · 0–600 Hz">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: "100%", minHeight: 220 }}>
            {BANDS.map((band) => {
              const grow = band.sideband ? band.base + 0.42 * degrade : band.base;
              const wobble = 1 + Math.sin((frame + band.i * 11) * 0.09) * 0.05;
              return (
                <span
                  key={band.i}
                  style={{
                    flex: 1,
                    height: `${Math.min(100, grow * 100 * settle * wobble)}%`,
                    background: band.sideband && degrade > 0.3 ? C.flare : "rgba(63,224,197,0.55)",
                    opacity: band.sideband && degrade > 0.3 ? 0.95 : 0.75,
                  }}
                />
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <Mono size={11}>0 Hz</Mono>
            <Mono size={11} color={degrade > 0.4 ? C.flare : C.boneFaint}>
              sideband ×2 detected
            </Mono>
            <Mono size={11}>600 Hz</Mono>
          </div>
        </Panel>

        <Panel title="Motor health" meta="Extrusion Line 02" bodyStyle={{ display: "grid", placeItems: "center" }}>
          <svg viewBox="0 0 400 340" style={{ width: "100%", maxWidth: 400 }}>
            <path
              d={arcPath(200, 190, 132, START_ANGLE, START_ANGLE + SWEEP)}
              fill="none"
              stroke="rgba(147,202,205,0.14)"
              strokeWidth={14}
              strokeLinecap="butt"
            />
            {Array.from({ length: 27 }).map((_, i) => {
              const a = START_ANGLE + (SWEEP * i) / 26;
              const [x1, y1] = polar(200, 190, 150, a);
              const [x2, y2] = polar(200, 190, i % 5 === 0 ? 162 : 157, a);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.hairlineStrong} strokeWidth={1} />
              );
            })}
            {settle > 0.02 ? (
              <path
                d={arcPath(200, 190, 132, START_ANGLE, angle)}
                fill="none"
                stroke={arcColor}
                strokeWidth={14}
                strokeLinecap="butt"
                style={{ filter: `drop-shadow(0 0 14px ${arcColor}66)` }}
              />
            ) : null}
            <text
              x={200}
              y={198}
              textAnchor="middle"
              fill={arcColor}
              style={{ fontFamily: F.mono, fontSize: 86, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em" }}
            >
              {Math.round(score * settle)}
            </text>
            <text
              x={200}
              y={230}
              textAnchor="middle"
              fill={C.boneFaint}
              style={{ fontFamily: F.mono, fontSize: 14, letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              health score
            </text>
            <text
              x={200}
              y={296}
              textAnchor="middle"
              fill={degrade > 0.5 ? C.flare : C.boneDim}
              style={{ fontFamily: F.mono, fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              {degrade > 0.5 ? "▼ 25 pts in 9 days" : "baseline nominal"}
            </text>
          </svg>
        </Panel>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "space-between" }}>
          <div
            style={{
              opacity: alertIn,
              transform: `translateX(${(1 - alertIn) * 24}px)`,
              border: `1px solid rgba(255,148,72,0.48)`,
              background: "rgba(255,148,72,0.08)",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, background: C.flare, borderRadius: 8 }} />
              <Mono size={12} color={C.flare}>Alert · high severity</Mono>
            </div>
            <Readout size={24} color={C.bone}>Bearing wear, drive end</Readout>
            <Body size={17} color={C.boneDim}>
              Sideband energy at 2× line frequency has risen 41% against this
              motor's own 90-day baseline. Confidence 87%.
            </Body>
          </div>

          <Panel title="Predicted threshold" meta="confidence band">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ position: "relative", height: 56 }}>
                <div style={{ position: "absolute", inset: "26px 0 auto", height: 2, background: "rgba(147,202,205,0.18)" }} />
                <div
                  style={{
                    position: "absolute",
                    left: "0%",
                    top: 26,
                    width: `${64 * alertIn}%`,
                    height: 2,
                    background: C.signal,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "56%",
                    top: 14,
                    width: "26%",
                    height: 26,
                    background: "rgba(255,148,72,0.18)",
                    border: `1px solid rgba(255,148,72,0.4)`,
                    opacity: alertIn,
                  }}
                />
                <div style={{ position: "absolute", left: 0, top: 40 }}>
                  <Mono size={11}>today</Mono>
                </div>
                <div style={{ position: "absolute", left: "62%", top: 40 }}>
                  <Mono size={11} color={C.flare}>day 12</Mono>
                </div>
                <div style={{ position: "absolute", right: 0, top: 40 }}>
                  <Mono size={11}>day 21</Mono>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Mono size={12}>Recommended</Mono>
                <Mono size={12} color={C.signal}>Schedule in next shutdown</Mono>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
