import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { PilotClose } from "@/components/kuroshio/platform/PilotClose";
import { Band } from "@/components/kuroshio/Sections";
import { TrackSwitch } from "@/components/kuroshio/TrackSwitch";
import { industriesPage } from "@/data/mockData";
import type { PageId, TrackId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

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

/* ------------------------------------------------------------ machine picker */

type TraceKind = "idle" | "step" | "stretch" | "shorten" | "ripple" | "drift" | "night";

interface Machine {
  readonly name: string;
  readonly where: string;
  readonly kind: TraceKind;
  /** Label and span (0 to 1 along the trace) of the part the alert is about. */
  readonly mark: string;
  readonly span: readonly [number, number];
  readonly finding: string;
  readonly facts: ReadonlyArray<readonly [string, string]>;
}

// Illustrative readings. The extruder and granulator figures match the Platform page's demo line.
const MACHINES: Record<TrackId, ReadonlyArray<Machine>> = {
  factories: [
    {
      name: "Extruder",
      where: "Plastics",
      kind: "idle",
      mark: "Idle, heaters on",
      span: [0.5, 0.72],
      finding: "Ran empty for 1h 42m today with the heaters still on.",
      facts: [
        ["Cost of that idle time", "AED 16.50 a day"],
        ["How it shows", "Motor load drops, heater current stays"],
      ],
    },
    {
      name: "Annealing lehr",
      where: "Glass",
      kind: "step",
      mark: "Phase B low",
      span: [0.58, 1],
      finding: "One heating element has gone open circuit and the others are covering for it.",
      facts: [
        ["Phase B current", "18% below A and C"],
        ["Flagged", "Within the same shift"],
      ],
    },
    {
      name: "Hydraulic press",
      where: "Aluminium extrusion",
      kind: "stretch",
      mark: "Cycles lengthening",
      span: [0.62, 1],
      finding: "Each press cycle takes six seconds longer than it did three weeks ago.",
      facts: [
        ["Cycle time", "38 s to 44 s"],
        ["Likely cause", "Pump wear"],
      ],
    },
    {
      name: "Granulator",
      where: "Rubber recycling",
      kind: "ripple",
      mark: "Ripple growing",
      span: [0.6, 1],
      finding: "The drive-end bearing is wearing, and the ripple in the current keeps growing.",
      facts: [
        ["Sideband at 2× line frequency", "+41%"],
        ["Warning ahead of failure", "12 days"],
      ],
    },
  ],
  buildings: [
    {
      name: "Centrifugal chiller",
      where: "Chiller plant",
      kind: "drift",
      mark: "Drawing more",
      span: [0.62, 1],
      finding: "This chiller draws 9% more than it did in March for the same running hours.",
      facts: [
        ["Compressor current", "+9% since March"],
        ["Likely cause", "Fouled condenser tubes"],
      ],
    },
    {
      name: "Air handling unit",
      where: "Towers and malls",
      kind: "night",
      mark: "Running overnight",
      span: [0.183, 0.333],
      finding: "The fans run from 11 pm to 5 am on a floor nobody is using.",
      facts: [
        ["After-hours running", "6 hours a night"],
        ["Fix", "A schedule change"],
      ],
    },
    {
      name: "Booster pump",
      where: "Hotels",
      kind: "shorten",
      mark: "Short cycling",
      span: [0.55, 1],
      finding: "The pump now starts 40 times an hour. It used to start 12.",
      facts: [
        ["Starts per hour", "12 to 40"],
        ["Likely cause", "Pressure vessel or a leak"],
      ],
    },
    {
      name: "Cooling tower fan",
      where: "District cooling",
      kind: "step",
      mark: "Phase imbalance",
      span: [0.58, 1],
      finding: "One phase carries 6% less current than the other two.",
      facts: [
        ["Phase imbalance", "6%"],
        ["Risk if left", "The winding overheats"],
      ],
    },
  ],
};

const W = 600;
const H = 220;
const SAMPLES = 150;

/** Current (0 to 1) at position t (0 to 1) for each fault shape. */
function level(kind: TraceKind, t: number, i: number): number {
  const wobble = 0.018 * (Math.sin(i * 1.7) + Math.sin(i * 0.61 + 2));
  const pulse = (phase: number) => (phase % 1 < 0.45 ? 0.78 : 0.22);
  switch (kind) {
    case "idle":
      return (t > 0.5 && t < 0.72 ? 0.34 : 0.74) + wobble;
    case "step":
      return (t < 0.58 ? 0.7 : 0.5) + wobble;
    case "stretch":
      return pulse(t * 16 * (1 - 0.42 * t));
    case "shorten":
      return pulse(t * 5 * (1 + 2.2 * t));
    case "ripple":
      return 0.56 + Math.sin(i * 0.9) * (0.03 + 0.24 * t * t);
    case "drift":
      return 0.36 + 0.3 * t + 0.05 * Math.sin(t * Math.PI * 10) + wobble;
    case "night":
      return ((t * 3) % 1 < 0.55 ? 0.74 : 0.5) + wobble;
  }
}

function tracePath(kind: TraceKind): string {
  return Array.from({ length: SAMPLES }, (_, i) => {
    const t = i / (SAMPLES - 1);
    return `${i ? "L" : "M"}${(t * W).toFixed(1)} ${(H - 24 - level(kind, t, i) * (H - 60)).toFixed(1)}`;
  }).join("");
}

function MachineTrace({ machine, live }: Readonly<{ machine: Machine; live: boolean }>) {
  const ref = useRef<HTMLElement>(null);
  const path = useMemo(() => tracePath(machine.kind), [machine.kind]);
  const [from, to] = machine.span;

  // The trace draws, then the flagged stretch and the finding arrive: the order the meter works in.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: EASE.out } })
        .fromTo("[data-trace]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: EASE.inOut })
        .fromTo("[data-mark]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.35")
        .fromTo("[data-finding] > *", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, "-=0.25");
    },
    { dependencies: [machine], revertOnUpdate: true, scope: ref }
  );

  return (
    <figure
      aria-live={live ? "polite" : "off"}
      className="flex h-full flex-col gap-5 bg-[#26251F] p-6 text-[#EDECE8] sm:p-8"
      data-ui
      ref={ref}
    >
      <figcaption className="flex flex-col gap-1">
        <span className="text-xl font-semibold tracking-tight">{machine.name}</span>
        <span className="text-[0.9375rem] text-[#A9A79F]">Current at the panel, illustrative reading</span>
      </figcaption>

      <svg aria-hidden="true" className="w-full" viewBox={`0 0 ${W} ${H}`}>
        <g data-mark>
          <rect fill="#E0A93B" fillOpacity="0.16" height={H - 24} width={(to - from) * W} x={from * W} y="0" />
          <text fill="#E0A93B" fontSize="15" fontWeight="600" x={from * W + 10} y="22">
            {machine.mark}
          </text>
        </g>
        <path
          d={path}
          data-trace
          fill="none"
          pathLength="1"
          stroke="#7FA6F4"
          strokeDasharray="1"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>

      <div className="mt-auto flex flex-col gap-6" data-finding>
        {/* Heights are reserved for the longest reading so the page holds still between machines. */}
        <p className="min-h-[4.2em] max-w-[26ch] xl:min-h-[3.15em] font-display text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.05] font-bold tracking-[-0.02em]">
          {machine.finding}
        </p>
        <dl className="grid gap-1 sm:grid-cols-2">
          {machine.facts.map(([label, value]) => (
            <div className="flex min-h-[6.5rem] flex-col gap-1 bg-white/[0.06] px-4 py-3" key={label}>
              <dt className="text-sm text-[#A9A79F]">{label}</dt>
              <dd className="text-[1.0625rem] font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}

/* --------------------------------------------------------------------- page */

export function IndustriesPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  const [trackId, setTrackId] = useState<TrackId>(readTrack);
  const [picked, setPicked] = useState(0);
  // The picker plays through the machines by itself until the visitor chooses one.
  const [touring, setTouring] = useState(() => !prefersReducedMotion());

  usePageMotion(rootRef, (root: HTMLElement) => {
    if (prefersReducedMotion()) return;
    // Each sector photo settles from a slight zoom as it crosses the screen.
    gsap.utils.toArray<HTMLElement>("[data-drift]", root).forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.14 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
  });

  const track = tracks.find((item) => item.id === trackId) ?? tracks[0];
  const machines = MACHINES[track.id];
  const machine = machines[picked] ?? machines[0];

  useEffect(() => {
    if (!touring) return;
    const id = setInterval(() => setPicked((index) => (index + 1) % machines.length), 5000);
    return () => clearInterval(id);
  }, [touring, machines.length]);

  const showTrack = useCallback((next: TrackId) => {
    setTrackId(next);
    setPicked(0);
  }, []);

  // The page stays mounted across hash navigation, so the nav link back to
  // `#/industries` has to pull the track with it or the URL and the UI disagree.
  useEffect(() => {
    const sync = () => showTrack(readTrack());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [showTrack]);

  const selectTrack = useCallback(
    (next: TrackId) => {
      setTouring(false);
      showTrack(next);
      // replaceState, not the hash: assigning the hash fires the router's
      // hashchange handler, which would scroll the reader back to the top.
      const suffix = next === DEFAULT_TRACK ? "" : `/${next}`;
      window.history.replaceState(window.history.state, "", `#/industries${suffix}`);
    },
    [showTrack]
  );

  // The track's copy and photos swap in place; one short fade keeps it from reading as a page jump.
  const firstRun = useRef(true);
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-swap]",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: EASE.out, stagger: 0.04 }
      );
    },
    { dependencies: [trackId], scope: rootRef }
  );

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      {/* ------------------------------------------------------------- hero */}
      <section className="shell grid gap-10 py-8 md:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6" data-swap>
            <h1
              className="max-w-[14ch] font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.035em] text-ink"
              data-reveal="up"
            >
              {track.headline}
            </h1>
            <p className="lede min-h-[7.5em] max-w-xl sm:min-h-[4.5em]" data-reveal="up" data-reveal-delay="0.08">
              {track.description}
            </p>
          </div>

          <div className="mt-2 flex max-w-xl flex-col gap-1" data-reveal="up" data-reveal-delay="0.14">
            <TrackSwitch onChange={selectTrack} options={tracks} value={trackId} />
            <div aria-label="Choose a machine" className="grid grid-cols-2 gap-1" role="group">
              {machines.map((item, index) => (
                <button
                  aria-pressed={index === picked}
                  className={cn(
                    "flex flex-col gap-0.5 px-5 py-4 text-left transition-[background-color,color,transform] duration-200 active:scale-[0.98]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    index === picked
                      ? "bg-[#26251F] text-[#EDECE8]"
                      : "bg-canvas-sunk text-ink hover:bg-panel"
                  )}
                  key={item.name}
                  onClick={() => {
                    setTouring(false);
                    setPicked(index);
                  }}
                  type="button"
                >
                  <span className="text-[1.0625rem] font-semibold tracking-tight">{item.name}</span>
                  <span className={cn("text-sm", index === picked ? "text-[#A9A79F]" : "text-ink-dim")}>
                    {item.where}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal="scale">
          <MachineTrace live={!touring} machine={machine} />
        </div>
      </section>

      {/* ---------------------------------------------------------- sectors */}
      <Band className="pt-0 md:pt-0">
        <div className="shell flex flex-col gap-2">
          {track.sectors.map((sector, index) => (
            <article className="grid bg-canvas-sunk md:grid-cols-12" data-reveal="up" key={index}>
              <div
                className={cn(
                  "flex flex-col gap-6 p-6 md:col-span-5 md:p-10",
                  index % 2 === 1 && "md:order-2"
                )}
                data-swap
              >
                <h2 className="display-lg">{sector.title}</h2>
                <p className="text-[1.125rem] leading-relaxed">{sector.body}</p>
                <div className="mt-auto grid gap-6 pt-4 sm:grid-cols-2">
                  {(
                    [
                      ["Machines we meter", sector.machines],
                      ["What we read", sector.signals],
                    ] as const
                  ).map(([label, items]) => (
                    <div className="flex flex-col gap-2" key={label}>
                      <h3 className="text-[0.9375rem] text-ink-dim">{label}</h3>
                      <ul className="flex flex-col gap-1 text-[1.0625rem] font-semibold">
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden md:col-span-7">
                <img
                  alt={sector.imageAlt}
                  className="aspect-[4/3] size-full object-cover md:aspect-auto md:min-h-[32rem]"
                  data-drift
                  loading="lazy"
                  src={sector.image}
                />
              </div>
            </article>
          ))}
        </div>
      </Band>

      {/* ------------------------------------------------------ sector list */}
      <Band tone="canvas-sunk">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start" data-swap>
            <h2 className="display-lg" data-reveal="up">
              {track.grid.title}
            </h2>
            <p className="lede max-w-xl" data-reveal="up" data-reveal-delay="0.08">
              {track.grid.body}
            </p>
          </div>

          <dl className="flex flex-col gap-1 bg-panel p-2 sm:p-4" data-reveal="up" data-reveal-delay="0.1">
            {track.grid.items.map((item) => (
              <div
                className="grid gap-x-8 gap-y-1 bg-canvas px-4 py-4 sm:grid-cols-[13rem_minmax(0,1fr)]"
                data-swap
                key={item.title}
              >
                <dt className="text-xl font-semibold tracking-tight text-ink">{item.title}</dt>
                <dd className="text-base leading-relaxed text-ink">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      {/* ----------------------------------------------------------- ktrack */}
      <section className="bg-[#26251F] text-[#EDECE8]">
        <div className="shell grid gap-8 py-20 md:grid-cols-12 md:items-end md:gap-x-6 md:py-28">
          <h2 className="display-lg md:col-span-7" data-reveal="up">
            Inspect and certify equipment instead?
          </h2>
          <div className="flex flex-col items-start gap-6 md:col-span-5" data-reveal="up" data-reveal-delay="0.08">
            <p className="text-[1.125rem] leading-relaxed sm:text-[1.3125rem]">
              KTrack is our product for inspection and lifting companies. Inspectors report from
              their phone, a reviewer signs off, and every certificate carries a QR code.
            </p>
            <PageLink className="btn-brand" page="ktrack">
              Explore KTrack
              <ArrowRight aria-hidden="true" className="size-4" />
            </PageLink>
          </div>
        </div>
      </section>

      <PilotClose more={{ page: "platform", label: "How the platform works" }} onNavigate={onNavigate} />
    </main>
  );
}
