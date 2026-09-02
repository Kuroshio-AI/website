import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { CurrentField } from "@/components/kuroshio/CurrentField";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { PageLink } from "@/components/kuroshio/PageLink";
import { Band, SectionHead } from "@/components/kuroshio/Sections";
import { homePage, industriesPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

export function IndustriesPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

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
            <span className="tag">Heavy manufacturing · UAE &amp; GCC</span>
          </div>
          <h1 className="display-xl max-w-[16ch]" data-reveal="up">
            Industrial intelligence built around your{" "}
            <span className="text-brand">machines.</span>
          </h1>
          <p className="lede max-w-2xl" data-reveal="up" data-reveal-delay="0.08">
            {industriesPage.description}
          </p>
        </div>
      </section>

      {/* --------------------------------------------------- flagship sectors */}
      <Band>
        <div className="shell flex flex-col gap-20 md:gap-28">
          {industriesPage.sectors.map((sector, index) => (
            <article
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              key={sector.title}
            >
              <div
                className={index % 2 === 1 ? "lg:order-2" : undefined}
                data-reveal="scale"
              >
                <div className="panel corner-marks group relative overflow-hidden">
                  <img
                    alt={sector.imageAlt}
                    className="aspect-[4/3] w-full object-cover grayscale-[0.55] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    loading="lazy"
                    src={sector.image}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/25 via-transparent to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="grid-field-fine pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                  />
                  <span className="tag-brand absolute top-4 left-4 border border-brand-line bg-panel px-2 py-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="display-lg" data-reveal="up">
                  {sector.title}
                </h2>
                <p className="lede" data-reveal="up" data-reveal-delay="0.06">
                  {sector.body}
                </p>

                <div className="mt-2 grid gap-px border border-hairline bg-hairline sm:grid-cols-2" data-reveal="up">
                  <div className="flex flex-col gap-3 bg-canvas p-5">
                    <span className="tag">Machines watched</span>
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

      {/* ------------------------------------------------------- sector grid */}
      <Band tone="canvas-sunk">
        <div className="shell">
          <SectionHead
            body="The same sensing layer reads any three-phase asset. These are the sectors already running on it across RAK, Dubai, Sharjah, and Umm Al Quwain."
            eyebrow="Also deployed in"
            index="02"
            title="Six sectors, one sensing layer."
          />

          <div
            className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3"
            data-reveal="up"
          >
            {homePage.industries.map((industry) => (
              <article
                className="group relative flex flex-col gap-4 bg-panel p-7 transition-colors duration-300 hover:bg-brand-soft"
                key={industry.title}
              >
                <KuroshioIcon
                  className="size-6 text-ink-faint transition-colors duration-300 group-hover:text-brand"
                  name={industry.icon}
                  strokeWidth={1.4}
                />
                <h3 className="text-xl leading-tight font-semibold tracking-tight text-ink">
                  {industry.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-dim">{industry.body}</p>
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
          <h2 className="display-lg max-w-3xl" data-reveal="up">
            {industriesPage.cta.title}
          </h2>
          <div className="flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.1">
            <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
              {industriesPage.cta.action}
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <PageLink className="btn-ghost" page="platform">
              How the platform works
            </PageLink>
          </div>
        </div>
      </section>
    </main>
  );
}
