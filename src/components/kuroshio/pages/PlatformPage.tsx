import { ArrowRight } from "lucide-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { ChunkBoundary } from "@/components/kuroshio/ChunkBoundary";
import { DemoPoster } from "@/components/kuroshio/DemoPoster";
import { PlatformLoop } from "@/components/kuroshio/demos/loops";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { ArchitectureSection } from "@/components/kuroshio/platform/ArchitectureSection";
import { CarbonSection } from "@/components/kuroshio/platform/CarbonSection";
import { EnergySection } from "@/components/kuroshio/platform/EnergySection";
import { LogbookSection } from "@/components/kuroshio/platform/LogbookSection";
import { UsedBy } from "@/components/kuroshio/pages/KTrackPage";
import { PilotClose } from "@/components/kuroshio/platform/PilotClose";
import { PredictSection } from "@/components/kuroshio/platform/PredictSection";
import { platformPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";
import { ScrollTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Remotion + the composition are ~40% of the bundle; keep them out of the
// critical path and stream them in behind a reserved, correctly-sized frame.
const PlatformDemo = lazy(() =>
  import("@/components/kuroshio/PlatformDemo").then((module) => ({
    default: module.PlatformDemo,
  }))
);

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

function AnchorRail() {
  const [active, setActive] = useState(platformPage.anchorNav[0].id);
  const railRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // On narrow screens the rail scrolls sideways; keep the active chip in view.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const offset = link.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    nav.scrollTo({ left: nav.scrollLeft + offset - (nav.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

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
      className="sticky top-[68px] z-30 bg-canvas"
      ref={railRef}
    >
      <nav aria-label="Platform sections" ref={navRef} className="shell mask-fade-x flex gap-1 overflow-x-auto py-2">
        {platformPage.anchorNav.map((item) => (
          <a
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2 border px-3.5 py-2 text-[0.8125rem] tracking-tight whitespace-nowrap transition-colors",
              active === item.id
                ? "border-brand/50 bg-brand/8 text-brand"
                : "border-transparent text-ink-faint hover:text-ink"
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

// Rates from the demo line: 1h 42m idle a day costs AED 16.50; a month is 26 working days.
const IDLE_AED_PER_MACHINE_MONTH = 16.5 * 26;

function IdleEstimate() {
  const [machines, setMachines] = useState(20);
  const monthly = Math.round(machines * IDLE_AED_PER_MACHINE_MONTH);

  return (
    // Shares the player's width rule (.demo-player) so both edges line up with the film above.
    <div
      className="demo-player mt-16 grid gap-8 bg-canvas p-6 max-lg:mx-auto sm:p-10 lg:mx-auto lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16"
      data-reveal="up"
      style={{ "--demo-ratio": 1600 / 852 } as CSSProperties}
    >
      <div className="flex flex-col gap-5">
        <label className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-bold tracking-[-0.02em] text-ink" htmlFor="idle-machines">
          How many machines run on your floor?
        </label>
        <div className="flex items-center gap-5">
          <input
            aria-describedby="idle-note"
            className="h-11 w-full max-w-xl cursor-pointer accent-brand"
            id="idle-machines"
            max={200}
            min={1}
            onChange={(event) => setMachines(Number(event.target.value))}
            type="range"
            value={machines}
          />
          <span className="min-w-[3ch] text-2xl font-semibold text-ink tabular-nums">{machines}</span>
        </div>
        <p className="text-sm text-ink-dim" id="idle-note">
          At the demo line&apos;s rate: 1h 42m idle a day, AED 16.50, over 26 working days. A pilot measures your real figure.
        </p>
      </div>
      <p aria-live="polite" className="flex flex-col gap-1 lg:items-end">
        <span className="text-base text-ink-dim">About this much a month in idle running</span>
        <span className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-bold tracking-[-0.03em] text-flare tabular-nums">
          AED {monthly.toLocaleString("en-US")}
        </span>
      </p>
    </div>
  );
}

export function PlatformPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      {/* ------------------------------------------------------------- hero */}
      <section className="border-b border-hairline">
        <div className="shell grid gap-12 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <h1
              className="max-w-[14ch] font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.035em] text-ink"
              data-reveal="up"
            >
              One operational view for every machine.
            </h1>
            <p className="lede max-w-xl" data-reveal="up" data-reveal-delay="0.08">
              {platformPage.hero.description}
            </p>
            <UsedBy client="tkm" />
            <div className="mt-2 flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.14">
              <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
                Request a demo
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
              <a className="btn-ghost" href="#architecture">
                {platformPage.hero.action}
              </a>
            </div>
          </div>

          <div data-reveal="scale">
            <PlatformLoop />
          </div>
        </div>
      </section>

      <AnchorRail />

      <section className="band bg-canvas-sunk">
        <div className="shell" id="walkthrough">
          <div className="max-lg:mx-auto max-lg:max-w-[640px]" data-ui>
            <ChunkBoundary fallback={<DemoPoster failed />}>
              <Suspense fallback={<DemoPoster />}>
                <PlatformDemo
                  heading={
                    <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none font-bold tracking-[-0.03em] text-ink" data-reveal="up">
                      See the hours your machines run for nothing.
                    </h2>
                  }
                />
              </Suspense>
            </ChunkBoundary>
          </div>
          <IdleEstimate />
        </div>
      </section>

      <EnergySection />
      <PredictSection />
      <LogbookSection />
      <CarbonSection />
      <ArchitectureSection />
      <PilotClose onNavigate={onNavigate} />
    </main>
  );
}
