import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { CurrentField } from "@/components/kuroshio/CurrentField";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { PageLink } from "@/components/kuroshio/PageLink";
import { SectorPlate } from "@/components/kuroshio/SectorPlate";
import { Band, SectionHead } from "@/components/kuroshio/Sections";
import { TrackSwitch } from "@/components/kuroshio/TrackSwitch";
import { industriesPage } from "@/data/mockData";
import type { PageId, TrackId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

const tracks = industriesPage.tracks;
const DEFAULT_TRACK = tracks[0].id;

/** `#/industries/buildings` deep-links a track so ads and sales links can land on it. */
function readTrack(): TrackId {
  if (typeof window === "undefined") return DEFAULT_TRACK;
  const segment = window.location.hash.split("#")[1]?.split("/")[2];
  return tracks.some((track) => track.id === segment) ? (segment as TrackId) : DEFAULT_TRACK;
}

export function IndustriesPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [trackId, setTrackId] = useState<TrackId>(readTrack);
  usePageMotion(rootRef);

  const track = tracks.find((item) => item.id === trackId) ?? tracks[0];

  // The page stays mounted across hash navigation, so the nav link back to
  // `#/industries` has to pull the track with it or the URL and the UI disagree.
  useEffect(() => {
    const sync = () => setTrackId(readTrack());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const selectTrack = useCallback((next: TrackId) => {
    setTrackId(next);
    // replaceState, not the hash: assigning the hash fires the router's
    // hashchange handler, which would scroll the reader back to the top.
    const suffix = next === DEFAULT_TRACK ? "" : `/${next}`;
    window.history.replaceState(window.history.state, "", `#/industries${suffix}`);
  }, []);

  // The panel remounts on switch, so its [data-reveal] children are unbound and
  // already visible. One short fade keeps the swap from reading as a page jump.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !panelRef.current) return;
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: EASE.out }
      );
    },
    { dependencies: [trackId], scope: panelRef }
  );

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <section className="relative overflow-hidden border-b border-hairline">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <CurrentField className="absolute inset-0 size-full" density={0.55} opacity={0.55} />
          <div className="grid-field absolute inset-0 opacity-40" />
          <div className="vignette absolute inset-0" />
        </div>

        <div className="shell relative flex flex-col gap-7 py-24 md:py-32">
          <div className="flex items-center gap-4" data-reveal="fade">
            <span className="tag-brand">Industries</span>
            <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
            <span className="tag">{track.eyebrow}</span>
          </div>
          <h1 className="display-xl max-w-[16ch]" data-reveal="up">
            {track.headline.lead} <span className="text-brand">{track.headline.accent}</span>
          </h1>
          <p className="lede max-w-2xl" data-reveal="up" data-reveal-delay="0.08">
            {track.description}
          </p>

          <div className="mt-4 max-w-2xl" data-reveal="up" data-reveal-delay="0.14">
            <TrackSwitch onChange={selectTrack} options={tracks} value={trackId} />
          </div>
        </div>
      </section>

      <div key={trackId} ref={panelRef}>
        {/* ----------------------------------------------- flagship sectors */}
        <Band>
          <div className="shell flex flex-col gap-20 md:gap-28">
            {track.sectors.map((sector, index) => (
              <article
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                key={sector.title}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <SectorPlate
                    caption="One point of contact"
                    diagram={"diagram" in sector ? sector.diagram : undefined}
                    image={"image" in sector ? sector.image : undefined}
                    imageAlt={"imageAlt" in sector ? sector.imageAlt : undefined}
                    index={index}
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <h2 className="display-lg">{sector.title}</h2>
                  <p className="lede">{sector.body}</p>

                  <div className="mt-2 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
                    <div className="flex flex-col gap-3 bg-canvas p-5">
                      <span className="tag">Assets watched</span>
                      <ul className="flex flex-col gap-2">
                        {sector.machines.map((machine) => (
                          <li className="text-sm tracking-tight text-ink" key={machine}>
                            {machine}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 bg-canvas p-5">
                      <span className="tag">Signals read</span>
                      <ul className="flex flex-col gap-2">
                        {sector.signals.map((signalName) => (
                          <li
                            className="readout flex items-center gap-2 text-sm text-brand"
                            key={signalName}
                          >
                            <span aria-hidden="true" className="size-1 bg-brand" />
                            {signalName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Band>

        {/* --------------------------------------------------- sector grid */}
        <Band tone="canvas-sunk">
          <div className="shell">
            <SectionHead
              body={track.grid.body}
              eyebrow={track.grid.eyebrow}
              index="02"
              title={track.grid.title}
            />

            <div className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
              {track.grid.items.map((item) => (
                <article
                  className="group relative flex flex-col gap-4 bg-panel p-7 transition-colors duration-300 hover:bg-brand-soft"
                  key={item.title}
                >
                  <KuroshioIcon
                    className="size-6 text-ink-faint transition-colors duration-300 group-hover:text-brand"
                    name={item.icon}
                    strokeWidth={1.4}
                  />
                  <h3 className="text-xl leading-tight font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-dim">{item.body}</p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </article>
              ))}
            </div>
          </div>
        </Band>

        <section className="relative overflow-hidden border-t border-hairline bg-canvas-deep">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="grid-field-fine absolute inset-0 opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_110%,rgba(9,76,178,0.10),transparent_70%)]" />
          </div>
          <div className="shell relative flex flex-col items-start gap-7 py-24 md:py-32">
            <h2 className="display-lg max-w-3xl">{track.cta.title}</h2>
            <div className="flex flex-wrap gap-3">
              <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
                {track.cta.action}
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
              <PageLink className="btn-ghost" page="platform">
                How the platform works
              </PageLink>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
