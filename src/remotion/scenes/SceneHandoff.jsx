import { useCurrentFrame, useVideoConfig } from "remotion";

import { Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
import { useRamp } from "../timing";
import { C, F } from "../theme";

const FIELDS = [
  { label: "Machine", value: "Extrusion Line 02 · Unit 4", at: 62 },
  { label: "Linked alert", value: "ALR-4471 · Bearing wear, drive end", at: 74 },
  { label: "Technician", value: "A. Rahman · Maintenance", at: 86 },
  { label: "Parts used", value: "BRG-6208-2RS ×2 · from store B", at: 98 },
];

const NOTE =
  "Replaced drive-end bearing and re-greased housing. Sideband energy back within baseline on restart. Recheck at next shift handover.";

const STATES = [
  { label: "Unreviewed", at: 0 },
  { label: "Reviewed", at: 108 },
  { label: "Linked", at: 132 },
];

function typed(text, progress) {
  return text.slice(0, Math.max(0, Math.round(text.length * progress)));
}

export function SceneHandoff() {
  const frame = useCurrentFrame();
  const compact = useVideoConfig().width < 1000;
  const carry = useRamp(30, 62);
  const note = useRamp(108, 158);
  const activeState = STATES.reduce((acc, s, i) => (frame >= s.at ? i : acc), 0);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: compact ? "44px 40px 56px" : "32px 88px 96px",
        display: "flex",
        flexDirection: "column",
        gap: compact ? 34 : 26,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingRight: compact ? 0 : 96 }}>
        <Rise delay={0}>
          <Mono color={C.brand} size={compact ? 24 : 14}>Alert-to-logbook handoff</Mono>
        </Rise>
        <Rise delay={4}>
          <Headline size={compact ? 56 : 62}>The context walks to the repair.</Headline>
        </Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "440px 132px 1fr", gridTemplateRows: compact ? "auto 24px minmax(0, 1fr)" : undefined, gap: compact ? 8 : 20, flex: 1, minHeight: 0, alignItems: "stretch" }}>
        <Rise delay={6}>
          <div
            style={{
              height: "100%",
              border: `1px solid rgba(255,148,72,0.44)`,
              background: C.flareSoft,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: compact ? 10 : 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Mono size={compact ? 22 : 12} color={C.flare}>ALR-4471 · High</Mono>
              <Mono size={compact ? 20 : 11}>Extrusion Line 02</Mono>
            </div>
            <Readout size={compact ? 30 : 26}>Bearing wear, drive end</Readout>
            {!compact && <Body size={17}>
              Sideband energy at 2× line frequency up 41% against this motor's
              own baseline. Predicted threshold in 12 days.
            </Body>}
            <div style={{ marginTop: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATES.map((s, i) => (
                <span
                  key={s.label}
                  style={{
                    fontFamily: F.mono,
                    fontSize: compact ? 20 : 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    border: `1px solid ${i <= activeState ? C.brand : C.hairline}`,
                    color: i <= activeState ? C.brand : C.inkFaint,
                    background: i <= activeState ? C.brandSoft : "transparent",
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </Rise>

        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <svg viewBox="0 0 132 200" style={{ width: compact ? 24 : "100%", height: compact ? 24 : 200, transform: compact ? "rotate(90deg)" : undefined }}>
            <line x1={0} y1={100} x2={132} y2={100} stroke={C.hairlineStrong} strokeWidth={1} strokeDasharray="4 4" />
            <path
              d="M0 100 L132 100"
              stroke={C.brand}
              strokeWidth={2}
              strokeDasharray={132}
              strokeDashoffset={132 * (1 - carry)}
              fill="none"
            />
            <path d="M118 92 L132 100 L118 108" fill="none" stroke={C.brand} strokeWidth={2} opacity={carry} />
            {carry > 0 && carry < 1 ? (
              <circle cx={132 * carry} cy={100} r={5} fill={C.brand} />
            ) : null}
            {!compact && <text
              x={66}
              y={80}
              textAnchor="middle"
              fill={C.inkFaint}
              style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              carry
            </text>}
          </svg>
        </div>

        <Panel title={compact ? undefined : "Maintenance logbook · new entry"} meta="auto-linked">
          <div style={{ display: "flex", flexDirection: "column", gap: compact ? 12 : 14 }}>
            {(compact ? FIELDS.slice(1, 2) : FIELDS).map((field) => {
              const p = Math.max(0, Math.min(1, (frame - field.at) / 16));
              return (
                <div
                  key={field.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: compact ? "220px 1fr" : "150px 1fr",
                    gap: 16,
                    alignItems: "center",
                    paddingBottom: 12,
                    borderBottom: `1px solid ${C.hairline}`,
                  }}
                >
                  <Mono size={compact ? 22 : 12}>{field.label}</Mono>
                  <span
                    style={{
                      fontFamily: F.mono,
                      fontSize: compact ? 28 : 18,
                      minHeight: compact ? 38 : 27,
                      color: p > 0 ? C.ink : C.inkFaint,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {typed(compact ? field.value.split(" · ")[0] : field.value, p)}
                    {p > 0 && p < 1 ? (
                      <span style={{ color: C.brand, opacity: frame % 12 < 6 ? 1 : 0 }}>▌</span>
                    ) : null}
                  </span>
                </div>
              );
            })}

            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 2 }}>
              <Mono size={compact ? 22 : 12}>Technician notes</Mono>
              <p
                style={{
                  fontFamily: F.sans,
                  fontSize: compact ? 30 : 18,
                  lineHeight: 1.55,
                  color: C.inkDim,
                  margin: 0,
                  minHeight: 84,
                }}
              >
                {typed(compact ? "Bearing replaced. Signal back within baseline." : NOTE, note)}
                {note > 0 && note < 1 ? (
                  <span style={{ color: C.brand, opacity: frame % 12 < 6 ? 1 : 0 }}>▌</span>
                ) : null}
              </p>
            </div>

            <div
              style={{
                marginTop: "auto",
                display: "flex",
                gap: 10,
                opacity: Math.max(0, Math.min(1, (frame - 158) / 14)),
              }}
            >
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: compact ? 22 : 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "9px 16px",
                  background: C.brand,
                  color: C.canvasDeep,
                }}
              >
                Entry saved
              </span>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: compact ? 22 : 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "9px 16px",
                  border: `1px solid ${C.hairlineStrong}`,
                  color: C.inkDim,
                }}
              >
                Alert resolved
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
