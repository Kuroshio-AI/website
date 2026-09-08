import { TriangleAlert } from "lucide-react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { CHAPTERS, VIDEO } from "@/remotion/theme";
import { cn } from "@/lib/utils";

/** A readable preview and an actionable failure state, without a second player UI. */
export function DemoPoster({ failed = false, embedded = false }: Readonly<{ failed?: boolean; embedded?: boolean }>) {
  return (
    <div className={cn("flex flex-col items-start justify-center gap-5 bg-panel p-7 md:p-12", embedded ? "size-full" : "panel aspect-[4/5] lg:aspect-video")}>
      {failed ? (
        <>
          <TriangleAlert aria-hidden="true" className="size-7 text-flare" />
          <p className="display-md max-w-md" role="alert">The demo couldn&apos;t load.</p>
          <p className="max-w-md text-sm leading-relaxed text-ink-dim">
            Reload to try again, or let us show you the platform in person.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="btn-brand" onClick={() => window.location.reload()} type="button">Reload demo</button>
            <PageLink className="btn-ghost" page="contact">Request a demo</PageLink>
          </div>
        </>
      ) : (
        <>
          <span className="tag-brand">Extrusion Line 02 · Energy costs</span>
          <p className="display-md max-w-lg">See what idle running costs.</p>
          <div className="flex flex-col gap-2 border-l-2 border-brand py-2 pl-5">
            <span className="readout text-4xl text-brand md:text-6xl">AED 16.50</span>
            <span className="text-sm text-ink-dim">Illustrative idle cost · today</span>
          </div>
          <p className="text-sm text-ink-faint" role="status">Loading the {VIDEO.durationInFrames / VIDEO.fps}-second demo…</p>
        </>
      )}
      <p className="text-xs leading-relaxed text-ink-faint">{CHAPTERS.map((chapter) => chapter.label).join(" · ")}</p>
    </div>
  );
}
