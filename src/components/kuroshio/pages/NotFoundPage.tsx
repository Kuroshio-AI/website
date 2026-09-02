import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { navItems } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

export function NotFoundPage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  const requested =
    typeof window === "undefined"
      ? ""
      : window.location.hash.replace(/^#\/?/, "") || window.location.pathname.replace(/^\//, "");

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <section className="relative overflow-hidden border-b border-hairline">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="grid-field absolute inset-0 opacity-45" />
          <div className="vignette absolute inset-0" />
        </div>

        <div className="shell relative flex min-h-[62svh] flex-col justify-center py-24 md:py-32">
          <div className="flex items-center gap-4" data-reveal="fade">
            <span className="tag-brand">Error 404</span>
            <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
            <span className="tag">No signal at this address</span>
          </div>

          <h1 className="display-xl mt-7 max-w-[16ch]" data-reveal="up">
            That page isn&apos;t <span className="text-brand">on the network.</span>
          </h1>

          {requested ? (
            <p className="readout mt-7 text-sm text-ink-faint" data-reveal="up">
              Requested: /{requested}
            </p>
          ) : null}

          <p className="lede mt-4 max-w-xl" data-reveal="up" data-reveal-delay="0.06">
            The link may be out of date, or we may have moved the page. Everything
            on the site is one click away below.
          </p>

          <nav aria-label="Site sections" className="mt-10" data-reveal="up" data-reveal-delay="0.1">
            <ul className="flex flex-wrap gap-px border border-hairline bg-hairline">
              <li className="min-w-[11rem] flex-1 bg-panel">
                <PageLink
                  className="flex items-baseline justify-between gap-3 px-5 py-4 transition-colors hover:bg-brand-soft"
                  page="home"
                >
                  <span className="text-sm font-medium tracking-tight text-ink">Home</span>
                  <span className="tag">00</span>
                </PageLink>
              </li>
              {navItems.map((item, index) => (
                <li className="min-w-[11rem] flex-1 bg-panel" key={item.id}>
                  <PageLink
                    className="flex items-baseline justify-between gap-3 px-5 py-4 transition-colors hover:bg-brand-soft"
                    page={item.id}
                  >
                    <span className="text-sm font-medium tracking-tight text-ink">{item.label}</span>
                    <span className="tag">{String(index + 1).padStart(2, "0")}</span>
                  </PageLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.14">
            <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
              Request a demo
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <a className="btn-ghost" href="mailto:info@kuroshioai.com">
              Tell us what you were looking for
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
