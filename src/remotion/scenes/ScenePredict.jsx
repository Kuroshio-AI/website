import { useCurrentFrame, useVideoConfig } from "remotion";

import { AssetPanel, Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
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

/* The dial is width-starved in the compact column, so it can never fill the
   card's height. The delta line lives in a footer strip under the SVG instead
   of inside the arc: it takes up the slack and stays clear of the arc tips. */
function HealthGauge({ compact, score, settle, degrade }) {
  const angle = START_ANGLE + SWEEP * (score / 100) * settle;
  const arcColor = degrade > 0.5 ? C.flare : C.brand;
  return (
    <div style={{ minHeight: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: compact ? 10 : 12, background: C.panelSunk, border: `1px solid ${C.hairline}`, padding: compact ? 10 : 14 }}>
      <svg viewBox="24 16 352 292" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", maxWidth: 400, aspectRatio: "352 / 292", minHeight: 0, display: "block" }}>
        <path d={arcPath(200, 190, 132, START_ANGLE, START_ANGLE + SWEEP)} fill="none" stroke={C.hairlineStrong} strokeWidth="14" strokeLinecap="butt" />
        {Array.from({ length: 27 }).map((_, i) => {
          const a = START_ANGLE + (SWEEP * i) / 26;
          const [x1, y1] = polar(200, 190, 150, a);
          const [x2, y2] = polar(200, 190, i % 5 === 0 ? 162 : 157, a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.hairlineStrong} strokeWidth="1" />;
        })}
        {settle > 0.02 ? <path d={arcPath(200, 190, 132, START_ANGLE, angle)} fill="none" stroke={arcColor} strokeWidth="14" strokeLinecap="butt" /> : null}
        <text x="200" y="182" textAnchor="middle" fill={arcColor} style={{ fontFamily: F.sans, fontSize: 82, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em" }}>{Math.round(score * settle)}</text>
        <text x="200" y="216" textAnchor="middle" fill={C.inkFaint} style={{ fontFamily: F.sans, fontSize: compact ? 15 : 14, letterSpacing: 0 }}>health score / 100</text>
      </svg>
      <div style={{ width: "100%", maxWidth: 400, borderTop: `1px solid ${C.hairline}`, paddingTop: compact ? 9 : 10, textAlign: "center" }}>
        <Mono size={compact ? 18 : 13} color={degrade > 0.5 ? C.flare : C.inkDim} style={{ letterSpacing: 0 }}>
          {degrade > 0.5 ? "▼ 25 pts in 9 days" : "baseline nominal"}
        </Mono>
      </div>
    </div>
  );
}

export function ScenePredict() {
  const frame = useCurrentFrame();
  const compact = useVideoConfig().width < 1000;
  const settle = useRamp(10, 46);
  const degrade = useRamp(64, 140);
  const score = 96 - 25 * degrade;
  const alertIn = useRamp(120, 150);
  const sideband = useRamp(74, 128);

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
          <Headline size={compact ? 44 : 56}>See wear before the stop.</Headline>
        </Rise>
        <Rise delay={10}>
          <Body size={compact ? 28 : 19} color={C.inkDim}>A bearing signal becomes a planned shutdown, not a surprise.</Body>
        </Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "390px minmax(0, 1fr)", gridTemplateRows: compact ? "154px minmax(0, 1fr)" : undefined, gap: compact ? 14 : 18, flex: 1, minHeight: 0 }}>
        <AssetPanel compact={compact} status="watch" statusTone="#f4c46d" metric={{ label: "health", value: `${Math.round(score)}/100` }} />

          <Panel
          compact={compact}
          title="Condition monitor"
          meta="Extrusion Line 02"
          style={{ minHeight: 0 }}
          bodyStyle={{ padding: compact ? 10 : 14, display: "flex", flexDirection: "column", gap: compact ? 10 : 12, minHeight: 0 }}
        >
          {compact ? (
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1fr)", gap: 10, flex: 1, minHeight: 0 }}>
              <HealthGauge compact score={score} settle={settle} degrade={degrade} />
              <Rise delay={52} style={{ opacity: alertIn, translate: `${(1 - alertIn) * 20}px 0px`, minHeight: 0 }}>
                <div style={{ height: "100%", border: "1px solid rgba(138,90,0,0.48)", background: C.flareSoft, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <Mono size={22} color={C.flare} style={{ letterSpacing: 0 }}>Amber alert / high</Mono>
                  <Readout size={33} color={C.ink}>Drive-end bearing</Readout>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, borderTop: `1px solid ${C.flare}55`, paddingTop: 10 }}>
                    <Readout size={30} color={C.flare}>+41%</Readout>
                    <Mono size={20} color={C.inkDim} style={{ letterSpacing: 0 }}>sideband</Mono>
                  </div>
                  <div style={{ marginTop: "auto", borderTop: `1px solid ${C.flare}55`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                    <Readout size={38} color={C.flare}>12 days</Readout>
                    <Mono size={20} color={C.inkDim} style={{ letterSpacing: 0 }}>next shutdown</Mono>
                  </div>
                </div>
              </Rise>
            </div>
          ) : (
          <>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 14, flex: 1, minHeight: 0 }}>
            <HealthGauge compact={compact} score={score} settle={settle} degrade={degrade} />

            <Rise delay={52} style={{ opacity: alertIn, translate: `${(1 - alertIn) * 20}px 0px`, minHeight: 0 }}>
              <div style={{ height: "100%", border: "1px solid rgba(138,90,0,0.48)", background: C.flareSoft, padding: compact ? 16 : 18, display: "flex", flexDirection: "column", gap: compact ? 10 : 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <Mono size={15} color={C.flare} style={{ letterSpacing: 0 }}>Amber alert / high</Mono>
                  <Mono size={14} color={C.flare} style={{ letterSpacing: 0 }}>87% confidence</Mono>
                </div>
                <Readout size={28} color={C.ink}>Bearing wear, drive end</Readout>
                <Body size={19} color={C.inkDim}>
                  Sideband energy at 2× line frequency is 41% above this motor&apos;s own baseline.
                </Body>
                <div style={{ marginTop: "auto", borderTop: `1px solid ${C.flare}55`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
                  <Mono size={14} color={C.flare} style={{ letterSpacing: 0 }}>Predicted warning</Mono>
                  <Readout size={38} color={C.flare}>12 days</Readout>
                  <Mono size={16} color={C.inkDim} style={{ letterSpacing: 0 }}>Recommended: next shutdown</Mono>
                </div>
              </div>
            </Rise>
          </div>

          <div style={{ borderTop: `1px solid ${C.hairline}`, paddingTop: 10, minHeight: 102 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <Mono size={15} color={C.inkDim} style={{ letterSpacing: 0 }}>Signature / sideband energy</Mono>
              <Mono size={14} color={C.flare} style={{ letterSpacing: 0 }}>2× line frequency</Mono>
            </div>
            <div style={{ height: 52, display: "flex", alignItems: "flex-end", gap: 4 }}>
              {BANDS.map((band) => {
                const grow = band.sideband ? band.base + 0.42 * sideband : band.base;
                const wobble = 1 + Math.sin((frame + band.i * 11) * 0.09) * 0.05;
                return <span key={band.i} style={{ flex: 1, height: `${Math.min(100, grow * 100 * settle * wobble)}%`, background: band.sideband && sideband > 0.25 ? C.flare : C.brand, opacity: band.sideband && sideband > 0.25 ? 0.95 : 0.72 }} />;
              })}
            </div>
          </div>
          </>
          )}
        </Panel>
      </div>
    </div>
  );
}
