import { Band } from "@/components/kuroshio/Sections";

// Same alert as the demo film's predict scene: Extrusion Line 02, ALR-4471.
const SCORE = 71;
const READINGS = [
  ["Sideband at 2× line frequency", "+41%"],
  ["Confidence", "87%"],
  ["Predicted warning", "12 days"],
  ["Recommended action", "Next shutdown"],
] as const;

const POINTS = [
  "Every motor gets a health score from 0 to 100, with alerts written in plain language.",
  "Current trends show phase imbalance and winding wear as they start.",
  "Heating elements are watched across full load cycles, not single readings.",
  "Each alert says how long you have and how sure the model is.",
];

function HealthDial() {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <figure className="panel flex flex-col gap-8 p-6 sm:p-10" data-reveal="scale">
      <figcaption className="flex flex-col gap-1">
        <span className="text-lg font-semibold text-ink">Extrusion Line 02, drive-end bearing</span>
        <span className="text-[0.9375rem] text-ink-dim">Alert ALR-4471, bearing wear</span>
      </figcaption>

      <svg
        aria-label={`Health score ${SCORE} out of 100`}
        className="mx-auto w-full max-w-[22rem]"
        role="img"
        viewBox="0 0 240 240"
      >
        <circle cx="120" cy="120" fill="none" r={radius} stroke="var(--canvas-sunk)" strokeWidth="14" />
        <circle
          cx="120"
          cy="120"
          fill="none"
          r={radius}
          stroke="var(--flare)"
          strokeDasharray={`${circumference * (SCORE / 100)} ${circumference}`}
          strokeWidth="14"
          transform="rotate(-90 120 120)"
        />
        <text className="readout" fill="var(--flare)" fontSize="72" fontWeight="600" textAnchor="middle" x="120" y="136">
          {SCORE}
        </text>
        <text fill="var(--ink-dim)" fontSize="13" textAnchor="middle" x="120" y="164">
          health score / 100
        </text>
      </svg>

      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {READINGS.map(([label, value]) => (
          <div className="flex flex-col gap-1 bg-canvas px-4 py-3" key={label}>
            <dt className="text-sm text-ink-dim">{label}</dt>
            <dd className="readout text-xl font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export function PredictSection() {
  return (
    <Band id="predictive-maintenance" tone="canvas-sunk">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <HealthDial />

        <div className="order-first flex flex-col gap-8 lg:order-none">
          <h2 className="display-lg max-w-xl" data-reveal="up">
            Catch failures weeks early.
          </h2>
          <p className="lede max-w-xl" data-reveal="up" data-reveal-delay="0.08">
            Models trained on industrial failure signatures spot bearing wear, winding damage and
            element faults long before a machine stops.
          </p>
          <div className="flex max-w-xl flex-col gap-4 text-base leading-relaxed text-ink sm:text-[1.0625rem]" data-reveal="up">
            {POINTS.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
