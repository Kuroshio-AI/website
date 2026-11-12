import { useVideoConfig } from "remotion";

import { AssetPanel, Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
import { useRamp } from "../timing";
import { C, F } from "../theme";

const W = 940;
const H = 330;
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
  return { x: t * W, y: H - powerAt(t) * (H - 52) - 22 };
});
const LINE = SAMPLES.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
const AREA = `${LINE} L${W} ${H} L0 ${H} Z`;

function Metric({ compact = false, label, value, detail, color = C.brand, progress = 1 }) {
  return (
    <div style={{ minWidth: 0, borderTop: `2px solid ${color}`, background: C.panel, padding: compact ? "12px 12px 10px" : "12px 14px 10px", display: "flex", flexDirection: "column", gap: compact ? 8 : 7 }}>
      <Mono size={compact ? 22 : 15} color={C.inkDim} style={{ letterSpacing: 0 }}>{label}</Mono>
      <Readout size={compact ? 34 : 31} color={color}>{value}</Readout>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
        <Mono size={compact ? 18 : 13} color={C.inkFaint} style={{ letterSpacing: 0 }}>{detail}</Mono>
        <div style={{ flex: 1, maxWidth: compact ? 50 : 66, height: compact ? 4 : 3, background: C.canvasSunk }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: color }} />
        </div>
      </div>
    </div>
  );
}

export function SceneEnergy() {
  const compact = useVideoConfig().width < 1000;
  const draw = useRamp(18, 128);
  const idleReveal = useRamp(82, 132);
  const counters = useRamp(30, 112);
  const cost = useRamp(76, 132);
  const head = SAMPLES[Math.min(120, Math.round(draw * 120))];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: compact ? "34px 32px 54px" : "32px 88px 96px",
        display: "flex",
        flexDirection: "column",
        gap: compact ? 16 : 20,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingRight: compact ? 0 : 120 }}>
        <Rise delay={4}>
          <Headline size={compact ? 44 : 56}>Make idle hours visible.</Headline>
        </Rise>
        {!compact && (
          <Rise delay={10}>
            <Body size={19} color={C.inkDim}>Plant-floor energy, read against its own operating rhythm.</Body>
          </Rise>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr" : "390px minmax(0, 1fr)",
          gridTemplateRows: compact ? "154px minmax(0, 1fr)" : undefined,
          gap: compact ? 14 : 18,
          flex: 1,
          minHeight: 0,
        }}
      >
        <AssetPanel
          compact={compact}
         
          status="live"
          metric={{ label: "current draw", value: "61.4 kW" }}
          style={{ minHeight: 0 }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: compact ? 8 : 10 }}>
            <Rise delay={18}>
              <Metric compact={compact} label="Live load" value={`${(61.4 * counters).toFixed(1)} kW`} detail="extruder online" progress={counters} />
            </Rise>
            <Rise delay={24}>
              <Metric compact={compact} label="Idle window" value="1h 42m" detail="no output" color={C.flare} progress={idleReveal} />
            </Rise>
            <Rise delay={30}>
              <Metric compact={compact} label="Idle cost" value={`AED ${(16.5 * cost).toFixed(2)}`} detail="today · illustrative" color={C.flare} progress={cost} />
            </Rise>
          </div>

          <Panel
            compact={compact}
            title="Load profile"
            meta="today · 40s samples"
            style={{ flex: 1, minHeight: 0 }}
            bodyStyle={{ padding: compact ? "10px 12px 12px" : "14px 16px 12px", display: "flex", flexDirection: "column", minHeight: 0 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, gap: 12 }}>
              <Mono size={compact ? 22 : 15} color={C.inkDim} style={{ letterSpacing: 0 }}>Extrusion Line 02 / Unit 4</Mono>
              <Mono size={compact ? 22 : 15} color={C.brand} style={{ letterSpacing: 0 }}>kW · 10 h view</Mono>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%", flex: 1, minHeight: 0, display: "block" }}>
              <defs>
                <linearGradient id="kw-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={C.brand} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={C.brand} stopOpacity="0" />
                </linearGradient>
                <clipPath id="kw-clip">
                  <rect x="0" y="0" width={W * draw} height={H} />
                </clipPath>
                <pattern id="idle-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke={C.flare} strokeWidth="1.4" opacity="0.34" />
                </pattern>
              </defs>

              {[0.22, 0.46, 0.7, 0.94].map((line) => (
                <line key={line} x1="0" x2={W} y1={H * line} y2={H * line} stroke={C.hairline} strokeWidth="1" />
              ))}
              {[0.25, 0.5, 0.75].map((line) => (
                <line key={line} x1={W * line} x2={W * line} y1="0" y2={H} stroke={C.hairline} strokeWidth="1" strokeDasharray="2 8" />
              ))}

              <g clipPath="url(#kw-clip)">
                <path d={AREA} fill="url(#kw-fill)" />
                <path d={LINE} fill="none" stroke={C.brand} strokeWidth="3" strokeLinejoin="round" />
              </g>

              <g opacity={idleReveal}>
                <rect x={IDLE_FROM * W} y="0" width={(IDLE_TO - IDLE_FROM) * W} height={H} fill="url(#idle-hatch)" />
                <rect x={IDLE_FROM * W} y="0" width={(IDLE_TO - IDLE_FROM) * W} height={H} fill="none" stroke={C.flare} strokeWidth="1.5" strokeDasharray="6 5" />
                <text
                  x={(IDLE_FROM + (IDLE_TO - IDLE_FROM) / 2) * W}
                  y="28"
                  textAnchor="middle"
                  fill={C.flare}
                  style={{ fontFamily: F.sans, fontSize: compact ? 22 : 15, letterSpacing: 0 }}
                >
                  Idle window · 1h 42m
                </text>
              </g>

              {draw < 1 ? (
                <g>
                  <line x1={head.x} y1="0" x2={head.x} y2={H} stroke={C.brand} strokeWidth="1" opacity="0.5" />
                  <circle cx={head.x} cy={head.y} r="5" fill={C.brand} />
                  <circle cx={head.x} cy={head.y} r="12" fill="none" stroke={C.brand} strokeWidth="1" opacity="0.38" />
                </g>
              ) : null}

              <text x="0" y={H - 5} fill={C.inkFaint} style={{ fontFamily: F.sans, fontSize: compact ? 21 : 14, letterSpacing: 0 }}>06:00</text>
              <text x={W / 2} y={H - 5} textAnchor="middle" fill={C.inkFaint} style={{ fontFamily: F.sans, fontSize: compact ? 21 : 14, letterSpacing: 0 }}>11:00</text>
              <text x={W} y={H - 5} textAnchor="end" fill={C.inkFaint} style={{ fontFamily: F.sans, fontSize: compact ? 21 : 14, letterSpacing: 0 }}>16:00</text>
            </svg>
          </Panel>
        </div>
      </div>
    </div>
  );
}
