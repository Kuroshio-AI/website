import { useCurrentFrame } from "remotion";

import { Body, Headline, Mono, Panel, Readout, Rise } from "../parts";
import { useRamp } from "../timing";
import { C, F } from "../theme";

const MACHINES = [
  "Extruder 01",
  "Chiller A",
  "Press Line 2",
  "CNC Mill 04",
  "Compressor",
  "Cooling Pump",
  "Granulator",
  "Furnace 01",
];

function DarkTile({ name, index }) {
  const frame = useCurrentFrame();
  const flicker =
    0.18 + 0.14 * Math.abs(Math.sin((frame + index * 37) * 0.06 + index));
  return (
    <Rise delay={14 + index * 3} y={12}>
      <div
        style={{
          border: `1px solid ${C.hairline}`,
          background: "rgba(7,26,38,0.7)",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          height: 92,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Mono size={11} color={C.boneFaint}>
            {name}
          </Mono>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 6,
              background: C.boneFaint,
              opacity: flicker,
            }}
          />
        </div>
        <Readout size={26} color="rgba(147,202,205,0.30)">
          — — —
        </Readout>
      </div>
    </Rise>
  );
}

export function SceneBlind() {
  const barGrow = useRamp(46, 86);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "132px 88px 110px",
        display: "grid",
        gridTemplateColumns: "1fr 640px",
        gap: 64,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <Rise delay={0}>
          <Mono color={C.flare}>The starting condition</Mono>
        </Rise>
        <Rise delay={5}>
          <Headline size={78}>
            One bill.
            <br />
            Forty machines.
            <br />
            <span style={{ color: C.boneFaint }}>Zero visibility.</span>
          </Headline>
        </Rise>
        <Rise delay={14}>
          <Body size={23} style={{ maxWidth: 500 }}>
            Energy is metered at the gate, not the machine. Bearings fail on a
            Tuesday with no warning. Maintenance history lives in a paper
            logbook nobody can search.
          </Body>
        </Rise>

        <Rise delay={40}>
          <div
            style={{
              marginTop: 14,
              border: `1px solid rgba(255,148,72,0.4)`,
              background: "rgba(255,148,72,0.07)",
              padding: "18px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              maxWidth: 540,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Mono size={11} color={C.flare}>
                DEWA · monthly · unallocated
              </Mono>
              <Readout size={38} color={C.flare}>
                AED {(184320 * barGrow).toLocaleString("en", {
                  maximumFractionDigits: 0,
                })}
              </Readout>
            </div>
            <div style={{ flex: 1, height: 46, display: "flex", alignItems: "flex-end", gap: 4 }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    flex: 1,
                    height: `${18 + Math.abs(Math.sin(i * 1.7)) * 74 * barGrow}%`,
                    background: "rgba(255,148,72,0.32)",
                  }}
                />
              ))}
            </div>
          </div>
        </Rise>
      </div>

      <Panel title="Plant floor · live telemetry" meta="0 of 8 reporting">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {MACHINES.map((name, index) => (
            <DarkTile index={index} key={name} name={name} />
          ))}
        </div>
        <div
          style={{
            marginTop: 18,
            paddingTop: 16,
            borderTop: `1px solid ${C.hairline}`,
            fontFamily: F.mono,
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.boneFaint,
          }}
        >
          No signal source configured
        </div>
      </Panel>
    </div>
  );
}
