import { TriangleAlert } from "lucide-react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { CHAPTERS, VIDEO } from "@/remotion/theme";
import { cn } from "@/lib/utils";

/** A readable preview and an actionable failure state, without a second player UI. */
export function DemoPoster({ failed = false, embedded = false }: Readonly<{ failed?: boolean; embedded?: boolean }>) {
  return (
    <div
      className={cn("flex flex-col items-start justify-center gap-5 bg-panel p-7 md:p-12", embedded ? "size-full" : "panel aspect-[4/5] lg:aspect-video")}
      style={failed ? undefined : {
        backgroundColor: "#101923",
        backgroundImage: "linear-gradient(90deg, rgba(8,16,25,0.94) 0%, rgba(8,16,25,0.62) 46%, rgba(8,16,25,0.30) 100%), linear-gradient(180deg, rgba(8,16,25,0.12), rgba(8,16,25,0.72)), url('/kuroshio/plastics-polymers.jpg')",
        backgroundPosition: "center, center, 42% center",
        backgroundSize: "cover, cover, cover",
      }}
    >
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
          <span className="tag-brand" style={{ background: "rgba(240,245,255,0.12)", borderColor: "rgba(240,245,255,0.32)", color: "#dce9ff" }}>Extrusion Line 02 · Energy costs</span>
          <p className="display-md max-w-lg" style={{ color: "#f4f7fb" }}>See what idle running costs.</p>
          <div className="flex flex-col gap-2 border-l-2 border-brand py-2 pl-5">
            <span className="readout text-4xl md:text-6xl" style={{ color: "#a9c8ff" }}>AED 16.50</span>
            <span className="text-sm" style={{ color: "rgba(244,247,251,0.72)" }}>Illustrative idle cost · today</span>
          </div>
          <p className="text-sm" style={{ color: "rgba(244,247,251,0.64)" }} role="status">Loading the {VIDEO.durationInFrames / VIDEO.fps}-second demo…</p>
        </>
      )}
      <p className="text-xs leading-relaxed" style={{ color: failed ? undefined : "rgba(244,247,251,0.58)" }}>{CHAPTERS.map((chapter) => chapter.label).join(" · ")}</p>
    </div>
  );
}
