import { ArrowDown, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Band } from "@/components/kuroshio/Sections";

// One path from the clamp on Extrusion Line 02 to the alert on your screen,
// drawn as a single diagram. Facts come from the install stage slider.

function Link({ label }: Readonly<{ label: string }>) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 py-4 pl-6 xl:w-28 xl:shrink-0 xl:flex-col xl:gap-2 xl:py-0 xl:pl-0"
    >
      <span className="flex flex-col items-center text-brand xl:w-full xl:flex-row">
        <span className="h-8 w-0.5 bg-brand xl:h-0.5 xl:w-full" />
        <ArrowDown className="-mt-2 size-4 xl:hidden" strokeWidth={2.2} />
        <ArrowRight
          className="-ml-2 hidden size-4 xl:block"
          strokeWidth={2.2}
        />
      </span>
      <span className="text-[0.9375rem] leading-snug text-ink-dim xl:order-first xl:text-center">
        {label}
      </span>
    </div>
  );
}

function Node({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div className="flex min-w-0 flex-col gap-2 bg-canvas p-5 xl:flex-1">
      <h3 className="text-lg leading-tight font-semibold tracking-tight text-ink">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ArchitectureSection() {
  return (
    <Band id="architecture">
      <div className="shell flex flex-col gap-12 md:gap-16">
        <header className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <h2 className="display-lg" data-reveal="up">
            Works on any machine. No PLC needed.
          </h2>
          <p
            className="lede max-w-xl"
            data-reveal="up"
            data-reveal-delay="0.08"
          >
            Our own meter, our own uplink, our own cloud region. The install
            takes 3 to 4 hours and the line keeps running.
          </p>
        </header>

        <figure className="bg-panel p-4 sm:p-6 lg:p-8" data-reveal="up">
          <div className="flex flex-col max-xl:max-w-2xl xl:flex-row xl:items-center">
            {/* Everything on site sits in one zone, apart from the plant's own network. */}
            <div className="flex min-w-0 flex-col gap-3 bg-canvas-sunk p-4 sm:p-5 xl:flex-[2.3]">
              <p className="text-[0.9375rem] font-medium text-ink-dim">
                On your site
              </p>
              <div className="flex flex-col xl:flex-row xl:items-center">
                <Node title="Meter on the incomer">
                  <p className="text-base text-ink">
                    Three clamps on Extrusion Line 02. Nothing is cut.
                  </p>
                  <span aria-hidden="true" className="mt-2 flex gap-2">
                    {["L1", "L2", "L3"].map((phase) => (
                      <span
                        className="flex flex-col items-center gap-1 text-sm text-ink-dim"
                        key={phase}
                      >
                        <span className="h-6 w-3 bg-brand" />
                        {phase}
                      </span>
                    ))}
                  </span>
                </Node>
                <Link label="Every 40 seconds" />
                <Node title="Site gateway">
                  <p className="text-base text-ink">
                    Current, voltage and energy on all three phases.
                  </p>
                </Node>
              </div>
            </div>

            <Link label="Encrypted Etisalat or du SIM" />

            <Node title="Kuroshio cloud">
              <p className="text-base text-ink">
                Azure UAE North. Cost, idle time and a health score per machine.
              </p>
            </Node>

            <Link label="Live within 24 hours" />

            <Node title="Your screen">
              <div
                className="mt-1 flex flex-col gap-1 bg-panel p-3 text-[0.9375rem]"
                data-ui
              >
                <span className="font-semibold text-ink">
                  Extrusion Line 02
                </span>
                <span className="readout text-ink">Health 71 of 100</span>
                <span className="readout text-flare">ALR-4471 open</span>
              </div>
            </Node>
          </div>

          <figcaption className="mt-6 max-w-2xl text-base leading-relaxed text-ink">
            The gateway brings its own SIM, so your PLC, BMS and plant network
            are never touched. The only outside service in the path is Microsoft
            Azure, and your data stays in the UAE.
          </figcaption>
        </figure>
      </div>
    </Band>
  );
}
