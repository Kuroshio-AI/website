import { interpolate, useCurrentFrame } from "remotion";

import { Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
import { useRamp } from "../timing";
import { C, F } from "../theme";

const EMISSIONS = [
  { name: "Extrusion Line 02", kg: 412, share: 1 },
  { name: "Hydraulic Press", kg: 298, share: 0.72 },
  { name: "Cooling Pump Skid", kg: 186, share: 0.45 },
  { name: "Granulator 01", kg: 121, share: 0.29 },
  { name: "Compressor", kg: 96, share: 0.23 },
];

export function SceneProof() {
  const frame = useCurrentFrame();
  const grow = useRamp(12, 78);
  const total = useRamp(30, 90);
  const outro = interpolate(frame, [98, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "126px 88px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          opacity: 1 - outro,
          transform: `translateY(${outro * -30}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Rise delay={0}>
              <Mono color={C.brand}>Carbon &amp; reporting</Mono>
            </Rise>
            <Rise delay={4}>
              <Headline size={62}>Numbers you can hand to an auditor.</Headline>
            </Rise>
          </div>
          <Rise delay={10}>
            <Body size={20} style={{ maxWidth: 420, textAlign: "right" }}>
              Scope 2 emissions derived from measured consumption — per machine,
              per hour, exportable.
            </Body>
          </Rise>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 20, flex: 1 }}>
          <Panel title="CO₂e by machine" meta="this month · kg" bodyStyle={{ display: "flex" }}>
            <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-around", gap: 16, paddingBlock: 6 }}>
              {EMISSIONS.map((row, index) => {
                const p = Math.max(0, Math.min(1, (grow - index * 0.08) / 0.7));
                return (
                  <div key={row.name} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Mono size={12} color={C.inkDim}>{row.name}</Mono>
                      <Readout size={16} color={C.ink}>{Math.round(row.kg * p)} kg</Readout>
                    </div>
                    <div style={{ height: 12, background: C.canvasSunk }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${row.share * 100 * p}%`,
                          background: `linear-gradient(90deg, ${C.brandDeep}, ${C.brand})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title="Verified totals" meta="August">
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Mono size={11}>Total CO₂e</Mono>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <Readout size={44} color={C.brand}>{(1113 * total).toFixed(0)}</Readout>
                    <Mono size={13}>kg</Mono>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Mono size={11}>Reduction vs. baseline</Mono>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <Readout size={44} color={C.brand}>−{(18.4 * total).toFixed(1)}</Readout>
                    <Mono size={13}>%</Mono>
                  </div>
                </div>
              </div>
            </Panel>

            <Rise delay={84}>
              <div
                style={{
                  border: `1px solid ${C.brand}66`,
                  background: C.brandSoft,
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <Mono size={11} color={C.brand}>Export</Mono>
                  <Readout size={19}>kuroshio-report-aug.pdf</Readout>
                </div>
                <span
                  style={{
                    fontFamily: F.mono,
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "9px 14px",
                    background: C.brand,
                    color: C.canvasDeep,
                  }}
                >
                  Download
                </span>
              </div>
            </Rise>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          opacity: outro,
          transform: `translateY(${(1 - outro) * 24}px)`,
          pointerEvents: "none",
        }}
      >
        <Mono size={15} color={C.brand}>Kuroshio AI</Mono>
        <h2
          style={{
            fontFamily: F.display,
            fontWeight: 700,
            fontSize: 104,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            color: C.ink,
            margin: 0,
            textAlign: "center",
          }}
        >
          Industrial intelligence
          <br />
          <span style={{ color: C.brand }}>that installs in hours.</span>
        </h2>
        <div
          style={{
            width: 520,
            height: 1,
            background: C.hairlineStrong,
            transform: `scaleX(${outro})`,
          }}
        />
        <Mono size={14} color={C.inkDim}>
          One machine · four weeks · 75% refund if you see no value
        </Mono>
      </div>
    </div>
  );
}
