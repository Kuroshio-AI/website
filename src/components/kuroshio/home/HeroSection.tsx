import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { CurrentField } from "@/components/kuroshio/CurrentField";
import { PageLink } from "@/components/kuroshio/PageLink";
import { EASE, SplitText, gsap, prefersReducedMotion } from "@/lib/motion";

const INSTRUMENTS = [
  { value: "60s", label: "Telemetry resolution", helper: "per machine, always on" },
  { value: "3–4h", label: "Install window", helper: "no production downtime" },
  { value: "12d", label: "Typical failure lead", helper: "before the machine stops" },
  { value: "0", label: "Control-system touchpoints", helper: "we never write to your PLC" },
];

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !headlineRef.current) {
        gsap.fromTo(
          "[data-hero-eyebrow], [data-hero], [data-hero-instrument]",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.04 }
        );
        return;
      }

      // autoSplit re-splits (and re-runs onSplit) once the display font lands,
      // so the reveal never animates mis-measured lines.
      SplitText.create(headlineRef.current, {
        type: "lines,chars",
        linesClass: "hero-line",
        autoSplit: true,
        onSplit: (self: { chars: Element[] }) =>
          gsap
            .timeline({ defaults: { ease: EASE.out } })
            .fromTo(
              "[data-hero-eyebrow]",
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.6 }
            )
            .fromTo(
              self.chars,
              { opacity: 0, yPercent: 108, rotateX: -55 },
              { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.85, stagger: 0.014 },
              "-=0.35"
            )
            .fromTo(
              "[data-hero]",
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
              "-=0.55"
            )
            .fromTo(
              "[data-hero-instrument]",
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
              "-=0.4"
            ),
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="relative overflow-hidden border-b border-hairline" ref={rootRef}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <CurrentField className="absolute inset-0 size-full" opacity={0.9} />
        <div className="grid-field absolute inset-0 opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(75%_55%_at_18%_18%,rgba(18,160,140,0.18),transparent_70%)]" />
        <div className="vignette absolute inset-0" />
      </div>

      <div className="shell relative flex min-h-[calc(94svh-96px)] flex-col justify-center pt-20 pb-14 md:pt-28">
        <div className="flex items-center gap-4" data-hero-eyebrow>
          <span className="size-1.5 shrink-0 rounded-full bg-signal animate-pulse-dot" />
          <span className="tag">Industrial intelligence · UAE &amp; GCC</span>
        </div>

        <h1
          className="display-xl mt-7 max-w-[19ch] [perspective:800px]"
          ref={headlineRef}
        >
          Read your plant like an <span className="text-signal">instrument.</span>
        </h1>

        <div className="mt-8 grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="lede max-w-xl" data-hero>
            Kuroshio AI clamps onto your machines and turns raw current into
            energy cost, failure warnings weeks ahead, and a maintenance record
            you can actually search.
          </p>

          <div className="flex flex-wrap items-center gap-3" data-hero>
            <PageLink className="btn-signal" page="contact">
              Request a demo
              <ArrowRight aria-hidden="true" className="size-4" />
            </PageLink>
            <PageLink className="btn-ghost" page="platform">
              See the platform
            </PageLink>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px border border-hairline bg-hairline lg:grid-cols-4">
          {INSTRUMENTS.map((item) => (
            <div
              className="group relative flex flex-col gap-1.5 bg-abyss/85 px-5 py-6 transition-colors hover:bg-panel/70"
              data-hero-instrument
              key={item.label}
            >
              <dt className="readout text-3xl leading-none text-bone md:text-[2.5rem]">
                {item.value}
              </dt>
              <dd className="flex flex-col gap-1">
                <span className="text-[0.8125rem] font-medium tracking-tight text-bone-dim">
                  {item.label}
                </span>
                <span className="text-xs leading-snug text-bone-faint">{item.helper}</span>
              </dd>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </div>
          ))}
        </dl>

        <a
          className="mt-10 flex w-fit items-center gap-3 text-bone-faint transition-colors hover:text-signal"
          data-hero
          href="#walkthrough"
        >
          <span className="tag">Watch the walkthrough</span>
          <ArrowDown aria-hidden="true" className="size-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
