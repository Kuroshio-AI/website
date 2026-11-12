import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { Band } from "@/components/kuroshio/Sections";
import { aboutPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";
import { gsap, prefersReducedMotion } from "@/lib/motion";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

// The third story paragraph is about the name; it sits beside the picture of the current.
const [onTheFloor, whatWeBuilt, theName, whereWeWork] = aboutPage.story.paragraphs;

export function AboutPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef, (root: HTMLElement) => {
    if (prefersReducedMotion()) return;
    // The current settles from a slight zoom as it crosses the screen.
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

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      {/* ------------------------------------------------------------- hero */}
      <section className="shell pt-14 pb-14 md:pt-[9vh]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-x-6">
          <h1 className="display-xl md:col-span-7" data-reveal="up">
            Built by engineers who know plant rooms.
          </h1>
          <p className="lede max-w-[38ch] md:col-span-5" data-reveal="up" data-reveal-delay="0.08">
            {aboutPage.hero.description}
          </p>
        </div>

        {/* ---------------------------------------------------------- name */}
        <article className="mt-14 grid bg-[#26251F] text-[#EDECE8] md:grid-cols-12" data-reveal="up">
          <div className="overflow-hidden md:col-span-7">
            <img
              alt="NASA visualisation of ocean surface currents around Japan, with the Kuroshio running north-east past the coast."
              className="aspect-[16/10] size-full object-cover md:aspect-auto md:min-h-[34rem]"
              data-drift
              src="/kuroshio/kuroshio-current.jpg"
            />
          </div>
          <div className="flex flex-col gap-6 p-6 md:col-span-5 md:p-10">
            <h2 className="display-lg">Named after a current you cannot see.</h2>
            <p className="text-[1.125rem] leading-relaxed">{theName}</p>
            <p className="mt-auto text-[1.125rem] leading-relaxed text-[#A9A79F]">
              {aboutPage.story.calloutBody}
            </p>
          </div>
        </article>
      </section>

      {/* ------------------------------------------------------------ story */}
      <Band>
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 className="display-lg lg:sticky lg:top-28 lg:self-start" data-reveal="up">
            Why we built it.
          </h2>
          <div className="flex max-w-[62ch] flex-col gap-6">
            {[onTheFloor, whatWeBuilt, whereWeWork].map((paragraph) => (
              <p className="lede" data-reveal="up" key={paragraph.slice(0, 40)}>
                {paragraph}
              </p>
            ))}
            <p className="lede font-semibold" data-reveal="up">
              {aboutPage.story.aside}
            </p>
          </div>
        </div>
      </Band>

      {/* --------------------------------------------------------- approach */}
      <Band tone="canvas-sunk">
        <div className="shell flex flex-col gap-14">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-x-6">
            <h2 className="display-lg md:col-span-7" data-reveal="up">
              Constraints we do not break.
            </h2>
            <p className="lede max-w-[38ch] md:col-span-5" data-reveal="up" data-reveal-delay="0.08">
              Five commitments we hold on every deployment. They are why plant and facilities
              managers let us on site.
            </p>
          </div>

          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.approach.map((item, index) => (
              <li
                className="flex flex-col gap-3"
                data-reveal="up"
                data-reveal-delay={(index % 3) * 0.07}
                key={item.title}
              >
                <h3 className="display-md">{item.title}</h3>
                <p className="max-w-[34ch] text-[1.0625rem] leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ------------------------------------------------------------- team */}
      <Band>
        <div className="shell flex flex-col gap-14">
          <h2 className="display-lg" data-reveal="up">
            The people on the line.
          </h2>

          <ul className="flex flex-col gap-1 bg-panel p-2 sm:p-4">
            {aboutPage.leadership.map((person, index) => (
              <li
                className="grid gap-x-8 gap-y-2 bg-canvas px-4 py-5 sm:px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-baseline"
                data-reveal="up"
                data-reveal-delay={index * 0.05}
                key={person.name}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="display-md">{person.name}</span>
                  <span className="text-base text-ink-dim">{person.role}</span>
                </div>
                <p className="text-[1.0625rem] leading-relaxed">{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* --------------------------------------------------------- entities */}
      <Band tone="canvas-sunk">
        <div className="shell flex flex-col gap-14">
          <h2 className="display-lg" data-reveal="up">
            Two entities, one engineering team.
          </h2>

          <div className="grid gap-2 md:grid-cols-2">
            {aboutPage.entities.map((entity, index) => (
              <div
                className="flex flex-col gap-6 bg-panel p-6 md:p-10"
                data-reveal="up"
                data-reveal-delay={index * 0.08}
                key={entity.title}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-base text-ink-dim">{entity.country}</span>
                  <h3 className="display-md">{entity.title}</h3>
                </div>
                <dl className="mt-auto flex flex-col gap-1">
                  {[
                    ["Role", entity.role],
                    ["Location", entity.location],
                    ["Standing", entity.credential],
                  ].map(([label, value]) => (
                    <div
                      className="grid gap-x-6 gap-y-1 bg-canvas px-4 py-3 sm:grid-cols-[7rem_minmax(0,1fr)]"
                      key={label}
                    >
                      <dt className="text-[0.9375rem] text-ink-dim">{label}</dt>
                      <dd className="text-base text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" data-reveal="up">
            {aboutPage.credentials.map(([title, detail]) => (
              <li className="flex flex-col gap-1" key={title}>
                <span className="text-[1.0625rem] font-semibold tracking-tight">{title}</span>
                <span className="text-base text-ink-dim">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* ------------------------------------------------------------ close */}
      <Band>
        <div className="shell grid gap-8 md:grid-cols-12 md:items-end md:gap-x-6">
          <h2 className="display-lg md:col-span-7" data-reveal="up">
            The people who build it are the people who install it.
          </h2>
          <div className="flex flex-col items-start gap-6 md:col-span-5" data-reveal="up" data-reveal-delay="0.08">
            <p className="lede">Talk to the engineers who will actually be on your site.</p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
                Speak to an engineer
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
              <PageLink className="btn-ghost" page="platform">
                How the platform works
              </PageLink>
            </div>
          </div>
        </div>
      </Band>
    </main>
  );
}
