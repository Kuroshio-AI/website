/**
 * What actually gets installed, drawn to scale-ish.
 *
 * A buyer is being asked to put our hardware inside their panel. A stock photo
 * of somebody else's factory does not answer that; a labelled drawing of the
 * two parts and where they sit does.
 */
export function HardwareDiagram({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      aria-labelledby="hardware-diagram-title hardware-diagram-desc"
      className={className}
      role="img"
      viewBox="0 0 520 300"
    >
      <title id="hardware-diagram-title">
        What we install: a split-core current transformer on each phase, wired to a
        DIN-rail edge unit with a cellular antenna
      </title>
      <desc id="hardware-diagram-desc">
        The three phase conductors of the machine incomer pass through three
        clamp-on current transformers. Their signal cables run to a DIN-rail
        mounted edge unit, which sends readings out over its own cellular SIM.
        Nothing connects to the machine control system or the site network.
      </desc>

      {/* ---------------------------------------------- machine incomer */}
      <text
        x="8"
        y="26"
        fill="var(--ink-faint)"
        style={{ font: '500 10px var(--font-mono)', letterSpacing: "0.16em" }}
      >
        MACHINE INCOMER
      </text>

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path
            d={`M8 ${58 + i * 30} H150`}
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="square"
            opacity="0.75"
          />
          <text
            x="8"
            y={`${52 + i * 30}`}
            fill="var(--ink-faint)"
            style={{ font: "400 9px var(--font-mono)" }}
          >
            L{i + 1}
          </text>
        </g>
      ))}

      {/* -------------------------------- split-core CTs clamped on each phase */}
      {[0, 1, 2].map((i) => (
        <g key={`ct-${i}`}>
          <rect
            x="96"
            y={`${44 + i * 30}`}
            width="30"
            height="28"
            rx="3"
            fill="var(--brand-soft)"
            stroke="var(--brand)"
            strokeWidth="1.5"
          />
          {/* the hinge line that makes it "split core" — it opens to clip on */}
          <path
            d={`M111 ${44 + i * 30} V${72 + i * 30}`}
            stroke="var(--brand)"
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.7"
          />
          <path
            d={`M126 ${58 + i * 30} C 150 ${58 + i * 30}, 168 ${58 + i * 30}, 190 ${105 + i * 12}`}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1.2"
            opacity="0.55"
          />
        </g>
      ))}

      <text
        x="96"
        y="164"
        fill="var(--brand)"
        style={{ font: '500 10px var(--font-mono)', letterSpacing: "0.14em" }}
      >
        3 × CT CLAMP
      </text>
      <text x="96" y="180" fill="var(--ink-faint)" style={{ font: "400 11px var(--font-sans)" }}>
        Clips around the cable.
      </text>
      <text x="96" y="195" fill="var(--ink-faint)" style={{ font: "400 11px var(--font-sans)" }}>
        No conductor is cut.
      </text>

      {/* ------------------------------------------------------ edge unit */}
      <rect
        x="250"
        y="72"
        width="150"
        height="96"
        rx="4"
        fill="var(--panel)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        opacity="0.9"
      />
      {/* DIN rail */}
      <path d="M236 120 H414" stroke="var(--ink-faint)" strokeWidth="6" opacity="0.25" />
      <path d="M236 120 H414" stroke="var(--ink-faint)" strokeWidth="1" opacity="0.5" />

      {/* status LEDs */}
      {[
        ["var(--ok)", 0],
        ["var(--brand)", 1],
        ["var(--flare)", 2],
      ].map(([colour, i]) => (
        <circle key={String(i)} cx={268 + Number(i) * 12} cy="88" r="3.5" fill={String(colour)} />
      ))}

      <text
        x="264"
        y="122"
        fill="var(--ink)"
        style={{ font: '600 13px var(--font-mono)', letterSpacing: "0.06em" }}
      >
        KX-100
      </text>
      <text x="264" y="140" fill="var(--ink-faint)" style={{ font: "400 10px var(--font-mono)" }}>
        DIN RAIL · 4 MODULES
      </text>

      {/* terminal block along the bottom edge */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={262 + i * 16}
          y="152"
          width="9"
          height="8"
          fill="var(--canvas-sunk)"
          stroke="var(--ink-faint)"
          strokeWidth="0.75"
        />
      ))}

      <text
        x="250"
        y="192"
        fill="var(--ink-faint)"
        style={{ font: '500 10px var(--font-mono)', letterSpacing: "0.14em" }}
      >
        EDGE UNIT
      </text>
      <text x="250" y="208" fill="var(--ink-faint)" style={{ font: "400 11px var(--font-sans)" }}>
        Sits on spare DIN rail in
      </text>
      <text x="250" y="223" fill="var(--ink-faint)" style={{ font: "400 11px var(--font-sans)" }}>
        your existing panel.
      </text>

      {/* ------------------------------------------------ cellular antenna */}
      <path d="M400 96 H436 V56" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.75" />
      <circle cx="436" cy="50" r="4" fill="var(--brand)" />
      {[12, 20, 28].map((r, i) => (
        <path
          key={r}
          d={`M${436 - r * 0.72} ${50 - r * 0.5} A ${r} ${r} 0 0 1 ${436 + r * 0.72} ${50 - r * 0.5}`}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.2"
          opacity={0.55 - i * 0.13}
        />
      ))}
      <text
        x="452"
        y="96"
        fill="var(--brand)"
        style={{ font: '500 10px var(--font-mono)', letterSpacing: "0.14em" }}
      >
        OUR SIM
      </text>

      {/* ------------------------------------- the line we explicitly do not cross */}
      <path
        d="M232 24 V262"
        stroke="var(--ink-faint)"
        strokeWidth="1"
        strokeDasharray="5 5"
        opacity="0.4"
      />
      <text
        x="8"
        y="262"
        fill="var(--ink-faint)"
        style={{ font: "400 10px var(--font-mono)", letterSpacing: "0.1em" }}
      >
        YOUR EQUIPMENT
      </text>
      <text
        x="252"
        y="262"
        fill="var(--ink-faint)"
        style={{ font: "400 10px var(--font-mono)", letterSpacing: "0.1em" }}
      >
        OURS · NO PLC, NO NETWORK PORT
      </text>
    </svg>
  );
}
