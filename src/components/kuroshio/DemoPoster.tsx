import { TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CHAPTERS, VIDEO } from "@/remotion/theme";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const RUNTIME_SECONDS = Math.round(VIDEO.durationInFrames / VIDEO.fps);

const ROWS = [
  { name: "Extrusion Line 02", unit: "Unit 4 · Extruder", kw: 61.4, share: 0.88, state: "Running" },
  { name: "Cooling Pump Skid", unit: "Unit 6 · Centrifugal", kw: 12.8, share: 0.21, state: "Idle" },
  { name: "Hydraulic Press", unit: "Unit 5 · Press", kw: 44.2, share: 0.63, state: "Running" },
  { name: "Granulator 01", unit: "Unit 7 · Granulator", kw: 18.2, share: 0.3, state: "Running" },
];

const SPARK = [0.18, 0.42, 0.61, 0.58, 0.72, 0.66, 0.79, 0.74, 0.83, 0.69, 0.77, 0.88];

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Drives the boot animation: one rAF for the whole poster.
 * `fill` runs 0→1 once (readouts settle and hold); `sweep` loops so the panel
 * never looks frozen no matter how long the chunk takes.
 */
function useBootProgress() {
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? { fill: 1, sweep: 0 } : { fill: 0, sweep: 0 }));
  const rafRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const started = performance.now();
    const tick = (now: number) => {
      const elapsed = now - started;
      setProgress({
        fill: easeOut(Math.min(1, elapsed / 1400)),
        sweep: (elapsed % 2600) / 2600,
      });
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, []);

  return progress;
}

function BootPanel() {
  const { fill, sweep } = useBootProgress();
  const activeChapter = Math.floor(sweep * CHAPTERS.length) % CHAPTERS.length;
  const drawn = Math.max(2, Math.round(SPARK.length * fill));

  const points = SPARK.slice(0, drawn)
    .map((v, i) => `${(i / (SPARK.length - 1)) * 260} ${64 - v * 54}`)
    .join(" L");

  return (
    <div className="relative flex size-full flex-col gap-5 p-6 md:gap-6 md:p-9">
      {/* scan line — the only continuously moving element */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-40 bg-[linear-gradient(90deg,transparent,rgba(9,76,178,0.10),transparent)]"
        style={{ left: `${sweep * 118 - 14}%` }}
      />

      <div className="relative flex shrink-0 items-start justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="tag-brand">Acquiring signal</span>
          <span className="text-sm text-ink-dim">Bringing the walkthrough online</span>
        </div>
        <div className="hidden items-end gap-2 sm:flex">
          <span className="readout text-3xl leading-none text-brand">
            {Math.round(fill * 96)}
          </span>
          <span className="tag mb-1">health</span>
        </div>
      </div>

      <div className="relative grid min-h-0 flex-1 gap-px bg-hairline md:grid-cols-[1.35fr_1fr]">
        <div className="flex flex-col justify-around gap-3 bg-panel p-5">
          {ROWS.map((row, index) => {
            const local = Math.max(0, Math.min(1, fill * 1.25 - index * 0.12));
            return (
              <div className="flex flex-col gap-2" key={row.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[0.8125rem] font-medium tracking-tight text-ink">
                    {row.name}
                  </span>
                  <span
                    className={cn(
                      "readout text-sm",
                      row.state === "Idle" ? "text-flare" : "text-brand"
                    )}
                  >
                    {(row.kw * local).toFixed(1)} kW
                  </span>
                </div>
                <div className="h-1.5 bg-canvas-sunk">
                  <div
                    className={cn("h-full", row.state === "Idle" ? "bg-flare" : "bg-brand")}
                    style={{ width: `${row.share * local * 100}%`, opacity: 0.75 }}
                  />
                </div>
                <span className="tag text-[0.625rem]">{row.unit}</span>
              </div>
            );
          })}
        </div>

        <div className="flex min-h-0 flex-col justify-between gap-4 bg-panel p-5">
          <span className="tag">Load profile · today</span>
          <svg aria-hidden="true" className="min-h-0 w-full flex-1" preserveAspectRatio="none" viewBox="0 0 260 72">
            <path
              d={`M${points}`}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path d="M0 70 H260" stroke="var(--hairline)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="flex items-baseline justify-between">
            <span className="tag text-[0.625rem]">00:00</span>
            <span className="tag text-[0.625rem]">now</span>
          </div>
        </div>
      </div>

      <ol className="relative flex shrink-0 flex-wrap gap-x-5 gap-y-2">
        {CHAPTERS.map((chapter, index) => (
          <li className="flex items-baseline gap-2" key={chapter.id}>
            <span
              className={cn(
                "readout text-[0.6875rem] transition-colors duration-300",
                index === activeChapter ? "text-brand" : "text-ink-faint"
              )}
            >
              {chapter.index}
            </span>
            <span
              className={cn(
                "text-[0.8125rem] tracking-tight transition-colors duration-300",
                index === activeChapter ? "text-ink" : "text-ink-faint"
              )}
            >
              {chapter.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FailedPanel() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full border border-flare/40 bg-flare-soft text-flare">
        <TriangleAlert aria-hidden="true" className="size-5" />
      </span>
      <p className="display-md max-w-[26ch] text-balance text-ink">
        The walkthrough didn&apos;t load.
      </p>
      <p className="max-w-md text-sm leading-relaxed text-ink-dim">
        Reload the page to try again, or ask us to walk you through it live — it
        covers the same six steps.
      </p>
      <ol className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {CHAPTERS.map((chapter) => (
          <li className="flex items-baseline gap-2" key={chapter.id}>
            <span className="readout text-[0.6875rem] text-ink-faint">{chapter.index}</span>
            <span className="text-[0.8125rem] tracking-tight text-ink-dim">{chapter.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Stands in for the walkthrough while its chunk loads, and permanently if that
 * chunk fails.
 *
 * The player reserves ~690px of 16:9. An empty shimmer in that space reads as a
 * broken image, so the loading state instead shows the platform coming online —
 * readouts settling, a load profile drawing in, chapters cycling. Figures are
 * the same illustrative ones the walkthrough itself uses.
 */
export function DemoPoster({ failed = false }: Readonly<{ failed?: boolean }>) {
  return (
    <div className="panel corner-marks overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "size-2 rounded-full",
              failed ? "bg-flare" : "bg-brand animate-pulse-dot"
            )}
          />
          <span className="tag text-ink-dim">
            {failed ? "Walkthrough unavailable" : "Loading walkthrough"}
          </span>
        </div>
        <span className="readout text-xs text-ink-faint">
          00:00 / 00:{String(RUNTIME_SECONDS).padStart(2, "0")}
        </span>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-sunk">
        <div aria-hidden="true" className="grid-field absolute inset-0 opacity-50" />
        {failed ? <FailedPanel /> : <BootPanel />}
      </div>

      <div className="flex items-center justify-between border-t border-hairline px-4 py-4">
        <span className="tag">{failed ? "Six chapters" : "Illustrative data"}</span>
        <span className="tag">{CHAPTERS.length} chapters · {RUNTIME_SECONDS}s</span>
      </div>
    </div>
  );
}
