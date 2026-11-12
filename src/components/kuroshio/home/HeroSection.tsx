import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { UsedBy } from "@/components/kuroshio/pages/KTrackPage";
import { EASE, gsap, prefersReducedMotion } from "@/lib/motion";

const OFFERINGS = [
  {
    page: "ktrack" as const,
    name: "KTrack",
    line: "Inspection certificates that get checked before they go out and chased before they expire.",
    client: "kee" as const,
  },
  {
    page: "platform" as const,
    name: "Kuroshio Platform",
    line: "What every machine costs, and when it will fail.",
    client: "tkm" as const,
  },
  {
    page: "products" as const,
    name: "Custom tools",
    line: "Internal software built around the way your team already works.",
    client: undefined,
  },
];

const HEADLINE = "We build the software operations run on.";
const LEDE =
  "Kuroshio AI makes two products for factories, buildings and inspection teams, and builds custom internal tools for the work off-the-shelf software misses.";

/** One-shot entrance: text first, then the picture settles. */
function useHeroEntrance(rootRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: EASE.out } })
        .fromTo("[data-hero]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 })
        .fromTo(
          "[data-hero-media]",
          { opacity: 0, y: 48, scale: 1.04 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12, ease: EASE.expo },
          0.2
        );
    },
    { scope: rootRef }
  );
}

/** Company hero: the NASA Kuroshio flow field fills the first screen. */
export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  useHeroEntrance(rootRef);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-68px)] flex-col justify-end overflow-hidden bg-[#0b1d3a] text-white" ref={rootRef}>
      <img
        alt="NASA visualisation of the Kuroshio current running north-east past Taiwan and Japan."
        className="absolute inset-0 -z-10 size-full object-cover object-[30%_40%] opacity-90 motion-safe:animate-[drift_14s_ease-in-out_infinite_alternate]"
        data-hero-media
        height={1080}
        src="/kuroshio/kuroshio-current.jpg"
        width={1920}
      />
      {/* Neutral scrim so the type holds on the busiest part of the picture. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0b1d3a]/55" />

      <div className="shell pt-20 pb-10 md:pb-14">
        <h1 className="font-[family-name:var(--font-display)] text-[8.6vw] md:text-[clamp(2.75rem,5.4vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.045em] max-w-[21ch]" data-hero>
          {HEADLINE}
        </h1>
        <p className="mt-8 max-w-[52ch] text-[1.125rem] leading-relaxed md:text-[1.3125rem]" data-hero>
          {LEDE}
        </p>

        <ul className="mt-14 grid gap-2 md:grid-cols-3" data-hero>
          {OFFERINGS.map((o) => (
            <li key={o.name}>
              <PageLink
                className="group flex h-full flex-col gap-2 bg-[#0b1d3a]/40 p-5 ring-1 ring-white/15 transition-colors duration-200 hover:bg-white hover:text-ink md:p-6"
                page={o.page}
              >
                <span className="flex items-center justify-between font-[family-name:var(--font-display)] text-[1.75rem] leading-none font-bold tracking-[-0.03em]">
                  {o.name}
                  <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-base">{o.line}</span>
                {o.client ? <UsedBy className="mt-auto pt-3" client={o.client} /> : null}
              </PageLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
