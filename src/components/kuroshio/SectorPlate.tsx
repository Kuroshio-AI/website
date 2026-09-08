import { cn } from "@/lib/utils";

/**
 * The visual that sits opposite a flagship sector write-up.
 *
 * Factory sectors have photography. Building sectors do not yet, and a stock
 * photo of somebody else's tower would say less than a drawing of where the
 * meter actually goes — so the fallback is a riser schematic rather than a
 * placeholder. Add an `image` to a sector and it takes over automatically.
 */
export function SectorPlate({
  image,
  imageAlt,
  index,
  caption,
  diagram = "riser",
}: Readonly<{
  image?: string;
  imageAlt?: string;
  index: number;
  caption: string;
  diagram?: "riser" | "chiller";
}>) {
  return (
    <div className="panel corner-marks group relative overflow-hidden">
      {image ? (
        <img
          alt={imageAlt}
          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          src={image}
        />
      ) : (
        <SchematicPlate caption={caption} diagram={diagram} />
      )}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/15 via-transparent to-transparent",
          !image && "opacity-40"
        )}
      />
      <div
        aria-hidden="true"
        className="grid-field-fine pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
      />
      <span className="tag-brand absolute top-4 left-4 border border-brand-line bg-panel px-2 py-1">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function SchematicPlate({
  caption,
  diagram,
}: Readonly<{ caption: string; diagram: "riser" | "chiller" }>) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas-sunk">
      <div aria-hidden="true" className="grid-field absolute inset-0 opacity-40" />
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 320 240"
      >
        {diagram === "chiller" ? <ChillerLoop /> : <Riser />}
      </svg>
      <span className="tag absolute right-4 bottom-4 text-ink-faint">{caption}</span>
    </div>
  );
}

/** Tower section: occupied floors above, metered plant below, one clamp between. */
function Riser() {
  const floors = [0, 1, 2, 3, 4, 5];

  return (
    <>
        {/* Roof cap and ground, so the stack reads as a tower rather than a list. */}
        <path
          d="M146 34 L200 20 L254 34"
          fill="var(--panel)"
          stroke="var(--hairline-strong)"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
        <line
          stroke="var(--hairline-strong)"
          strokeWidth="1.25"
          x1="60"
          x2="284"
          y1="202"
          y2="202"
        />

        {/* Occupied floors: the load the plant room downstairs is serving. */}
        {floors.map((floor) => {
          const y = 40 + floor * 20;
          return (
            <g key={floor}>
              <rect
                fill="var(--panel)"
                height="16"
                stroke="var(--hairline-strong)"
                strokeWidth="1"
                width="104"
                x="148"
                y={y}
              />
              {[0, 1, 2, 3].map((window) => (
                <rect
                  fill="var(--hairline-strong)"
                  height="6"
                  key={window}
                  opacity={0.5}
                  width="14"
                  x={158 + window * 22}
                  y={y + 5}
                />
              ))}
            </g>
          );
        })}

        {/* Plant room: chillers and pumps, the assets we actually meter. */}
        <rect
          fill="var(--brand-soft)"
          height="40"
          stroke="var(--brand)"
          strokeWidth="1.5"
          width="104"
          x="148"
          y="162"
        />
        <text
          fill="var(--brand)"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="1.4"
          x="156"
          y="174"
        >
          PLANT ROOM
        </text>
        {[0, 1, 2].map((unit) => (
          <rect
            fill="none"
            height="14"
            key={unit}
            stroke="var(--brand)"
            strokeOpacity={0.75}
            strokeWidth="1.25"
            width="26"
            x={156 + unit * 32}
            y="180"
          />
        ))}

        {/* Three-phase riser dropping from the building supply to the plant room. */}
        {[0, 1, 2].map((phase) => (
          <line
            key={phase}
            stroke="var(--brand)"
            strokeOpacity={0.5}
            strokeWidth="1"
            x1={96 + phase * 5}
            x2={96 + phase * 5}
            y1="40"
            y2="182"
          />
        ))}
        <path
          d="M101 182 L101 190 L148 190"
          fill="none"
          stroke="var(--brand)"
          strokeOpacity={0.5}
          strokeWidth="1"
        />

        {/* The clamp — the single point of contact with the building. */}
        <circle cx="101" cy="132" fill="var(--panel)" r="15" stroke="var(--brand)" strokeWidth="1.5" />
        <circle cx="101" cy="132" fill="var(--brand)" r="3.5" />
        <text
          fill="var(--ink-faint)"
          fontSize="8"
          letterSpacing="1.4"
          textAnchor="middle"
          x="101"
          y="108"
        >
          CLAMP-ON
        </text>
    </>
  );
}

/** Plant-room single line: supply, three chillers, condenser loop, pumped return. */
function ChillerLoop() {
  const rows = [61, 109, 157];

  return (
    <>
      {/* Incoming three-phase supply and the switchboard it lands on. */}
      {[0, 1, 2].map((phase) => (
        <line
          key={phase}
          stroke="var(--brand)"
          strokeOpacity={0.5}
          strokeWidth="1"
          x1="10"
          x2="56"
          y1={118 + phase * 4}
          y2={118 + phase * 4}
        />
      ))}
      <line stroke="var(--brand)" strokeOpacity={0.5} strokeWidth="1" x1="84" x2="100" y1="122" y2="122" />
      <rect
        fill="var(--panel)"
        height="36"
        stroke="var(--hairline-strong)"
        strokeWidth="1.25"
        width="16"
        x="100"
        y="104"
      />

      {/* Distribution from the board to each machine. */}
      <line stroke="var(--hairline-strong)" strokeWidth="1" x1="116" x2="126" y1="122" y2="122" />
      <line stroke="var(--hairline-strong)" strokeWidth="1" x1="126" x2="126" y1="61" y2="157" />
      {rows.map((y) => (
        <line key={y} stroke="var(--hairline-strong)" strokeWidth="1" x1="126" x2="138" y1={y} y2={y} />
      ))}

      {/* Three centrifugal chillers, compressor set on the shell. */}
      {rows.map((y) => (
        <g key={y}>
          <rect
            fill="var(--panel)"
            height="26"
            rx="13"
            stroke="var(--hairline-strong)"
            strokeWidth="1.25"
            width="104"
            x="138"
            y={y - 13}
          />
          <circle cx="151" cy={y} fill="none" r="8" stroke="var(--hairline-strong)" strokeWidth="1" />
          <rect
            fill="var(--brand-soft)"
            height="11"
            stroke="var(--brand)"
            strokeOpacity={0.7}
            strokeWidth="1"
            width="30"
            x="192"
            y={y - 24}
          />
          <line
            stroke="var(--hairline-strong)"
            strokeWidth="1"
            x1="242"
            x2="256"
            y1={y}
            y2={y}
          />
        </g>
      ))}

      {/* Condenser side: cooling towers on the roof. */}
      {rows.map((y) => (
        <g key={y}>
          <path
            d={`M256 ${y + 14} L262 ${y - 14} L294 ${y - 14} L300 ${y + 14} Z`}
            fill="var(--panel)"
            stroke="var(--hairline-strong)"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
          <circle cx="278" cy={y - 4} fill="none" r="7" stroke="var(--brand)" strokeOpacity={0.7} strokeWidth="1" />
          {[0, 1, 2].map((blade) => (
            <line
              key={blade}
              stroke="var(--brand)"
              strokeOpacity={0.7}
              strokeWidth="1"
              transform={`rotate(${blade * 60} 278 ${y - 4})`}
              x1="271"
              x2="285"
              y1={y - 4}
              y2={y - 4}
            />
          ))}
        </g>
      ))}

      {/* Chilled-water header and the two pumps that move it. */}
      <path
        d="M138 170 L138 183 L296 183 L296 171"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="1.5"
      />
      {[185, 240].map((x) => (
        <g key={x}>
          <circle cx={x} cy="183" fill="var(--panel)" r="10" stroke="var(--brand)" strokeWidth="1.5" />
          <path d={`M${x - 4} 178 L${x + 5} 183 L${x - 4} 188 Z`} fill="var(--brand)" />
        </g>
      ))}
      {[160, 215, 270].map((x) => (
        <path d={`M${x} 179 L${x + 6} 183 L${x} 187 Z`} fill="var(--brand)" key={x} opacity={0.45} />
      ))}

      {/* The clamp — the single point of contact with the plant. */}
      <circle cx="70" cy="122" fill="var(--panel)" r="14" stroke="var(--brand)" strokeWidth="1.5" />
      <circle cx="70" cy="122" fill="var(--brand)" r="3.5" />
      <text
        fill="var(--ink-faint)"
        fontSize="8"
        letterSpacing="1.4"
        textAnchor="middle"
        x="70"
        y="150"
      >
        CLAMP-ON
      </text>
    </>
  );
}
