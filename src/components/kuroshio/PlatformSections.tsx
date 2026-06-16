import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { platformPage } from "@/data/mockData";
import type { IconKey, PageId } from "@/data/mockData";
import { cn } from "@/lib/utils";

const glassPanel =
  "border border-white/[0.08] bg-[#162f58]/70 shadow-[0_28px_70px_rgba(0,0,0,0.28)] backdrop-blur-md";

const tintPanel = "border border-white/[0.08] bg-[#112648]/60";

const mutedText = "text-[#b4cdf0]/65";

const metricToneClasses = {
  primary: {
    border: "border-[#0e9e8e]/30",
    icon: "text-[#0e9e8e]",
    value: "text-[#eef4ff]",
    delta: "text-[#0e9e8e]",
  },
  secondary: {
    border: "border-[#0e9e8e]/24",
    icon: "text-[#82f6e3]",
    value: "text-[#eef4ff]",
    delta: "text-[#0e9e8e]",
  },
  neutral: {
    border: "border-white/[0.08]",
    icon: "text-[#b4cdf0]/55",
    value: "text-[#eef4ff]",
    delta: "text-[#e5b94b]",
  },
  critical: {
    border: "border-[#e05b5b]/30",
    icon: "text-[#e05b5b]",
    value: "text-[#e05b5b]",
    delta: "text-[#e05b5b]",
  },
} as const;

const statusToneClasses = {
  primary: "border-[#0e9e8e]/30 bg-[#0e9e8e]/15 text-[#82f6e3]",
  warning: "border-[#e5b94b]/30 bg-[#e5b94b]/12 text-[#e5b94b]",
  neutral: "border-white/[0.08] bg-white/[0.06] text-[#b4cdf0]/55",
  critical: "border-[#e05b5b]/30 bg-[#e05b5b]/12 text-[#ff9c9c]",
} as const;

const pipelineDetails: Readonly<Record<string, string>> = {
  Machine: "Energy meter on incomer",
  "Edge Device": "Local processing + buffering",
  Cellular: "Private SIM, isolated network",
  "Azure Cloud": "UAE North data residency",
  Dashboard: "Real-time web + mobile",
};

function FeatureCheck() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-[#0e9e8e]/30 bg-[#0e9e8e]/15">
      <KuroshioIcon className="size-3 text-[#82f6e3]" name="check" strokeWidth={2.5} />
    </span>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#0e9e8e]/30 bg-[#0e9e8e]/15 px-3 py-1 text-[0.68rem] font-bold uppercase text-[#82f6e3]">
      <span className="size-1.5 rounded-full bg-[#0e9e8e] shadow-[0_0_16px_rgba(14,158,142,0.85)]" />
      Live
    </span>
  );
}

function scrollToPlatformSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export interface PlatformHeroProps {
  readonly onNavigate: (page: PageId) => void;
}

export function PlatformHero({ onNavigate }: Readonly<PlatformHeroProps>) {
  const bars = [38, 64, 46, 76, 58, 88, 72, 44, 80, 68, 94, 56];

  return (
    <section className="mx-auto grid min-h-[calc(100vh-70px)] max-w-[1180px] grid-cols-1 items-center gap-12 px-gutter py-20 md:py-24 lg:grid-cols-[1fr_0.95fr]">
      <div>
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#0e9e8e]/30 bg-[#0e9e8e]/15 px-4 py-2 text-xs font-bold uppercase text-[#82f6e3]">
          <span className="size-1.5 rounded-full bg-[#0e9e8e]" />
          Platform Overview
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] text-[#eef4ff] md:text-5xl lg:text-6xl">
          One Operational View for <span className="text-[#0e9e8e]">Every Machine</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-[#b4cdf0]/70 md:text-lg">
          Integrate data from legacy PLCs, modern sensors, and enterprise systems into a single industrial
          intelligence platform built for factory-floor decisions.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            className="h-12 rounded-lg bg-[#0e9e8e] px-6 text-sm font-bold text-white shadow-[0_18px_45px_rgba(14,158,142,0.22)] hover:bg-[#0b8478]"
            onClick={() => onNavigate("contact")}
            type="button"
          >
            Request a Demo
          </Button>
          <Button
            className="h-12 rounded-lg border-white/15 bg-white/[0.03] px-6 text-sm font-bold text-[#eef4ff] hover:bg-white/[0.08]"
            onClick={() => scrollToPlatformSection("energy-iq")}
            type="button"
            variant="outline"
          >
            Explore Platform
            <KuroshioIcon className="size-4" name="arrowRight" />
          </Button>
        </div>
      </div>

      <div className={cn("relative overflow-hidden rounded-2xl p-5", glassPanel)}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(14,158,142,0.22),transparent_46%)]" />
        <div className="relative">
          <div className="mb-5 flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#e05b5b]" />
            <span className="size-2.5 rounded-full bg-[#e5b94b]" />
            <span className="size-2.5 rounded-full bg-[#0e9e8e]" />
            <span className="ml-auto text-xs font-semibold text-[#b4cdf0]/60">Factory Operations</span>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-[#b4cdf0]/40">Plant Status</div>
              <div className="mt-1 text-xl font-bold text-[#eef4ff]">North Line Dashboard</div>
            </div>
            <LiveBadge />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            {[
              ["Uptime", "98.2%", "+1.4%"],
              ["Machines", "42", "38 active"],
              ["Energy", "12.4MWh", "today"],
              ["Alerts", "3", "review"],
            ].map(([label, value, helper]) => (
              <div className={cn("rounded-lg p-4", tintPanel)} key={label}>
                <div className="text-[0.65rem] font-bold uppercase text-[#b4cdf0]/40">{label}</div>
                <div className="mt-2 text-2xl font-bold text-[#eef4ff]">{value}</div>
                <div className="mt-1 text-xs text-[#0e9e8e]">{helper}</div>
              </div>
            ))}
          </div>

          <div className={cn("rounded-lg p-4", tintPanel)}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[0.68rem] font-bold uppercase text-[#b4cdf0]/40">Energy Load</span>
              <span className="text-xs font-semibold text-[#82f6e3]">Last 12 hours</span>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {bars.map((height, index) => (
                <div
                  className={cn(
                    "w-full rounded-t bg-[#0e9e8e]/32 transition-colors hover:bg-[#0e9e8e]",
                    index > 8 && "bg-[#0e9e8e]"
                  )}
                  key={`${height}-${String(index)}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export interface AnchorNavProps {
  readonly items: typeof platformPage.anchorNav;
}

export function AnchorNav({ items }: Readonly<AnchorNavProps>) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const updateActiveSection = () => {
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top < 190) {
          current = item.id;
        }
      }

      setActive(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [items]);

  return (
    <nav
      aria-label="Platform sections"
      className="sticky top-[132px] z-40 overflow-x-auto border-y border-white/[0.08] bg-[#112648]/88 shadow-[0_14px_34px_rgba(4,16,35,0.22)] backdrop-blur-xl md:top-[70px]"
    >
      <div className="mx-auto flex max-w-[1180px] gap-1 px-gutter">
        {items.map((item) => {
          const isActive = active === item.id;

          return (
            <button
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "flex h-16 shrink-0 items-center gap-2 border-b-2 border-transparent px-4 text-sm font-semibold text-[#b4cdf0]/65 transition-colors hover:text-[#eef4ff]",
                isActive && "border-[#0e9e8e] text-[#82f6e3]"
              )}
              key={item.id}
              onClick={() => {
                setActive(item.id);
                scrollToPlatformSection(item.id);
              }}
              type="button"
            >
              <KuroshioIcon className="size-4" name={item.icon as IconKey} strokeWidth={1.9} />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export interface MetricCardProps {
  readonly metric: (typeof platformPage.metrics)[number];
}

export function MetricCard({ metric }: Readonly<MetricCardProps>) {
  const tone = metricToneClasses[metric.tone];

  return (
    <div className={cn("rounded-xl p-5 transition-colors hover:border-[#0e9e8e]/38", glassPanel, tone.border)}>
      <div className="flex items-start justify-between gap-4">
        <span className="text-[0.68rem] font-bold uppercase text-[#b4cdf0]/45">{metric.label}</span>
        <KuroshioIcon className={cn("size-4", tone.icon)} name={metric.icon as IconKey} />
      </div>
      <div className={cn("mt-5 text-3xl font-bold leading-none", tone.value)}>
        {metric.value}
        <span className="ml-2 text-sm font-medium text-[#b4cdf0]/55">{metric.unit}</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs font-semibold">
        <span className="uppercase text-[#b4cdf0]/42">{metric.helper}</span>
        {metric.delta && <span className={tone.delta}>{metric.delta}</span>}
      </div>
    </div>
  );
}

export interface MachineTableProps {
  readonly rows: typeof platformPage.machines;
}

export function MachineTable({ rows }: Readonly<MachineTableProps>) {
  return (
    <div className={cn("overflow-hidden rounded-xl", glassPanel)}>
      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center">
        <div>
          <h3 className="text-xl font-bold text-[#eef4ff]">Machine Energy Profiles</h3>
          <p className={cn("mt-1 text-sm", mutedText)}>Live machine state, idle exposure, and cost impact.</p>
        </div>
        <Button
          className="h-10 w-fit rounded-md border-white/12 bg-white/[0.03] px-4 text-xs font-bold uppercase text-[#82f6e3] hover:bg-white/[0.08]"
          type="button"
          variant="outline"
        >
          <KuroshioIcon className="size-4" name="download" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.08] bg-[#112648]/72 text-[0.68rem] uppercase text-[#b4cdf0]/42">
              <th className="px-5 py-4 font-bold">Machine</th>
              <th className="px-5 py-4 font-bold">State</th>
              <th className="px-5 py-4 text-right font-bold">Idle Time</th>
              <th className="px-5 py-4 text-right font-bold">Energy Today</th>
              <th className="px-5 py-4 text-right font-bold">Cost</th>
              <th className="px-5 py-4 font-bold">24h Timeline</th>
              <th className="px-5 py-4 text-right font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.08] text-sm">
            {rows.map((row) => {
              const statusTone = statusToneClasses[row.tone];

              return (
                <tr className="transition-colors hover:bg-[#0e9e8e]/[0.06]" key={row.machine}>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-[#eef4ff]">{row.machine}</div>
                    <div className="mt-1 text-xs text-[#b4cdf0]/45">{row.type}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase", statusTone)}>
                      {row.state}
                    </span>
                  </td>
                  <td className={cn("px-5 py-4 text-right", mutedText)}>{row.idle}</td>
                  <td className={cn("px-5 py-4 text-right", mutedText)}>{row.energy}</td>
                  <td className={cn("px-5 py-4 text-right", mutedText)}>{row.cost}</td>
                  <td className="px-5 py-4">
                    <div className="flex h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="bg-[#0e9e8e]" style={{ width: `${row.load}%` }} />
                      {row.accent > 0 && <div className="bg-[#e5b94b]" style={{ width: `${row.accent}%` }} />}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button className="h-8 px-0 text-xs font-bold uppercase text-[#82f6e3]" type="button" variant="link">
                      Details
                      <KuroshioIcon className="size-4" name="arrowRight" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeatureList({ items }: Readonly<{ items: ReadonlyArray<string> }>) {
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {items.map((feature) => (
        <li className="flex items-start gap-3 text-sm leading-6 text-[#b4cdf0]/72" key={feature}>
          <FeatureCheck />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function HealthPanel() {
  return (
    <div className={cn("w-full overflow-hidden rounded-2xl", glassPanel)}>
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
        <div className="text-sm font-bold text-[#eef4ff]">Machine Health Monitor</div>
        <LiveBadge />
      </div>
      <div className="p-5">
        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative size-28 shrink-0">
            <svg className="size-full -rotate-90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" fill="none" r="38" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle
                cx="45"
                cy="45"
                fill="none"
                r="38"
                stroke="#0E9E8E"
                strokeDasharray="239"
                strokeDashoffset="48"
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold leading-none text-[#eef4ff]">85</span>
              <span className="mt-1 text-[0.6rem] font-bold uppercase text-[#82f6e3]">Score</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-[#b4cdf0]/45">CNC Lathe 01 / Bearing Unit</div>
            <div className="mt-2 text-xl font-bold text-[#eef4ff]">Good condition</div>
            <div className="mt-2 text-sm font-semibold text-[#82f6e3]">Vibration trend +2.4%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["Phase imbalance", "Normal range", "text-[#eef4ff]"],
            ["Temperature", "62 C / 143 F", "text-[#eef4ff]"],
            ["AI alert", "No anomalies", "text-[#82f6e3]"],
            ["Next service", "In 18 days", "text-[#eef4ff]"],
          ].map(([label, value, color]) => (
            <div className={cn("rounded-lg p-4", tintPanel)} key={label}>
              <div className="text-[0.65rem] font-bold uppercase text-[#b4cdf0]/40">{label}</div>
              <div className={cn("mt-2 text-sm font-semibold", color)}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogbookPanel() {
  return (
    <div className={cn("w-full overflow-hidden rounded-2xl", glassPanel)}>
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
        <div className="text-sm font-bold text-[#eef4ff]">Maintenance Log</div>
        <div className="flex items-center gap-2 text-xs text-[#b4cdf0]/60">
          <KuroshioIcon className="size-4" name="book" />
          {platformPage.logbook.entries.length} entries
        </div>
      </div>
      <div className="p-5">
        {platformPage.logbook.entries.map((entry) => (
          <div className="flex gap-4 border-b border-white/[0.08] py-4 last:border-b-0 last:pb-0 first:pt-0" key={entry.title}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#0e9e8e]/30 bg-[#0e9e8e]/15 text-xs font-bold text-[#82f6e3]">
              {entry.initials}
            </div>
            <div>
              <div className="font-bold text-[#eef4ff]">{entry.title}</div>
              <div className="mt-1 text-xs font-semibold text-[#82f6e3]">{entry.date}</div>
              <p className="mt-2 text-sm leading-6 text-[#b4cdf0]/65">{entry.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface ProductFeatureSectionProps {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly features: ReadonlyArray<string>;
  readonly visual: "health" | "logbook";
}

export function ProductFeatureSection({
  id,
  title,
  description,
  features,
  visual,
}: Readonly<ProductFeatureSectionProps>) {
  const isLogbook = visual === "logbook";
  const sectionTitle = isLogbook ? "Digital Logbook" : "Predictive Maintenance";

  const copy = (
    <div>
      <h2 className="text-3xl font-bold text-[#eef4ff] md:text-4xl">{sectionTitle}</h2>
      <h3 className="mt-4 max-w-xl text-2xl font-bold leading-tight text-[#eef4ff] md:text-3xl">
        {title.includes("weeks") ? (
          <>
            Catch failures <span className="text-[#0e9e8e]">weeks</span> before they happen
          </>
        ) : (
          <>
            Replace paper logs <span className="text-[#0e9e8e]">forever</span>
          </>
        )}
      </h3>
      <p className="mt-5 max-w-xl text-base leading-8 text-[#b4cdf0]/70">{description}</p>
      <FeatureList items={features} />
    </div>
  );

  const panel = isLogbook ? <LogbookPanel /> : <HealthPanel />;

  return (
    <section className={cn("scroll-mt-36 py-20 md:scroll-mt-14 md:py-28", !isLogbook && "bg-[#1b3a6b]/18")} id={id}>
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-gutter lg:grid-cols-2 lg:gap-20">
        {isLogbook ? (
          <>
            {copy}
            {panel}
          </>
        ) : (
          <>
            {panel}
            {copy}
          </>
        )}
      </div>
    </section>
  );
}

export interface ArchitectureSectionProps {
  readonly onNavigate: (page: PageId) => void;
}

export function ArchitectureSection({ onNavigate }: Readonly<ArchitectureSectionProps>) {
  return (
    <section className="scroll-mt-36 bg-[#1b3a6b]/18 py-20 md:scroll-mt-14 md:py-28" id="architecture">
      <div className="mx-auto max-w-[1180px] px-gutter">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#eef4ff] md:text-4xl">Technical Architecture</h2>
          <h3 className="mt-4 text-2xl font-bold leading-tight text-[#eef4ff] md:text-3xl">
            Works on any machine. <span className="text-[#0e9e8e]">No PLC access required.</span>
          </h3>
          <p className="mt-5 text-base leading-8 text-[#b4cdf0]/70">
            Energy meters on machine incomer, private cellular uplink, and cloud processing designed for industrial
            data residency.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_0.86fr]">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.08] md:grid-cols-2">
            {platformPage.architecture.cards.map((card) => (
              <div className="border-b border-white/[0.08] bg-[#162f58]/50 p-6 transition-colors hover:bg-[#0e9e8e]/[0.07] md:border-r md:even:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0" key={card.title}>
                <div className="mb-5 flex size-11 items-center justify-center rounded-lg border border-[#0e9e8e]/30 bg-[#0e9e8e]/15 text-[#82f6e3]">
                  <KuroshioIcon className="size-5" name={card.icon as IconKey} strokeWidth={1.9} />
                </div>
                <h3 className="text-lg font-bold text-[#eef4ff]">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#b4cdf0]/65">{card.body}</p>
              </div>
            ))}
          </div>

          <div className={cn("rounded-2xl p-6", glassPanel)}>
            <div className="mb-6 text-xs font-bold uppercase text-[#82f6e3]">Data Pipeline</div>
            <div className="flex flex-col">
              {platformPage.architecture.pipeline.map((item, index) => {
                const isLast = index === platformPage.architecture.pipeline.length - 1;

                return (
                  <div className="contents" key={item.label}>
                    <div
                      className={cn(
                        "flex items-center gap-4 rounded-xl border border-white/[0.08] bg-[#112648]/60 p-4",
                        isLast && "border-[#0e9e8e]/35 bg-[#0e9e8e]/[0.08]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#0e9e8e]/30 bg-[#0e9e8e]/15 text-[#82f6e3]",
                          isLast && "border-[#0e9e8e] bg-[#0e9e8e] text-white"
                        )}
                      >
                        <KuroshioIcon className="size-5" name={item.icon as IconKey} strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className={cn("font-bold text-[#eef4ff]", isLast && "text-[#82f6e3]")}>{item.label}</div>
                        <div className="mt-1 text-sm text-[#b4cdf0]/60">{pipelineDetails[item.label]}</div>
                      </div>
                    </div>
                    {!isLast && <div className="ml-5 h-5 w-px bg-[#0e9e8e]/28" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-2xl border border-[#0e9e8e]/30 bg-[linear-gradient(135deg,rgba(14,158,142,0.18),rgba(27,58,107,0.55)_58%,rgba(17,38,72,0.88))] p-8 text-center md:p-14">
          <h2 className="text-3xl font-bold leading-tight text-[#eef4ff] md:text-4xl">{platformPage.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b4cdf0]/70">{platformPage.cta.description}</p>
          <Button
            className="mt-8 h-12 rounded-lg bg-[#0e9e8e] px-7 text-sm font-bold text-white shadow-[0_18px_45px_rgba(14,158,142,0.22)] hover:bg-[#0b8478]"
            onClick={() => onNavigate("contact")}
            type="button"
          >
            {platformPage.cta.action}
          </Button>
        </div>
      </div>
    </section>
  );
}
