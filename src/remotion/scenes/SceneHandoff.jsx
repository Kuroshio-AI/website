import { useCurrentFrame } from "remotion";

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
  const carry = useRamp(30, 62);
  const note = useRamp(108, 158);
  const activeState = STATES.reduce((acc, s, i) => (frame >= s.at ? i : acc), 0);

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
            <Mono color={C.signal}>Alert-to-logbook handoff</Mono>
          </Rise>
          <Rise delay={4}>
            <Headline size={62}>The context walks to the repair.</Headline>
          </Rise>
        </div>
        <Rise delay={10}>
          <Body size={20} style={{ maxWidth: 430, textAlign: "right" }}>
            No retyping, no lost thread. The alert opens a linked maintenance
            entry that stays attached to the machine forever.
          </Body>
        </Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "440px 132px 1fr", gap: 20, flex: 1, alignItems: "stretch" }}>
        <Rise delay={6}>
          <div
            style={{
              height: "100%",
              border: `1px solid rgba(255,148,72,0.44)`,
              background: "rgba(255,148,72,0.06)",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Mono size={12} color={C.flare}>ALR-4471 · High</Mono>
              <Mono size={11}>08:42 GST</Mono>
            </div>
            <Readout size={26}>Bearing wear, drive end</Readout>
            <Body size={17}>
              Sideband energy at 2× line frequency up 41% against this motor's
              own baseline. Predicted threshold in 12 days.
            </Body>
            <div style={{ marginTop: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATES.map((s, i) => (
                <span
                  key={s.label}
                  style={{
                    fontFamily: F.mono,
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    border: `1px solid ${i <= activeState ? C.signal : C.hairline}`,
                    color: i <= activeState ? C.signal : C.boneFaint,
                    background: i <= activeState ? "rgba(63,224,197,0.10)" : "transparent",
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </Rise>

        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <svg viewBox="0 0 132 200" style={{ width: "100%", height: 200 }}>
            <line x1={0} y1={100} x2={132} y2={100} stroke={C.hairlineStrong} strokeWidth={1} strokeDasharray="4 4" />
            <path
              d="M0 100 L132 100"
              stroke={C.signal}
              strokeWidth={2}
              strokeDasharray={132}
              strokeDashoffset={132 * (1 - carry)}
              fill="none"
            />
            <path d="M118 92 L132 100 L118 108" fill="none" stroke={C.signal} strokeWidth={2} opacity={carry} />
            {carry > 0 && carry < 1 ? (
              <circle cx={132 * carry} cy={100} r={5} fill={C.signal} />
            ) : null}
            <text
              x={66}
              y={80}
              textAnchor="middle"
              fill={C.boneFaint}
              style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              carry
            </text>
          </svg>
        </div>

        <Panel title="Maintenance logbook · new entry" meta="auto-linked">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {FIELDS.map((field) => {
              const p = Math.max(0, Math.min(1, (frame - field.at) / 16));
              return (
                <div
                  key={field.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "150px 1fr",
                    gap: 16,
                    alignItems: "center",
                    paddingBottom: 12,
                    borderBottom: `1px solid ${C.hairline}`,
                  }}
                >
                  <Mono size={12}>{field.label}</Mono>
                  <span
                    style={{
                      fontFamily: F.mono,
                      fontSize: 18,
                      color: p > 0 ? C.bone : C.boneFaint,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {typed(field.value, p)}
                    {p > 0 && p < 1 ? (
                      <span style={{ color: C.signal, opacity: frame % 12 < 6 ? 1 : 0 }}>▌</span>
                    ) : null}
                  </span>
                </div>
              );
            })}

            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 2 }}>
              <Mono size={12}>Technician notes</Mono>
              <p
                style={{
                  fontFamily: F.sans,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: C.boneDim,
                  margin: 0,
                  minHeight: 84,
                }}
              >
                {typed(NOTE, note)}
                {note > 0 && note < 1 ? (
                  <span style={{ color: C.signal, opacity: frame % 12 < 6 ? 1 : 0 }}>▌</span>
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
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "9px 16px",
                  background: C.signal,
                  color: C.abyssDeep,
                }}
              >
                Entry saved
              </span>
              <span
                style={{
                  fontFamily: F.mono,
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "9px 16px",
                  border: `1px solid ${C.hairlineStrong}`,
                  color: C.boneDim,
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
