import { Band } from "@/components/kuroshio/Sections";
import { cn } from "@/lib/utils";

// One day on the plant floor, told around the same Extrusion Line 02 idle
// window as the demo film. Figures are illustrative.
const ROWS = [
  {
    machine: "Extrusion Line 02",
    where: "Unit 4 · Polymer extrusion",
    state: "running",
    idleMinutes: 102,
    energy: "486.20 kWh",
    idleCost: 16.5,
    load: 68,
  },
  {
    machine: "Chiller 02",
    where: "Plant room · Centrifugal chiller",
    state: "running",
    idleMinutes: 0,
    energy: "318.40 kWh",
    idleCost: 0,
    load: 74,
  },
  {
    machine: "Cooling Pump Skid",
    where: "Unit 6 · Centrifugal pump",
    state: "idle",
    idleMinutes: 56,
    energy: "109.91 kWh",
    idleCost: 4.2,
    load: 22,
  },
  {
    machine: "Hydraulic Press Line",
    where: "Unit 5 · Hydraulic press",
    state: "off",
    idleMinutes: 0,
    energy: "207.92 kWh",
    idleCost: 0,
    load: 0,
  },
] as const;

const STATE = {
  running: { label: "Running", dot: "bg-ok" },
  idle: { label: "Idle", dot: "bg-flare" },
  off: { label: "Off", dot: "bg-ink-faint" },
} as const;

const formatIdle = (minutes: number) => {
  if (minutes === 0) return "None";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
};

const formatAed = (aed: number) => (aed === 0 ? "None" : `AED ${aed.toFixed(2)}`);

const WORST = ROWS.reduce((a, b) => (b.idleMinutes > a.idleMinutes ? b : a));

function StateMark({ state }: Readonly<{ state: keyof typeof STATE }>) {
  return (
    <span className="inline-flex items-center gap-2 text-ink">
      <span aria-hidden="true" className={cn("size-2 rounded-full", STATE[state].dot)} />
      {STATE[state].label}
    </span>
  );
}

function LoadBar({ load }: Readonly<{ load: number }>) {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="h-2 w-full max-w-28 bg-canvas-sunk">
        <span className="block h-full bg-ink-dim" style={{ width: `${load}%` }} />
      </span>
      <span className="readout w-10 text-right text-ink">{load}%</span>
    </span>
  );
}

const HEADS = ["Machine", "State", "Idle today", "Energy today", "Idle cost", "Load"];

export function EnergySection() {
  return (
    <Band id="energy-iq">
      <div className="shell flex flex-col gap-12 md:gap-16">
        <header className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <h2 className="display-lg" data-reveal="up">
            Energy, down to the machine.
          </h2>
          <p className="lede max-w-xl" data-reveal="up" data-reveal-delay="0.08">
            Clamp-on meters read each machine every 40 seconds. We price every reading against
            your DEWA tariff, so idle running shows up as money.
          </p>
        </header>

        <div className="bg-panel" data-reveal="up">
          {/* Desktop and tablet: the ledger itself. */}
          <table className="hidden w-full border-collapse text-left text-base md:table">
            <thead>
              <tr>
                {HEADS.map((head) => (
                  <th className="px-5 pt-5 pb-3 text-[0.9375rem] font-medium text-ink-dim" key={head} scope="col">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  className={cn("border-t-4 border-canvas", row === WORST && "bg-flare-soft")}
                  key={row.machine}
                >
                  <th className="px-5 py-4 font-normal" scope="row">
                    <span className="block font-semibold tracking-tight text-ink">{row.machine}</span>
                    <span className="text-[0.9375rem] text-ink-dim">{row.where}</span>
                  </th>
                  <td className="px-5 py-4">
                    <StateMark state={row.state} />
                  </td>
                  <td className="readout px-5 py-4 text-ink">{formatIdle(row.idleMinutes)}</td>
                  <td className="readout px-5 py-4 text-ink">{row.energy}</td>
                  <td className="readout px-5 py-4 text-ink">{formatAed(row.idleCost)}</td>
                  <td className="px-5 py-4">
                    <LoadBar load={row.load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phone: one block per machine, the numbers that matter side by side. */}
          <ul className="flex flex-col gap-1 bg-canvas md:hidden">
            {ROWS.map((row) => (
              <li
                className={cn("flex flex-col gap-4 p-5", row === WORST ? "bg-flare-soft" : "bg-panel")}
                key={row.machine}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold tracking-tight text-ink">{row.machine}</p>
                    <p className="text-[0.9375rem] text-ink-dim">{row.where}</p>
                  </div>
                  <StateMark state={row.state} />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-base">
                  <div>
                    <dt className="text-[0.9375rem] text-ink-dim">Idle today</dt>
                    <dd className="readout text-ink">{formatIdle(row.idleMinutes)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.9375rem] text-ink-dim">Idle cost</dt>
                    <dd className="readout text-ink">{formatAed(row.idleCost)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.9375rem] text-ink-dim">Energy today</dt>
                    <dd className="readout text-ink">{row.energy}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.9375rem] text-ink-dim">Load</dt>
                    <dd>
                      <LoadBar load={row.load} />
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>

        <p className="display-md max-w-4xl" data-reveal="up">
          {WORST.machine} sat idle for {formatIdle(WORST.idleMinutes)} today with nothing coming
          off the line. That cost {formatAed(WORST.idleCost)}.
        </p>
      </div>
    </Band>
  );
}
