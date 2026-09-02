import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { SectionHead } from "@/components/kuroshio/Sections";
import { homePage } from "@/data/mockData";
import type { IconKey } from "@/data/mockData";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const STEP_ICONS: ReadonlyArray<IconKey> = ["wrench", "activity", "radio", "cloud", "gauge"];

const PIPELINE_BODY =
  "Clamp-on meters, our own SIM, and a UAE-resident cloud. Nothing routes through your network, and nothing writes back to your machines.";

const PIPELINE_TITLE = (
  <>
    From copper to <span className="text-brand">dashboard</span> in one afternoon.
  </>
);

const STEPS = homePage.process.map((step, index) => ({
  ...step,
  icon: STEP_ICONS[index],
  code: `T+${["0:00", "0:00", "0:05", "0:20", "3:40"][index]}`,
}));

export function PipelineSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "+=170%",
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline.to("[data-line]", { scaleX: 1, ease: "none", duration: STEPS.length }, 0);
        timeline.to("[data-packet]", { xPercent: 100, ease: "none", duration: STEPS.length }, 0);

        STEPS.forEach((_, index) => {
          timeline.to(
            `[data-step="${index}"]`,
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            index * 0.92
          );
          timeline.to(
            `[data-node="${index}"]`,
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
            index * 0.92
          );
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="border-t border-hairline bg-canvas-sunk/40" ref={rootRef}>
      {/* The head travels with the pinned stage on desktop so the scrub never
          strands the reader without context. */}
      <div className="shell pt-24 md:pt-32 lg:hidden">
        <SectionHead
          body={PIPELINE_BODY}
          eyebrow="How it works"
          index="03"
          title={PIPELINE_TITLE}
        />
      </div>

      {/* Pinned, scrub-driven pipeline — desktop */}
      <div
        className="hidden min-h-[calc(100svh-96px)] flex-col justify-center py-16 lg:flex"
        ref={stageRef}
      >
        <div className="shell w-full">
          <div className="flex items-end justify-between gap-16">
            <header className="flex max-w-2xl flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="tag-brand">03</span>
                <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
                <span className="tag">How it works</span>
              </div>
              <h2 className="display-lg">{PIPELINE_TITLE}</h2>
            </header>
            <p className="lede max-w-sm text-right">{PIPELINE_BODY}</p>
          </div>

          <div className="relative mt-16 mb-12">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-hairline" />
            <div
              className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 scale-x-0 bg-brand"
              data-line
            />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div className="w-full" data-packet style={{ transform: "translateX(0%)" }}>
                <span className="glow-brand -ml-1 block size-2.5 rounded-full bg-brand" />
              </div>
            </div>

            <ol className="relative flex items-center justify-between">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span
                    className="flex size-16 scale-75 items-center justify-center border border-brand/50 bg-canvas text-brand opacity-30"
                    data-node={index}
                  >
                    <KuroshioIcon className="size-6" name={step.icon} strokeWidth={1.5} />
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <ol className="grid grid-cols-5 gap-6">
            {STEPS.map((step, index) => (
              <li
                className="flex translate-y-4 flex-col gap-3 border-t border-hairline pt-5 opacity-25"
                data-step={index}
                key={step.title}
              >
                <div className="flex items-baseline gap-3">
                  <span className="tag-brand">{String(index + 1).padStart(2, "0")}</span>
                  <span className="readout text-[0.6875rem] text-ink-faint">{step.code}</span>
                </div>
                <h3 className="text-lg leading-tight font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-dim">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Stacked pipeline — mobile and tablet */}
      <ol className="shell flex flex-col pt-14 pb-24 lg:hidden">
        {STEPS.map((step, index) => (
          <li
            className="relative flex gap-5 border-l border-hairline pb-9 pl-6 last:pb-0"
            data-reveal="up"
            key={step.title}
          >
            <span className="absolute top-1 -left-[13px] flex size-6 items-center justify-center border border-brand/50 bg-canvas text-brand">
              <KuroshioIcon className="size-3" name={step.icon} strokeWidth={2} />
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="tag-brand">{String(index + 1).padStart(2, "0")}</span>
                <span className="readout text-[0.6875rem] text-ink-faint">{step.code}</span>
              </div>
              <h3 className="text-lg leading-tight font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-dim">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
