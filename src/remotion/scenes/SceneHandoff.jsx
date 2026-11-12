import { useCurrentFrame, useVideoConfig } from "remotion";

import { Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
import { useRamp } from "../timing";
import { C, F } from "../theme";

const FIELDS = [
  { label: "Machine", value: "Extrusion Line 02 · Unit 4", at: 54 },
  { label: "Linked alert", value: "ALR-4471 · bearing wear", at: 66 },
  { label: "Parts used", value: "BRG-6208-2RS ×2 · store B", at: 78 },
];

const NOTE = "Replaced drive-end bearing and re-greased housing. Signal back within baseline on restart.";
const STATES = [
  { label: "Captured", at: 0 },
  { label: "Digitised", at: 72 },
  { label: "Linked", at: 126 },
];

function typed(text, progress) {
  return text.slice(0, Math.max(0, Math.round(text.length * progress)));
}

function Timeline({ frame, compact }) {
  const activeState = STATES.reduce((acc, state, index) => (frame >= state.at ? index : acc), 0);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: compact ? 8 : 10, borderBottom: `1px solid ${C.hairline}`, paddingBottom: compact ? 10 : 12 }}>
      {STATES.map((state, index) => (
        <div key={state.label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ height: compact ? 5 : 4, background: index <= activeState ? C.brand : C.canvasSunk }} />
          <Mono size={compact ? 20 : 14} color={index <= activeState ? C.brand : C.inkFaint} style={{ letterSpacing: 0 }}>{state.label}</Mono>
        </div>
      ))}
    </div>
  );
}

function PaperSheet({ compact, scan, transfer }) {
  const paperOpacity = compact ? 1 - transfer * 0.92 : 1;
  return (
    <div
      style={{
        position: compact ? "absolute" : "relative",
        inset: compact ? 0 : undefined,
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        padding: compact ? "26px 24px 24px 54px" : "40px 42px 38px 64px",
        backgroundColor: "#f6efe3",
        backgroundImage: "linear-gradient(to bottom, transparent 31px, rgba(83,105,124,0.16) 32px), linear-gradient(90deg, transparent 39px, rgba(169,86,65,0.18) 40px, transparent 41px)",
        backgroundSize: "100% 32px, 100% 100%",
        border: "1px solid #d6c8b5",
        boxShadow: "10px 14px 0 rgba(39,39,42,0.08), 0 18px 36px rgba(39,39,42,0.12)",
        color: "#3e403e",
        rotate: `${-1.2 + transfer * 0.9}deg`,
        translate: `${compact ? -transfer * 8 : (1 - transfer) * 160}px 0px`,
        scale: compact ? 1 : 1.02 - transfer * 0.02,
        opacity: paperOpacity,
        zIndex: 1,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: compact ? 14 : 18, bottom: 0, width: 1, background: "rgba(169,86,65,0.26)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: compact ? 38 : 54, height: compact ? 38 : 54, background: "linear-gradient(135deg, transparent 49%, #dfd0bb 50%, #f6efe3 54%)", opacity: 0.8 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: compact ? 8 : 10, height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <Mono size={compact ? 20 : 14} color="#746958" style={{ letterSpacing: 0 }}>Plant maintenance / work sheet</Mono>
          <Mono size={compact ? 18 : 13} color="#746958" style={{ letterSpacing: 0 }}>ALR-4471</Mono>
        </div>
        <div style={{ borderBottom: "1px solid rgba(62,64,62,0.36)", paddingBottom: compact ? 12 : 16 }}>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: compact ? 36 : 38, lineHeight: 1, letterSpacing: "-0.035em" }}>Extrusion Line 02</div>
          <div style={{ fontFamily: F.sans, fontSize: compact ? 19 : 14, letterSpacing: 0, color: "#746958", marginTop: 8 }}>UNIT 4 · POLYMER EXTRUSION · 09 SEP 2026</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: compact ? 8 : 10 }}>
          <div><Mono size={compact ? 19 : 13} color="#897a67" style={{ letterSpacing: 0 }}>Action</Mono><div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: compact ? 28 : 19, marginTop: 4 }}>Drive-end bearing replaced</div></div>
          <div><Mono size={compact ? 19 : 13} color="#897a67" style={{ letterSpacing: 0 }}>Parts</Mono><div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: compact ? 28 : 19, marginTop: 4, color: "#8a5a00" }}>BRG-6208-2RS ×2</div></div>
        </div>

        <div style={{ marginTop: "auto", borderTop: "1px solid rgba(62,64,62,0.22)", paddingTop: compact ? 12 : 14, display: "flex", flexDirection: "column", gap: compact ? 8 : 10 }}>
          <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: compact ? 28 : 20, lineHeight: 1.25 }}>“Drive-end bearing replaced.”</div>
          <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: compact ? 28 : 20, lineHeight: 1.25, color: "#8a5a00" }}>Housing re-greased. Signal back within baseline on restart.</div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end", marginTop: 6 }}>
            <Mono size={compact ? 18 : 13} color="#897a67" style={{ letterSpacing: 0 }}>TECHNICIAN / AR</Mono>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: compact ? 25 : 18 }}>A. Rahman</div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: `${scan * 100}%`, height: 2, background: "#094cb2", boxShadow: "0 0 18px rgba(9,76,178,0.55)", opacity: scan > 0 && scan < 1 ? 0.9 : 0 }} />
    </div>
  );
}

function DigitalLogbook({ compact, frame, reveal, saved }) {
  return (
    <Panel
      compact={compact}
      title="Digital maintenance logbook"
      meta="linked record"
      style={{ position: compact ? "absolute" : "relative", inset: compact ? 0 : undefined, height: "100%", minHeight: 0, opacity: reveal, translate: `${(1 - reveal) * 22}px 0px`, zIndex: 2 }}
      bodyStyle={{ padding: compact ? 14 : 16, display: "flex", flexDirection: "column", gap: compact ? 11 : 13, minHeight: 0 }}
    >
      <Timeline compact={compact} frame={frame} />

      <div style={{ display: "flex", alignItems: "center", gap: 11, minHeight: compact ? 44 : 48 }}>
        <div style={{ width: compact ? 44 : 38, height: compact ? 44 : 38, borderRadius: "50%", background: C.brand, color: "#fff", display: "grid", placeItems: "center", flexShrink: 0, fontFamily: F.sans, fontSize: compact ? 19 : 15 }}>AR</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
          <Readout size={compact ? 27 : 21}>A. Rahman</Readout>
          <Mono size={compact ? 19 : 13} color={C.inkFaint} style={{ letterSpacing: 0 }}>Maintenance · 14:32 local</Mono>
        </div>
        {!compact && <div style={{ marginLeft: "auto", border: `1px solid ${C.brandLine}`, background: C.brandSoft, padding: "6px 9px" }}><Mono size={12} color={C.brand} style={{ letterSpacing: 0 }}>AR / verified</Mono></div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: compact ? 8 : 9 }}>
        {(compact ? FIELDS.slice(1, 2) : FIELDS).map((field) => {
          const progress = Math.max(0, Math.min(1, (frame - field.at) / 14));
          return (
            <div key={field.label} style={{ minWidth: 0, borderTop: `1px solid ${C.hairline}`, paddingTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
              <Mono size={compact ? 20 : 14} color={C.inkFaint} style={{ letterSpacing: 0 }}>{field.label}</Mono>
              <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: compact ? "nowrap" : "normal", fontFamily: F.sans, fontSize: compact ? 24 : 18, color: progress > 0 ? C.ink : C.inkFaint, letterSpacing: "-0.01em" }}>{typed(field.value, progress)}{progress > 0 && progress < 1 ? <span style={{ color: C.brand, opacity: frame % 12 < 6 ? 1 : 0 }}>▌</span> : null}</span>
            </div>
          );
        })}
      </div>

      <div style={{ minHeight: compact ? 138 : 124, display: "flex", flexDirection: "column", gap: 7, borderTop: `1px solid ${C.hairline}`, paddingTop: 10 }}>
        <Mono size={compact ? 20 : 14} color={C.inkFaint} style={{ letterSpacing: 0 }}>Technician notes</Mono>
        <p style={{ fontFamily: F.sans, fontSize: compact ? 28 : 19, lineHeight: 1.4, color: C.inkDim, margin: 0, minHeight: compact ? 92 : 80 }}>{typed(compact ? "Bearing replaced. Signal back within baseline." : NOTE, Math.max(0, Math.min(1, (frame - 108) / 50)))}{frame >= 108 && frame < 158 ? <span style={{ color: C.brand, opacity: frame % 12 < 6 ? 1 : 0 }}>▌</span> : null}</p>
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, opacity: saved, minHeight: compact ? 42 : 38 }}>
        <span style={{ fontFamily: F.sans, fontSize: compact ? 23 : 14, letterSpacing: 0, padding: "9px 14px", background: C.ok, color: "#fff" }}>Entry saved</span>
        <span style={{ fontFamily: F.sans, fontSize: compact ? 20 : 13, letterSpacing: 0, color: C.ok }}>Alert resolved · record linked</span>
      </div>
    </Panel>
  );
}

export function SceneHandoff() {
  const frame = useCurrentFrame();
  const compact = useVideoConfig().width < 1000;
  const scan = useRamp(38, 92);
  const transfer = useRamp(72, 144);
  const reveal = useRamp(78, 142);
  const saved = useRamp(168, 184);

  return (
    <div style={{ position: "absolute", inset: 0, padding: compact ? "34px 32px 54px" : "32px 88px 96px", display: "flex", flexDirection: "column", gap: compact ? 16 : 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingRight: compact ? 0 : 120 }}>
        <Rise delay={4}><Headline size={compact ? 44 : 56}>From paper to a searchable record.</Headline></Rise>
        <Rise delay={10}><Body size={compact ? 28 : 19} color={C.inkDim}>Turn a marked-up sheet into a linked logbook entry.</Body></Rise>
      </div>

      {compact ? (
        <div style={{ position: "relative", flex: 1, minHeight: 0, background: "#f6efe3" }}>
          <PaperSheet compact scan={scan} transfer={transfer} />
          <DigitalLogbook compact frame={frame} reveal={reveal} saved={saved} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)", gap: 20, flex: 1, minHeight: 0 }}>
          <PaperSheet compact={false} scan={scan} transfer={transfer} />
          <DigitalLogbook compact={false} frame={frame} reveal={reveal} saved={saved} />
        </div>
      )}
    </div>
  );
}
