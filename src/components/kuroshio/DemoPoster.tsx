import { Play, TriangleAlert } from "lucide-react";

import { CHAPTERS, VIDEO } from "@/remotion/theme";
import { cn } from "@/lib/utils";

const RUNTIME_SECONDS = Math.round(VIDEO.durationInFrames / VIDEO.fps);

/**
 * Stands in for the walkthrough while its chunk loads, and permanently if that
 * chunk fails.
 *
 * The player reserves ~690px of 16:9. Filling that with a blank shimmer reads
 * as a broken image, so the poster carries the same information the video
 * opens with — what it covers and how long it runs — and keeps the exact
 * footprint of the loaded player so nothing shifts when it swaps in.
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
            {failed ? "Walkthrough unavailable" : "Interactive walkthrough"}
          </span>
        </div>
        <span className="readout text-xs text-ink-faint">
          00:00 / 00:{String(RUNTIME_SECONDS).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex aspect-[16/9] w-full flex-col items-center justify-center overflow-hidden bg-canvas-sunk px-6 text-center">
        <div aria-hidden="true" className="grid-field absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(9,76,178,0.06),transparent_70%)]"
        />

        <div className="relative flex flex-col items-center gap-5">
          <span
            className={cn(
              "flex size-14 items-center justify-center rounded-full border",
              failed
                ? "border-flare/40 bg-flare-soft text-flare"
                : "border-brand/30 bg-brand-soft text-brand"
            )}
          >
            {failed ? (
              <TriangleAlert aria-hidden="true" className="size-5" />
            ) : (
              <Play aria-hidden="true" className="size-5" fill="currentColor" />
            )}
          </span>

          <p className="display-md max-w-[26ch] text-balance text-ink">
            {failed
              ? "The walkthrough didn't load."
              : "Six chapters, thirty-five seconds."}
          </p>

          <p className="max-w-md text-sm leading-relaxed text-ink-dim">
            {failed
              ? "Reload the page to try again, or ask us to walk you through it live — it covers the same six steps below."
              : "From a blind plant floor to a searchable maintenance record."}
          </p>
        </div>
      </div>

      <ol className="flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline px-4 py-4">
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
