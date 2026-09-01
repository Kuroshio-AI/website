import { interpolate, useCurrentFrame } from "remotion";

import { Body, Chip, Headline, Mono, Rise } from "../parts";
import { drawStyle, useRamp } from "../timing";
import { C, F } from "../theme";

const NODES = [
  { x: 120, label: "Machine incomer", sub: "3-phase" },
  { x: 470, label: "Edge unit", sub: "KX-100" },
  { x: 800, label: "Cellular", sub: "Etisalat / du" },
  { x: 1090, label: "Azure UAE North", sub: "residency" },
  { x: 1330, label: "Dashboard", sub: "any browser" },
];

function Node({ node, index, litProgress }) {
  const lit = litProgress > index / NODES.length;
  const glow = lit ? 1 : 0.25;
  return (
    <g transform={`translate(${node.x}, 232)`}>
      <rect
        x={-52}
        y={-34}
        width={104}
        height={68}
        fill={lit ? "rgba(63,224,197,0.08)" : "rgba(10,35,49,0.85)"}
        stroke={lit ? C.signal : C.hairlineStrong}
        strokeWidth={1}
        opacity={0.35 + glow * 0.65}
      />
      <circle cx={0} cy={0} r={lit ? 7 : 4} fill={lit ? C.signal : C.boneFaint} opacity={glow} />
      {lit ? <circle cx={0} cy={0} r={16} fill="none" stroke={C.signal} strokeWidth={1} opacity={0.3} /> : null}
      <text
        x={0}
        y={62}
        textAnchor="middle"
        fill={lit ? C.bone : C.boneFaint}
        style={{ fontFamily: F.mono, fontSize: 15, letterSpacing: "0.12em", textTransform: "uppercase" }}
      >
        {node.label}
      </text>
      <text
        x={0}
        y={84}
        textAnchor="middle"
        fill={C.boneFaint}
        style={{ fontFamily: F.mono, fontSize: 13, letterSpacing: "0.1em" }}
      >
        {node.sub}
      </text>
    </g>
  );
}

export function SceneInstall() {
  const frame = useCurrentFrame();
  const clamp = useRamp(12, 44);
  const wire = useRamp(38, 104);
  const lit = useRamp(46, 128);

  const packets = [0, 1, 2, 3].map((i) => {
    const t = ((frame - 96 + i * 26) % 104) / 104;
    return { t, visible: frame > 96 && t >= 0 };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "126px 88px 96px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 720 }}>
          <Rise delay={0}>
            <Mono color={C.signal}>Deployment</Mono>
          </Rise>
          <Rise delay={4}>
            <Headline size={64}>
              We clamp on. We never <span style={{ color: C.signal }}>plug in.</span>
            </Headline>
          </Rise>
        </div>
        <Rise delay={10}>
          <Body size={20} style={{ maxWidth: 420, textAlign: "right" }}>
            Split-core CTs on the machine incomer, an edge unit, and our own SIM.
            Your PLC, your SCADA and your network are never touched.
          </Body>
        </Rise>
      </div>

      <svg viewBox="0 0 1424 390" style={{ width: "100%", height: "auto", flex: "0 0 auto" }}>
        {/* phase lines entering the first node */}
        {[-18, 0, 18].map((dy) => (
          <line
            key={dy}
            x1={0}
            y1={232 + dy}
            x2={120}
            y2={232 + dy}
            stroke={C.hairlineStrong}
            strokeWidth={1}
            opacity={interpolate(clamp, [0, 0.4], [0, 1], { extrapolateRight: "clamp" })}
            {...drawStyle(clamp, 140)}
          />
        ))}
        {/* CT clamps closing onto the phases */}
        {[-18, 0, 18].map((dy, i) => {
          const local = Math.max(0, Math.min(1, (clamp - i * 0.14) / 0.5));
          return (
            <g key={`ct-${dy}`} opacity={local}>
              <circle
                cx={62}
                cy={232 + dy}
                r={9 + (1 - local) * 7}
                fill="none"
                stroke={C.signal}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
            </g>
          );
        })}

        {/* trunk */}
        <line
          x1={120}
          y1={232}
          x2={1330}
          y2={232}
          stroke={C.hairlineStrong}
          strokeWidth={1}
          {...drawStyle(wire, 1300)}
        />

        {/* travelling data packets */}
        {packets.map((p, i) =>
          p.visible ? (
            <circle
              key={i}
              cx={120 + p.t * 1210}
              cy={232}
              r={3.5}
              fill={C.signal}
              opacity={Math.sin(p.t * Math.PI)}
            />
          ) : null
        )}

        {NODES.map((node, index) => (
          <Node index={index} key={node.label} litProgress={lit} node={node} />
        ))}
      </svg>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Chip delay={122} tone="signal">No PLC access</Chip>
        <Chip delay={130} tone="signal">No client network</Chip>
        <Chip delay={138} tone="signal">No production downtime</Chip>
        <Chip delay={146} tone="flare">Live in 3–4 hours</Chip>
        <Chip delay={154} tone="quiet">Data stays in the UAE</Chip>
      </div>
    </div>
  );
}
