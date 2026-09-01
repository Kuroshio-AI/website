import { interpolate } from "remotion";

import { Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
import { useRamp } from "../timing";
import { C, F } from "../theme";

const W = 940;
const H = 450;
const IDLE_FROM = 0.55;
const IDLE_TO = 0.72;

function powerAt(t) {
  if (t < 0.08) return 0.14 + t * 6.8;
  if (t < 0.5) return 0.69 + Math.sin(t * 23) * 0.055 + Math.sin(t * 7.3) * 0.045;
  if (t < IDLE_FROM) return 0.69 - (t - 0.5) * 8.8;
  if (t < IDLE_TO) return 0.245 + Math.sin(t * 34) * 0.014;
  if (t < 0.78) return 0.245 + (t - IDLE_TO) * 7.4;
  return 0.7 + Math.sin(t * 19) * 0.05 + Math.sin(t * 5) * 0.03;
}

const SAMPLES = Array.from({ length: 121 }, (_, i) => {
  const t = i / 120;
  return { t, x: t * W, y: H - powerAt(t) * (H - 42) - 18 };
});

const LINE = SAMPLES.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
const AREA = `${LINE} L${W} ${H} L0 ${H} Z`;

const ROWS = [
  { name: "Extrusion Line 02", type: "Unit 4 · Extruder", state: "Running", kw: 61.4, tone: C.signal },
  { name: "Cooling Pump Skid", type: "Unit 6 · Centrifugal", state: "Idle", kw: 12.8, tone: C.flare },
  { name: "Hydraulic Press", type: "Unit 5 · Press", state: "Running", kw: 44.2, tone: C.signal },
];

export function SceneEnergy() {
  const draw = useRamp(18, 128);
  const idleReveal = interpolate(draw, [IDLE_TO, IDLE_TO + 0.1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counters = useRamp(30, 120);
  const cost = useRamp(120, 178);

  const head = SAMPLES[Math.min(120, Math.round(draw * 120))];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "126px 88px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 26,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Rise delay={0}>
            <Mono color={C.signal}>EnergyIQ</Mono>
          </Rise>
          <Rise delay={4}>
            <Headline size={62}>Every kilowatt, addressed.</Headline>
          </Rise>
        </div>
        <Rise delay={10}>
          <Body size={20} style={{ maxWidth: 430, textAlign: "right" }}>
            Per-machine load at 60-second resolution, mapped to your DEWA
            tariff. Idle running stops being invisible.
          </Body>
        </Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 22, flex: 1 }}>
        <Panel title="Extrusion Line 02 · load profile" meta="today · 60s samples" bodyStyle={{ padding: 16 }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="kw-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={C.signal} stopOpacity="0.38" />
                <stop offset="100%" stopColor={C.signal} stopOpacity="0" />
              </linearGradient>
              <clipPath id="kw-clip">
                <rect x="0" y="0" width={W * draw} height={H} />
              </clipPath>
              <pattern id="idle-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke={C.flare} strokeWidth="1.4" opacity="0.35" />
              </pattern>
            </defs>

            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke={C.hairline} strokeWidth={1} />
            ))}

            <g clipPath="url(#kw-clip)">
              <path d={AREA} fill="url(#kw-fill)" />
              <path d={LINE} fill="none" stroke={C.signal} strokeWidth={2.4} strokeLinejoin="round" />
            </g>

            <g opacity={idleReveal}>
              <rect
                x={IDLE_FROM * W}
                y={0}
                width={(IDLE_TO - IDLE_FROM) * W}
                height={H}
                fill="url(#idle-hatch)"
              />
              <rect
                x={IDLE_FROM * W}
                y={0}
                width={(IDLE_TO - IDLE_FROM) * W}
                height={H}
                fill="none"
                stroke={C.flare}
                strokeWidth={1}
                strokeDasharray="5 4"
              />
              <text
                x={(IDLE_FROM + (IDLE_TO - IDLE_FROM) / 2) * W}
                y={34}
                textAnchor="middle"
                fill={C.flare}
                style={{ fontFamily: F.mono, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase" }}
              >
                Idle · 1h 42m · no output
              </text>
            </g>

            {draw < 1 ? (
              <g>
                <line x1={head.x} y1={0} x2={head.x} y2={H} stroke={C.signal} strokeWidth={1} opacity={0.5} />
                <circle cx={head.x} cy={head.y} r={5} fill={C.signal} />
                <circle cx={head.x} cy={head.y} r={12} fill="none" stroke={C.signal} strokeWidth={1} opacity={0.4} />
              </g>
            ) : null}
          </svg>
        </Panel>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ROWS.map((row, index) => (
            <Rise delay={24 + index * 8} key={row.name}>
              <div
                style={{
                  border: `1px solid ${C.hairline}`,
                  background: "rgba(10,35,49,0.66)",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Mono size={12} color={C.bone}>{row.name}</Mono>
                  <span
                    style={{
                      fontFamily: F.mono,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: row.tone,
                      border: `1px solid ${row.tone}55`,
                      padding: "3px 8px",
                    }}
                  >
                    {row.state}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <Readout size={30} color={row.tone}>
                    {(row.kw * counters).toFixed(1)}
                  </Readout>
                  <Mono size={12}>kW</Mono>
                </div>
                <div style={{ height: 4, background: "rgba(147,202,205,0.10)" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${(row.kw / 70) * 100 * counters}%`,
                      background: row.tone,
                      opacity: 0.7,
                    }}
                  />
                </div>
                <Mono size={11}>{row.type}</Mono>
              </div>
            </Rise>
          ))}

          <Rise delay={126}>
            <div
              style={{
                border: `1px solid rgba(255,148,72,0.42)`,
                background: "rgba(255,148,72,0.07)",
                padding: "14px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Mono size={11} color={C.flare}>Idle waste · today</Mono>
                <Readout size={30} color={C.flare}>
                  AED {(16.5 * cost).toFixed(2)}
                </Readout>
              </div>
              <Mono size={11}>{(5.02 * cost).toFixed(2)} h</Mono>
            </div>
          </Rise>
        </div>
      </div>
    </div>
  );
}
