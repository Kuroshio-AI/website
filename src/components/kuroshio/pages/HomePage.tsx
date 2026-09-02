import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Suspense, lazy, useRef, useState } from "react";

import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { PageLink } from "@/components/kuroshio/PageLink";
import { Band, SectionHead } from "@/components/kuroshio/Sections";
import { HeroSection } from "@/components/kuroshio/home/HeroSection";
import { PipelineSection } from "@/components/kuroshio/home/PipelineSection";
import { homePage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";
import { ScrollTrigger, countUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Remotion + the composition are ~40% of the bundle; keep them out of the
// critical path and stream them in behind a reserved, correctly-sized frame.
const PlatformDemo = lazy(() =>
  import("@/components/kuroshio/PlatformDemo").then((module) => ({
    default: module.PlatformDemo,
  }))
);

function DemoSkeleton() {
  return (
    <div aria-hidden="true" className="panel corner-marks overflow-hidden">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <span className="tag text-ink-faint">Loading walkthrough</span>
        <span className="readout text-xs text-ink-faint">00:00 / 00:35</span>
      </div>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-deep">
        <div className="grid-field absolute inset-0 opacity-50" />
        <div className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-brand/10 to-transparent" />
      </div>
      <div className="h-16 border-t border-hairline" />
    </div>
  );
}

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

const CAPABILITY_META = [
  { anchor: "energy-iq", metric: "60s", metricLabel: "sample interval" },
  { anchor: "predictive-maintenance", metric: "12d", metricLabel: "typical lead time" },
  { anchor: "digital-logbook", metric: "0", metricLabel: "paper logbooks" },
  { anchor: "carbon-tracking", metric: "Scope 2", metricLabel: "audit ready" },
];

function ProblemList() {
  return (
    <ol className="mt-14 flex flex-col border-t border-hairline">
      {homePage.problems.map((problem, index) => (
        <li
          className="group relative grid gap-4 border-b border-hairline py-8 md:grid-cols-[8rem_minmax(0,22rem)_minmax(0,1fr)] md:items-start md:gap-10 md:py-10"
          data-reveal="up"
          key={problem.title}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-700 ease-out group-hover:scale-x-100"
          />
          <div className="flex items-center gap-4">
            <span className="readout text-2xl leading-none text-ink-faint transition-colors duration-300 group-hover:text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <KuroshioIcon
              className="size-5 text-ink-faint transition-colors duration-300 group-hover:text-brand"
              name={problem.icon}
              strokeWidth={1.5}
            />
          </div>
          <h3 className="display-md text-ink">{problem.title}</h3>
          <p className="text-[0.9375rem] leading-relaxed text-ink-dim">{problem.body}</p>
        </li>
      ))}
    </ol>
  );
}

function Capabilities() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  usePageMotion(listRef, (scope: HTMLElement) => {
    scope.querySelectorAll<HTMLElement>("[data-capability]").forEach((node, index) => {
      ScrollTrigger.create({
        trigger: node,
        start: "top 60%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) setActive(index);
        },
      });
    });
  });

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20" ref={listRef}>
      <nav aria-label="Capabilities" className="hidden lg:block">
        <ol className="sticky top-32 flex flex-col gap-1">
          {homePage.products.map((product, index) => (
            <li key={product.tag}>
              <a
                aria-current={active === index ? "true" : undefined}
                className={cn(
                  "flex items-center gap-3 border-l py-3 pl-4 text-sm tracking-tight transition-colors",
                  active === index
                    ? "border-brand text-ink"
                    : "border-hairline text-ink-faint hover:text-ink-dim"
                )}
                href={`#${CAPABILITY_META[index].anchor}`}
              >
                <span className="readout text-[0.6875rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {product.tag}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex flex-col gap-6">
        {homePage.products.map((product, index) => (
          <article
            className="panel corner-marks group grid gap-8 p-6 transition-colors duration-500 hover:border-hairline-strong md:grid-cols-[minmax(0,1fr)_15rem] md:p-9"
            data-capability
            data-reveal="up"
            id={CAPABILITY_META[index].anchor}
            key={product.tag}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center border border-brand/40 bg-brand/8 text-brand">
                  <KuroshioIcon className="size-4" name={product.icon} strokeWidth={1.75} />
                </span>
                <span className="tag-brand">{product.tag}</span>
              </div>

              <h3 className="display-md max-w-md text-ink">{product.title}</h3>

              <ul className="flex flex-col gap-3">
                {product.bullets.map((bullet) => (
                  <li className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-dim" key={bullet}>
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] size-1 shrink-0 bg-brand"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6 border-hairline md:border-l md:pl-8">
              <div className="flex flex-col gap-1.5">
                <span className="readout text-4xl leading-none text-brand">
                  {CAPABILITY_META[index].metric}
                </span>
                <span className="tag">{CAPABILITY_META[index].metricLabel}</span>
              </div>
              <PageLink
                className="flex w-fit items-center gap-2 text-sm font-medium tracking-tight text-ink-dim transition-colors hover:text-brand"
                page="platform"
              >
                Technical detail
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </PageLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Numbers() {
  const ref = useRef<HTMLDivElement>(null);

  usePageMotion(ref, (scope: HTMLElement) => {
    scope.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
      countUp(node, Number(node.dataset.count));
    });
  });

  return (
    <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4" ref={ref}>
      {homePage.numbers.map((item) => (
        <div
          className="group flex flex-col gap-3 bg-panel px-6 py-8 transition-colors hover:bg-brand-soft"
          key={item.title}
        >
          <KuroshioIcon
            className="size-5 text-ink-faint transition-colors group-hover:text-brand"
            name={item.icon}
            strokeWidth={1.5}
          />
          <div className="flex items-baseline gap-2">
            <span className="readout text-5xl leading-none text-brand" data-count={item.value}>
              0
            </span>
            <span className="display-md text-ink">{item.title}</span>
          </div>
          <p className="text-sm leading-relaxed text-ink-dim">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function HomePage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <HeroSection />

      {/* -------------------------------------------------- the walkthrough */}
      <Band id="walkthrough" tone="canvas-sunk">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              className="max-w-2xl"
              eyebrow="Product walkthrough"
              index="01"
              title={
                <>
                  Thirty-five seconds <span className="text-brand">inside</span> the
                  platform.
                </>
              }
            />
            <p className="lede max-w-md lg:text-right" data-reveal="up">
              From a blind plant floor to a searchable maintenance record. Jump
              to any chapter — it plays live in your browser.
            </p>
          </div>

          <div className="mt-12" data-reveal="scale">
            <Suspense fallback={<DemoSkeleton />}>
              <PlatformDemo />
            </Suspense>
          </div>
        </div>
      </Band>

      {/* ------------------------------------------------------ the problem */}
      <Band>
        <div className="shell">
          <SectionHead
            body="Every plant we walk into has the same four blind spots. None of them are exotic. All of them are expensive."
            eyebrow="What it costs you"
            index="02"
            title={
              <>
                Four things your plant
                <br />
                cannot currently see.
              </>
            }
          />
          <ProblemList />
        </div>
      </Band>

      {/* --------------------------------------------------- what you get */}
      <Band tone="canvas-sunk">
        <div className="shell">
          <SectionHead
            body="One platform, four working surfaces. Each one runs on the same measured signal, so energy, health, and history never disagree."
            eyebrow="Capabilities"
            index="03"
            title={
              <>
                Measured signal in.
                <br />
                <span className="text-brand">Decisions</span> out.
              </>
            }
          />
          <Capabilities />
        </div>
      </Band>

      <PipelineSection />

      {/* -------------------------------------------------------- industries */}
      <Band>
        <div className="shell">
          <SectionHead
            body="Heavy, hot, and hard on equipment. These are the lines we already read."
            eyebrow="Where it runs"
            index="04"
            title="Built around the machines you already own."
          />

          <div className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {homePage.industries.map((industry) => (
              <article
                className="group relative flex flex-col gap-4 bg-panel p-7 transition-colors duration-300 hover:bg-brand-soft"
                data-reveal="up"
                key={industry.title}
              >
                <KuroshioIcon
                  className="size-6 text-ink-faint transition-colors duration-300 group-hover:text-brand"
                  name={industry.icon}
                  strokeWidth={1.4}
                />
                <h3 className="text-xl leading-tight font-semibold tracking-tight text-ink">
                  {industry.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-dim">{industry.body}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </article>
            ))}
          </div>

          <Numbers />
        </div>
      </Band>

      {/* --------------------------------------------------------------- cta */}
      <section className="relative overflow-hidden border-t border-hairline bg-canvas-deep">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="grid-field-fine absolute inset-0 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_110%,rgba(9,76,178,0.10),transparent_70%)]" />
        </div>

        <div className="shell relative flex flex-col items-start gap-8 py-24 md:py-32">
          <span className="tag-brand" data-reveal="fade">
            {homePage.cta.badge}
          </span>
          <h2 className="display-lg max-w-3xl" data-reveal="up">
            {homePage.cta.title}
          </h2>
          <p className="lede max-w-2xl" data-reveal="up" data-reveal-delay="0.08">
            {homePage.cta.body}
          </p>
          <div className="flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.14">
            <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
              {homePage.cta.action}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <PageLink className="btn-ghost" page="platform">
              Read the architecture
            </PageLink>
          </div>
        </div>
      </section>
    </main>
  );
}
