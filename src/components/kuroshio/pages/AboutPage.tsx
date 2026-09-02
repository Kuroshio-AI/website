import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { CurrentField } from "@/components/kuroshio/CurrentField";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { PageLink } from "@/components/kuroshio/PageLink";
import { Band, SectionHead } from "@/components/kuroshio/Sections";
import { aboutPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function AboutPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <section className="relative overflow-hidden border-b border-hairline">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <CurrentField className="absolute inset-0 size-full" density={0.7} opacity={0.7} />
          <div className="grid-field absolute inset-0 opacity-40" />
          <div className="vignette absolute inset-0" />
        </div>

        <div className="shell relative flex flex-col gap-7 py-24 md:py-32">
          <div className="flex items-center gap-4" data-reveal="fade">
            <span className="tag-brand">About</span>
            <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
            <span className="tag">Kerala engineering · UAE deployment</span>
          </div>
          <h1 className="display-xl max-w-[17ch]" data-reveal="up">
            Built by engineers who understand{" "}
            <span className="text-brand">factory floors.</span>
          </h1>
          <p className="lede max-w-2xl" data-reveal="up" data-reveal-delay="0.08">
            {aboutPage.hero.description}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- story */}
      <Band>
        <div className="shell grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHead eyebrow="Company story" index="01" title="Named for movement and direction." />
            <div className="flex flex-col gap-5">
              {aboutPage.story.paragraphs.map((paragraph) => (
                <p
                  className="text-[1.0625rem] leading-[1.72] text-ink-dim"
                  data-reveal="up"
                  key={paragraph.slice(0, 40)}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="panel corner-marks flex flex-col gap-4 p-7" data-reveal="scale">
              <span className="tag-brand">{aboutPage.story.calloutTitle}</span>
              <p className="text-[0.9375rem] leading-relaxed text-ink-dim">
                {aboutPage.story.calloutBody}
              </p>
              <p className="tag mt-2 border-t border-hairline pt-4">{aboutPage.story.aside}</p>
            </div>

            <ul className="flex flex-col divide-y divide-hairline border-y border-hairline" data-reveal="up">
              {aboutPage.credentials.map(([title, detail]) => (
                <li className="flex flex-col gap-1 py-4" key={title}>
                  <span className="text-sm font-medium tracking-tight text-ink">{title}</span>
                  <span className="tag">{detail}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Band>

      {/* ---------------------------------------------------------- approach */}
      <Band tone="canvas-sunk">
        <div className="shell">
          <SectionHead
            body="Five commitments we hold on every deployment. They are the reason plant managers let us on site in the first place."
            eyebrow="How we work"
            index="02"
            title="Constraints we do not break."
          />

          <div
            className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5"
            data-reveal="up"
          >
            {aboutPage.approach.map((item, index) => (
              <div
                className="group flex flex-col gap-4 bg-panel p-6 transition-colors hover:bg-brand-soft"
                key={item.title}
              >
                <div className="flex items-center justify-between">
                  <KuroshioIcon
                    className="size-5 text-ink-faint transition-colors group-hover:text-brand"
                    name={item.icon}
                    strokeWidth={1.5}
                  />
                  <span className="readout text-[0.6875rem] text-ink-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base leading-tight font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="text-[0.8125rem] leading-relaxed text-ink-dim">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Band>

      {/* -------------------------------------------------------- leadership */}
      <Band>
        <div className="shell">
          <SectionHead eyebrow="Team" index="03" title="The people on the line." />

          <ul className="mt-14 flex flex-col border-t border-hairline">
            {aboutPage.leadership.map((person) => (
              <li
                className="group grid gap-3 border-b border-hairline py-7 md:grid-cols-[5rem_18rem_minmax(0,1fr)] md:items-baseline md:gap-8"
                data-reveal="up"
                key={person.name}
              >
                <span className="readout text-sm text-ink-faint transition-colors group-hover:text-brand">
                  {initials(person.name)}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-xl leading-tight font-semibold tracking-tight text-ink">
                    {person.name}
                  </span>
                  <span className="tag-brand">{person.role}</span>
                </div>
                {person.bio ? (
                  <p className="text-[0.9375rem] leading-relaxed text-ink-dim">{person.bio}</p>
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ---------------------------------------------------------- entities */}
      <Band tone="canvas-sunk">
        <div className="shell">
          <SectionHead
            eyebrow="Structure"
            index="04"
            title="Two entities, one engineering team."
          />

          <div className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2" data-reveal="up">
            {aboutPage.entities.map((entity) => (
              <div className="flex flex-col gap-5 bg-panel p-8" key={entity.title}>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center border border-brand/40 bg-brand/8 text-brand">
                    <KuroshioIcon className="size-4" name={entity.icon} strokeWidth={1.6} />
                  </span>
                  <span className="tag">{entity.country}</span>
                </div>
                <h3 className="display-md text-ink">{entity.title}</h3>
                <dl className="flex flex-col divide-y divide-hairline border-t border-hairline">
                  {[
                    ["Role", entity.role],
                    ["Location", entity.location],
                    ["Standing", entity.credential],
                  ].map(([label, value]) => (
                    <div className="flex flex-wrap justify-between gap-3 py-3" key={label}>
                      <dt className="tag">{label}</dt>
                      <dd className="text-sm tracking-tight text-ink-dim">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
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
            Our technology crosses oceans. Your machines stay put.
          </h2>
          <p className="lede max-w-2xl" data-reveal="up" data-reveal-delay="0.08">
            Talk to the engineers who will actually be on your plant floor.
          </p>
          <div className="flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.14">
            <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
              Speak to an engineer
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <PageLink className="btn-ghost" page="platform">
              Read the architecture
            </PageLink>
          </div>
        </div>
      </section>
    </main>
  );
}
