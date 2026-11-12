import { ArrowRight, Check } from "lucide-react";
import { useId, useState } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import type { PageId } from "@/data/mockData";
import { cn } from "@/lib/utils";

/* Fragment chrome. Everything inside [data-ui] follows the app's own
   conventions (1px control borders, small radii), not the page's. */
export const ui = "bg-white text-[#1d1c17] text-[14px]";
export const uiSoft = "text-[#6a685f]";
export const uiLine = "border-[#e6e5e1]";

/* --------------------------------------------- drag through stages */

const STAGES = [
  { name: "Clamp on", clause: "Clamp on at the incomer." },
  { name: "Read", clause: "Read it every 40 seconds." },
  { name: "Send", clause: "Send it on our own SIM." },
  { name: "Open", clause: "Open it the same day." },
];

function StageFragment({ stage }: Readonly<{ stage: number }>) {
  const row = (label: string, value: string, ok = false) => (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b py-2.5 last:border-0",
        uiLine,
      )}
      key={label}
    >
      <span className={uiSoft}>{label}</span>
      <span
        className={cn(
          "flex items-center gap-1.5 font-medium tabular-nums",
          ok && "text-[#1a6b47]",
        )}
      >
        {ok ? <Check aria-hidden="true" className="size-3.5" /> : null}
        {value}
      </span>
    </div>
  );

  const views = [
    {
      title: "Install · Cooling Pump Skid, Unit 6",
      rows: [
        row("Clamp-on CTs, L1 L2 L3", "Fitted", true),
        row("Edge unit powered", "Yes", true),
        row("PLC or BMS connection", "None", true),
        row("Machine stopped", "No", true),
        row("Time on site", "3 h 20 m"),
      ],
    },
    {
      title: "Readings · Cooling Pump Skid",
      rows: [
        row("10:41:20", "18.2 A · 9.6 kW"),
        row("10:42:00", "18.4 A · 9.7 kW"),
        row("10:42:40", "18.3 A · 9.6 kW"),
        row("10:43:20", "6.1 A · 3.2 kW"),
        row("10:44:00", "6.0 A · 3.1 kW · idle"),
      ],
    },
    {
      title: "Uplink · edge unit KR-0614",
      rows: [
        row("Route", "Cellular, du"),
        row("Your site network", "Not used", true),
        row("Encryption", "TLS 1.3", true),
        row("Processed in", "Azure UAE North"),
        row("Last packet", "12 s ago"),
      ],
    },
    {
      title: "Cooling Pump Skid · today",
      rows: [
        row("Energy", "109.9 kWh"),
        row("Cost", "AED 41.77"),
        row("Idle", "56 min"),
        row("Motor health", "92 of 100"),
        row("Open alerts", "1, idle running"),
      ],
    },
  ];
  const view = views[stage];

  return (
    <div
      className={cn(
        ui,
        "w-[min(440px,calc(100vw-2rem))] max-w-full px-5 py-4 md:w-[min(440px,42vw)]",
      )}
      data-ui
    >
      <p className="mb-2 text-[15px] font-semibold">{view.title}</p>
      {view.rows}
    </div>
  );
}

export function StageSlider() {
  const [stage, setStage] = useState(0);
  const sliderId = useId();

  return (
    <section
      className="grid md:min-h-[88svh] md:grid-cols-2 md:grid-rows-[1fr_auto]"
      aria-labelledby={`${sliderId}-h`}
    >
      <div className="order-2 flex flex-col justify-between gap-10 bg-canvas-sunk px-4 py-10 sm:px-8 md:order-none md:px-10 md:py-16">
        <h2
          className="display-lg max-w-[12ch] transition-opacity duration-200"
          id={`${sliderId}-h`}
          key={stage}
        >
          {STAGES[stage].clause}
        </h2>
        <p className="lede max-w-[40ch]">
          {
            [
              "Meters clamp around the cables feeding the machine. Nothing is cut, nothing stops, and nobody touches your control system.",
              "The edge unit samples current, voltage and energy on all three phases, every 40 seconds, day and night.",
              "Data leaves on an encrypted Etisalat or du SIM that we supply. Your IT team never opens a port.",
              "Most sites see their first machine on the dashboard within 24 hours of the install.",
            ][stage]
          }
        </p>
      </div>
      <div className="order-1 flex min-h-[46svh] items-center justify-center bg-brand px-4 py-10 md:order-none">
        <div className="transition-opacity duration-200" key={stage}>
          <StageFragment stage={stage} />
        </div>
      </div>

      <div className="order-1 col-span-full bg-ink px-4 py-6 sm:px-8 md:order-none md:px-10">
        <label className="sr-only" htmlFor={sliderId}>
          Installation stage
        </label>
        <input
          aria-valuetext={STAGES[stage].name}
          className="stage-range w-full"
          id={sliderId}
          max={STAGES.length - 1}
          min={0}
          onChange={(e) => setStage(Number(e.target.value))}
          step={1}
          style={{
            ["--pct" as string]: `${(stage / (STAGES.length - 1)) * 100}%`,
          }}
          type="range"
          value={stage}
        />
        <div className="mt-3 flex justify-between text-[0.9375rem]">
          {STAGES.map((s, i) => (
            <button
              className={cn(
                "min-h-11 transition-colors",
                i === stage
                  ? "font-semibold text-canvas"
                  : "text-canvas/70 hover:text-canvas",
              )}
              key={s.name}
              onClick={() => setStage(i)}
              type="button"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- pricing */

const PLAN_ROWS: ReadonlyArray<readonly [string, string, string]> = [
  ["What we meter", "One machine, your choice", "Every machine you name"],
  ["How long", "Four weeks, start to report", "Ongoing"],
  ["Install", "3 to 4 hours, no stoppage", "Same clamp-on kit, no stoppage"],
  ["If it shows nothing", "75% of the fee refunded", "You keep every record"],
  ["What you keep", "The four-week report", "Full history, exportable as PDF"],
];

export function PilotTable() {
  return (
    <section className="band bg-canvas">
      <div className="shell">
        <table className="w-full border-collapse text-left max-md:hidden">
          <thead>
            <tr>
              <th className="w-1/3 pr-6 pb-8 align-top" scope="col">
                <h2 className="display-md">Pilot the platform</h2>
              </th>
              <th
                className="bg-brand px-6 pt-6 pb-8 align-top text-white"
                scope="col"
              >
                <span className="block font-[family-name:var(--font-display)] text-[3vw] leading-none font-bold tracking-[-0.03em]">
                  Pilot
                </span>
                <span className="mt-2 block text-[3vw] leading-none font-normal tracking-[-0.03em]">
                  AED 1,500
                </span>
                <span className="mt-2 block text-base font-normal">
                  at most, for four weeks
                </span>
              </th>
              <th className="px-6 pt-6 pb-8 align-top" scope="col">
                <span className="block font-[family-name:var(--font-display)] text-[3vw] leading-none font-bold tracking-[-0.03em]">
                  Site rollout
                </span>
                <span className="mt-2 block text-[3vw] leading-none font-normal tracking-[-0.03em]">
                  Quoted
                </span>
                <span className="mt-2 block text-base font-normal">
                  from the pilot report
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-[1.375rem]">
            {PLAN_ROWS.map(([label, pilot, rollout], index) => (
              <tr
                className={index % 2 === 0 ? "bg-canvas-sunk" : undefined}
                key={label}
              >
                <th className="px-4 py-5 font-normal text-ink-dim" scope="row">
                  {label}
                </th>
                <td className="bg-brand px-6 py-5 text-white">{pilot}</td>
                <td className="px-6 py-5">{rollout}</td>
              </tr>
            ))}
            <tr>
              <td />
              <td className="bg-brand px-6 pt-4 pb-6">
                <PageLink
                  className="btn-ghost bg-white hover:bg-canvas"
                  page="contact"
                >
                  Start the pilot
                </PageLink>
              </td>
              <td className="px-6 pt-4 pb-6">
                <PageLink className="btn-ghost" page="contact">
                  Talk to an engineer
                </PageLink>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Phone: each plan as its own block. */}
        <div className="flex flex-col gap-14 md:hidden">
          <h2 className="display-lg mb-4">Pilot the platform</h2>
          {[
            {
              name: "Pilot",
              price: "AED 1,500",
              note: "at most, for four weeks",
              col: 1,
              accent: true,
            },
            {
              name: "Site rollout",
              price: "Quoted",
              note: "from the pilot report",
              col: 2,
              accent: false,
            },
          ].map((plan) => (
            <div
              className={cn(
                "flex flex-col gap-4 p-5",
                plan.accent ? "bg-brand text-white" : "bg-canvas-sunk",
              )}
              key={plan.name}
            >
              <h3 className="font-[family-name:var(--font-display)] text-[9vw] leading-none font-bold tracking-[-0.03em]">
                {plan.name}
              </h3>
              <p className="text-[9vw] leading-none tracking-[-0.03em]">
                {plan.price}
              </p>
              <p className="text-base">{plan.note}</p>
              <dl className="flex flex-col gap-3 text-[1.0625rem]">
                {PLAN_ROWS.map((row) => (
                  <div key={row[0]}>
                    <dt
                      className={plan.accent ? "text-white/80" : "text-ink-dim"}
                    >
                      {row[0]}
                    </dt>
                    <dd>{row[plan.col]}</dd>
                  </div>
                ))}
              </dl>
              <PageLink
                className={cn("btn-ghost w-full", plan.accent && "bg-white")}
                page="contact"
              >
                {plan.accent ? "Start the pilot" : "Talk to an engineer"}
              </PageLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------- first step, open */

export const PILOT_NOTE_KEY = "kuroshio:pilot-note";

export function PilotDialog({
  onNavigate,
}: Readonly<{ onNavigate: (page: PageId) => void }>) {
  const [need, setNeed] = useState(
    "Track lifting-gear certificates for 3 yards",
  );
  const [kind, setKind] = useState<(typeof KINDS)[number]>("KTrack");
  const fieldId = useId();

  return (
    <section className="band bg-brand text-white">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-x-6">
        <div className="flex flex-col gap-8 md:col-span-6">
          <h2 className="font-[family-name:var(--font-display)] text-[13vw] leading-[0.92] font-bold tracking-[-0.045em] md:text-[clamp(3.5rem,7vw,7rem)]">
            Tell us the job.
          </h2>
          <ol className="flex max-w-[44ch] flex-col gap-5 text-[1.0625rem]">
            {[
              [
                "Write it in a line.",
                "A product question or a tool you wish existed. Rough is fine.",
              ],
              [
                "An engineer replies within 24 hours.",
                "The person who would build or install it, by email or WhatsApp.",
              ],
              [
                "You get a plan and a timeline.",
                "What we would set up, what it needs from your side, and how long it takes.",
              ],
            ].map(([step, detail], index) => (
              <li
                className="grid grid-cols-[2rem_1fr] border-t border-white/25 pt-4"
                key={step}
              >
                <span className="font-semibold tabular-nums text-white/70">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold">{step}</span>
                  <span className="text-white/80">{detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 md:col-span-5 md:col-start-8 md:justify-end">
          <form
            className={cn(ui, "w-full max-w-[440px] p-6")}
            data-ui
            onSubmit={(e) => {
              e.preventDefault();
              try {
                sessionStorage.setItem(
                  PILOT_NOTE_KEY,
                  `${kind}: ${need.trim() || "please get in touch"}.`,
                );
              } catch {
                /* storage blocked: the contact form still opens, just empty */
              }
              onNavigate("contact");
            }}
          >
            <p className="text-[17px] font-semibold">New request</p>
            <fieldset className="mt-4">
              <legend className={cn("text-[13px]", uiSoft)}>
                What it is about
              </legend>
              <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-[6px] bg-[#f0efec] p-1">
                {KINDS.map((k) => (
                  <label
                    className={cn(
                      "cursor-pointer rounded-[4px] px-1 py-2 text-center text-[13px] font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#094cb2]",
                      kind === k
                        ? "bg-white"
                        : "text-[#6a685f] hover:text-[#1d1c17]",
                    )}
                    key={k}
                  >
                    <input
                      checked={kind === k}
                      className="sr-only"
                      name="kind"
                      onChange={() => setKind(k)}
                      type="radio"
                      value={k}
                    />
                    {k}
                  </label>
                ))}
              </div>
            </fieldset>
            <label
              className={cn("mt-4 block text-[13px]", uiSoft)}
              htmlFor={fieldId}
            >
              The job, in a line
            </label>
            <input
              className="mt-1.5 w-full rounded-[4px] border border-[#d4d2cc] px-3 py-2.5 text-[15px] outline-none focus:border-[#094cb2] focus-visible:outline-2 focus-visible:outline-[#094cb2]"
              id={fieldId}
              onChange={(e) => setNeed(e.target.value)}
              value={need}
            />
            <button
              className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[4px] bg-[#094cb2] text-[15px] font-semibold text-white transition-[background-color,transform] hover:bg-[#133976] active:scale-[0.98]"
              type="submit"
            >
              Send this to an engineer
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </form>
          <ReplyFragment />
        </div>
      </div>
    </section>
  );
}

const KINDS = ["Platform", "KTrack", "Custom tool"] as const;

/** What comes back. A sample, so it can become a HyperFrames loop like the product panels. */
function ReplyFragment() {
  return (
    <div className={cn(ui, "w-full max-w-[440px] p-6")} data-ui>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-semibold">Reply from an engineer</p>
        <p className={cn("text-[13px]", uiSoft)}>Example · 3 h later</p>
      </div>
      <p className="mt-2 leading-relaxed">
        KTrack covers this as it is. We would load your current certificate
        list, set expiry alerts for each yard, and set up your inspectors'
        phones on site.
      </p>
      <p className={cn("mt-3 border-t pt-3 text-[13px] font-medium", uiLine)}>
        Live in about 2 weeks · no hardware needed
      </p>
    </div>
  );
}
