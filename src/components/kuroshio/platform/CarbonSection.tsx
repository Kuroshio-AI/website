import { Band, SectionHead } from "@/components/kuroshio/Sections";

// Illustrative month for the same plant the demo film follows.
const MACHINES = [
  { name: "Extrusion Line 02", kg: 412 },
  { name: "Hydraulic Press", kg: 298 },
  { name: "Cooling Pump Skid", kg: 186 },
  { name: "Chiller 02", kg: 121 },
  { name: "Compressor", kg: 96 },
] as const;

const TOTAL = MACHINES.reduce((sum, machine) => sum + machine.kg, 0);
const MAX = Math.max(...MACHINES.map((machine) => machine.kg));

const POINTS = [
  "CO2e is worked out per machine, per hour, from the energy it actually used.",
  "Each month closes with a report you can hand to an auditor.",
  "Scope 2 figures export ready for ESG filings and customer questionnaires.",
];

export function CarbonSection() {
  return (
    <Band id="carbon-tracking" tone="canvas-sunk">
      <div className="shell flex flex-col gap-14 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHead
            body="Emissions come from measured consumption, not floor area, so the number holds up when someone asks where it came from."
            eyebrow="Carbon"
            title="Emissions you can defend."
          />
          <ul className="grid gap-3 text-base leading-relaxed text-ink lg:grid-cols-3 lg:gap-10" data-reveal="up">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-20">
          <div className="flex flex-col gap-4" data-reveal="scale">
            <p className="font-display text-[clamp(4.5rem,13vw,10rem)] leading-[0.85] font-bold tracking-[-0.05em] text-ink readout">
              {TOTAL.toLocaleString("en-US")}
              <span className="ml-3 align-baseline text-[0.3em] tracking-tight text-ink-dim">kg CO2e</span>
            </p>
            <p className="text-base text-ink">Five metered machines, September 2026.</p>
          </div>

          <ul className="flex flex-col gap-6" data-reveal="up">
            {MACHINES.map((machine) => (
              <li className="flex flex-col gap-2" key={machine.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-base text-ink">{machine.name}</span>
                  <span className="readout text-base text-ink">{machine.kg} kg</span>
                </div>
                <div className="h-2 bg-canvas">
                  <div
                    className="h-full bg-brand"
                    style={{ width: `${(machine.kg / MAX) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}
