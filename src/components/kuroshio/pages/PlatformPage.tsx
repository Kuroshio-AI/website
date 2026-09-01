import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import { CurrentField } from "@/components/kuroshio/CurrentField";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { PageLink } from "@/components/kuroshio/PageLink";
import { Band, SectionHead } from "@/components/kuroshio/Sections";
import { homePage, platformPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";
import { ScrollTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

const TONE_CLASS = {
  info: "text-signal border-signal/40 bg-signal/8",
  warning: "text-flare border-flare/40 bg-flare/8",
  neutral: "text-bone-dim border-hairline bg-transparent",
} as const;

function AnchorRail() {
  const [active, setActive] = useState(platformPage.anchorNav[0].id);
  const railRef = useRef<HTMLDivElement>(null);

  usePageMotion(railRef, () => {
    platformPage.anchorNav.forEach((item) => {
      const section = document.getElementById(item.id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) setActive(item.id);
        },
      });
    });
  });

  return (
    <div
      className="sticky top-[96px] z-30 border-y border-hairline bg-abyss/92 backdrop-blur-xl"
      ref={railRef}
    >
      <nav aria-label="Platform sections" className="shell mask-fade-x flex gap-1 overflow-x-auto py-2">
        {platformPage.anchorNav.map((item) => (
          <a
            aria-current={active === item.id ? "true" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2 border px-3.5 py-2 text-[0.8125rem] tracking-tight whitespace-nowrap transition-colors",
              active === item.id
                ? "border-signal/50 bg-signal/8 text-signal"
                : "border-transparent text-bone-faint hover:text-bone"
            )}
            href={`#${item.id}`}
            key={item.id}
          >
            <KuroshioIcon className="size-3.5" name={item.icon} strokeWidth={1.75} />
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function MetricStrip() {
  return (
    <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
      {platformPage.metrics.map((metric) => (
        <div className="flex flex-col gap-3 bg-abyss px-5 py-5" data-reveal="up" key={metric.label}>
          <div className="flex items-center justify-between gap-3">
            <span className="tag leading-tight">{metric.label}</span>
            <KuroshioIcon className="size-4 text-bone-faint" name={metric.icon} strokeWidth={1.5} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="readout text-2xl leading-none text-bone md:text-[1.75rem]">
              {metric.value}
            </span>
            <span className="text-xs text-bone-faint">{metric.unit}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "border px-2 py-0.5 text-[0.625rem] tracking-[0.14em] uppercase",
                TONE_CLASS[metric.tone as keyof typeof TONE_CLASS]
              )}
            >
              {metric.helper}
            </span>
            <span className="text-[0.6875rem] text-bone-faint">{metric.delta}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MachineTable() {
  return (
    <div className="panel corner-marks overflow-hidden" data-reveal="up">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
        <span className="tag text-bone-dim">Machine energy · current view</span>
        <span className="tag">3 assets</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-hairline">
              {["Machine", "State", "Idle", "Energy", "Cost", "Load"].map((head) => (
                <th
                  className="px-5 py-3 text-[0.6875rem] font-medium tracking-[0.16em] text-bone-faint uppercase"
                  key={head}
                  scope="col"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {platformPage.machines.map((machine) => (
              <tr
                className="border-b border-hairline transition-colors last:border-b-0 hover:bg-panel/60"
                key={machine.machine}
              >
                <th className="px-5 py-4 font-normal" scope="row">
                  <span className="block text-sm font-medium tracking-tight text-bone">
                    {machine.machine}
                  </span>
                  <span className="tag">{machine.type}</span>
                </th>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 border px-2 py-1 text-[0.625rem] tracking-[0.14em] uppercase",
                      TONE_CLASS[machine.tone as keyof typeof TONE_CLASS]
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {machine.state}
                  </span>
                </td>
                <td className="readout px-5 py-4 text-sm text-bone-dim">{machine.idle}</td>
                <td className="readout px-5 py-4 text-sm text-bone">{machine.energy}</td>
                <td className="readout px-5 py-4 text-sm text-bone">{machine.cost}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-24 bg-hairline">
                      <div
                        className="h-full bg-signal"
                        style={{ width: `${machine.load}%` }}
                      />
                    </div>
                    <span className="readout text-xs text-bone-faint">{machine.load}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeatureList({ items }: Readonly<{ items: ReadonlyArray<string> }>) {
  return (
    <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
      {items.map((item) => (
        <li className="flex items-start gap-4 py-4" key={item}>
          <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 bg-signal" />
          <span className="text-[0.9375rem] leading-relaxed text-bone-dim">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function HealthArc() {
  const radius = 96;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="panel corner-marks flex flex-col items-center gap-6 p-8" data-reveal="scale">
      <span className="tag self-start">Motor health · Extrusion Line 02</span>
      <svg className="w-full max-w-[16rem]" viewBox="0 0 240 240">
        <circle
          cx="120"
          cy="120"
          fill="none"
          r={radius}
          stroke="var(--hairline)"
          strokeWidth="10"
        />
        <circle
          cx="120"
          cy="120"
          fill="none"
          r={radius}
          stroke="var(--flare)"
          strokeDasharray={`${circumference * 0.71} ${circumference}`}
          strokeLinecap="butt"
          strokeWidth="10"
          transform="rotate(-90 120 120)"
        />
        <text
          className="readout"
          fill="var(--flare)"
          fontSize="58"
          textAnchor="middle"
          x="120"
          y="132"
        >
          71
        </text>
        <text
          fill="var(--bone-faint)"
          fontSize="11"
          letterSpacing="3"
          textAnchor="middle"
          x="120"
          y="158"
        >
          HEALTH SCORE
        </text>
      </svg>
      <dl className="grid w-full grid-cols-2 gap-px bg-hairline">
        {[
          ["Sideband ×2", "+41%"],
          ["Confidence", "87%"],
          ["Threshold", "12 days"],
          ["Action", "Next shutdown"],
        ].map(([label, value]) => (
          <div className="flex flex-col gap-1 bg-abyss px-4 py-3" key={label}>
            <dt className="tag">{label}</dt>
            <dd className="readout text-sm text-bone">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PlatformPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      {/* ------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <CurrentField className="absolute inset-0 size-full" density={0.6} opacity={0.6} />
          <div className="grid-field absolute inset-0 opacity-40" />
          <div className="vignette absolute inset-0" />
        </div>

        <div className="shell relative grid gap-12 py-24 md:py-32 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-4" data-reveal="fade">
              <span className="tag-signal">Platform</span>
              <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
              <span className="tag">One operational view</span>
            </div>
            <h1 className="display-xl max-w-[15ch]" data-reveal="up">
              One operational view for every{" "}
              <span className="text-signal">machine.</span>
            </h1>
            <p className="lede max-w-xl" data-reveal="up" data-reveal-delay="0.08">
              {platformPage.hero.description}
            </p>
            <div className="flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.14">
              <button className="btn-signal" onClick={() => onNavigate("contact")} type="button">
                Request a demo
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
              <a className="btn-ghost" href="#architecture">
                {platformPage.hero.action}
              </a>
            </div>
          </div>

          <div data-reveal="scale">
            <MetricStrip />
          </div>
        </div>
      </section>

      <AnchorRail />

      {/* ---------------------------------------------------------- energyiq */}
      <Band id="energy-iq">
        <div className="shell">
          <SectionHead
            body="Clamp-on meters read the machine incomer every sixty seconds. We map each reading to your DEWA tariff, so idle running and power-factor penalties show up as money, not graphs."
            eyebrow="EnergyIQ"
            index="01"
            title={
              <>
                Energy, resolved to the <span className="text-signal">machine.</span>
              </>
            }
          />
          <div className="mt-14">
            <MachineTable />
          </div>
        </div>
      </Band>

      {/* ------------------------------------------------------- predictive */}
      <Band id="predictive-maintenance" tone="trench">
        <div className="shell grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHead
              body={platformPage.predictive.description}
              eyebrow="Predictive maintenance"
              index="02"
              title={platformPage.predictive.title}
            />
            <div data-reveal="up">
              <FeatureList items={platformPage.predictive.features} />
            </div>
          </div>
          <HealthArc />
        </div>
      </Band>

      {/* ---------------------------------------------------------- logbook */}
      <Band id="digital-logbook">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHead
              body={platformPage.logbook.description}
              eyebrow="Digital logbook"
              index="03"
              title={platformPage.logbook.title}
            />
            <div data-reveal="up">
              <FeatureList items={platformPage.logbook.features} />
            </div>
          </div>

          <ol className="flex flex-col" data-reveal="up">
            {platformPage.logbook.entries.map((entry, index) => (
              <li
                className="relative flex gap-5 border-l border-hairline pb-8 pl-7 last:pb-0"
                key={entry.title}
              >
                <span
                  className={cn(
                    "absolute top-1 -left-[13px] flex size-6 items-center justify-center border text-[0.5625rem] font-medium",
                    index === 0
                      ? "border-signal bg-signal text-abyss-deep"
                      : "border-hairline-strong bg-abyss text-bone-faint"
                  )}
                >
                  {entry.initials}
                </span>
                <div className="panel flex-1 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold tracking-tight text-bone">
                      {entry.title}
                    </h3>
                    <span className="readout text-[0.6875rem] text-bone-faint">{entry.date}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-bone-dim">{entry.body}</p>
                  <p className="tag mt-3">{entry.owner}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      {/* ----------------------------------------------------------- carbon */}
      <Band id="carbon-tracking" tone="trench">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHead
              body="Emissions derived from measured consumption, not estimated from floor area. Per machine, per hour, exportable for Scope 2 reporting and customer audits."
              eyebrow="Carbon &amp; sustainability"
              index="04"
              title={
                <>
                  Emissions you can <span className="text-signal">defend.</span>
                </>
              }
            />
            <div data-reveal="up">
              <FeatureList items={homePage.products[3].bullets} />
            </div>
          </div>

          <div className="panel corner-marks flex flex-col gap-5 p-7" data-reveal="scale">
            <div className="flex items-center justify-between">
              <span className="tag text-bone-dim">CO₂e by machine · this month</span>
              <span className="tag">kg</span>
            </div>
            {[
              ["Extrusion Line 02", 412, 1],
              ["Hydraulic Press", 298, 0.72],
              ["Cooling Pump Skid", 186, 0.45],
              ["Granulator 01", 121, 0.29],
              ["Compressor", 96, 0.23],
            ].map(([name, value, share]) => (
              <div className="flex flex-col gap-2" key={String(name)}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.8125rem] tracking-tight text-bone-dim">{name}</span>
                  <span className="readout text-sm text-bone">{value} kg</span>
                </div>
                <div className="h-2 bg-hairline">
                  <div
                    className="h-full bg-gradient-to-r from-signal-deep to-signal"
                    style={{ width: `${Number(share) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-2 flex items-end justify-between border-t border-hairline pt-4">
              <div className="flex flex-col gap-1">
                <span className="tag">Total this month</span>
                <span className="readout text-2xl text-signal">1,113 kg</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="tag">vs. baseline</span>
                <span className="readout text-2xl text-signal">−18.4%</span>
              </div>
            </div>
          </div>
        </div>
      </Band>

      {/* ----------------------------------------------------- architecture */}
      <Band id="architecture">
        <div className="shell">
          <SectionHead
            body="Our own sensing layer, our own uplink, our own cloud region. Nothing to install on your network and nothing to certify against your control system."
            eyebrow="Technical architecture"
            index="05"
            title={platformPage.architecture.title}
          />

          <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {platformPage.architecture.cards.map((card) => (
              <div
                className="group flex flex-col gap-4 bg-abyss p-7 transition-colors hover:bg-panel/70"
                data-reveal="up"
                key={card.title}
              >
                <KuroshioIcon
                  className="size-6 text-bone-faint transition-colors group-hover:text-signal"
                  name={card.icon}
                  strokeWidth={1.4}
                />
                <h3 className="text-lg leading-tight font-semibold tracking-tight text-bone">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-bone-dim">{card.body}</p>
              </div>
            ))}
          </div>

          <ol
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4 border border-hairline p-6"
            data-reveal="up"
          >
            {platformPage.architecture.pipeline.map((node, index) => (
              <li className="flex items-center gap-3" key={node.label}>
                <span className="flex items-center gap-2.5 border border-hairline-strong px-3.5 py-2.5 text-bone">
                  <KuroshioIcon className="size-4 text-signal" name={node.icon} strokeWidth={1.6} />
                  <span className="text-[0.8125rem] tracking-tight">{node.label}</span>
                </span>
                {index < platformPage.architecture.pipeline.length - 1 ? (
                  <span aria-hidden="true" className="h-px w-6 bg-signal/50 sm:w-10" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Band>

      {/* -------------------------------------------------------------- cta */}
      <section className="relative overflow-hidden border-t border-hairline bg-abyss-deep">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="grid-field-fine absolute inset-0 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_110%,rgba(18,160,140,0.2),transparent_70%)]" />
        </div>
        <div className="shell relative flex flex-col items-start gap-7 py-24 md:py-32">
          <h2 className="display-lg max-w-3xl" data-reveal="up">
            {platformPage.cta.title}
          </h2>
          <p className="lede max-w-2xl" data-reveal="up" data-reveal-delay="0.08">
            {platformPage.cta.description}
          </p>
          <div className="flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.14">
            <button className="btn-signal" onClick={() => onNavigate("contact")} type="button">
              {platformPage.cta.action}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <PageLink className="btn-ghost" page="industries">
              See your industry
            </PageLink>
          </div>
        </div>
      </section>
    </main>
  );
}
