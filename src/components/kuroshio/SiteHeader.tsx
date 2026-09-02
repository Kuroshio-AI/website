import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { Wordmark } from "@/components/kuroshio/Wordmark";
import { navItems } from "@/data/mockData";
import type { RouteId } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  readonly activePage: RouteId;
}

export function SiteHeader({ activePage }: Readonly<SiteHeaderProps>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          isScrolled || isMenuOpen
            ? "border-hairline bg-canvas/88 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          <PageLink aria-label="Kuroshio AI home" className="shrink-0" page="home">
            <Wordmark />
          </PageLink>

          <nav aria-label="Primary" className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <PageLink
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative px-4 py-2 text-sm font-medium tracking-tight transition-colors",
                    isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                  )}
                  key={item.id}
                  page={item.id}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-brand transition-transform duration-300 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </PageLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <PageLink className="btn-brand hidden text-[0.8125rem] sm:inline-flex" page="contact">
              Request a demo
            </PageLink>

            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center border border-hairline-strong text-ink transition-colors hover:border-brand hover:text-brand md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-[68px] bottom-0 z-40 border-t border-hairline bg-canvas/98 backdrop-blur-xl transition-[opacity,transform] duration-300 md:hidden",
          isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
        id="mobile-navigation"
        inert={!isMenuOpen ? true : undefined}
      >
        <nav aria-label="Mobile" className="shell flex flex-col pt-6">
          {navItems.map((item, index) => (
            <PageLink
              aria-current={activePage === item.id ? "page" : undefined}
              className={cn(
                "flex items-baseline justify-between border-b border-hairline py-5 transition-colors",
                activePage === item.id ? "text-brand" : "text-ink hover:text-brand"
              )}
              key={item.id}
              onClick={() => setIsMenuOpen(false)}
              page={item.id}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <span className="display-md">{item.label}</span>
              <span className="tag">{String(index + 1).padStart(2, "0")}</span>
            </PageLink>
          ))}
          <PageLink
            className="btn-brand mt-8 w-full"
            onClick={() => setIsMenuOpen(false)}
            page="contact"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Request a demo
          </PageLink>
        </nav>
      </div>
    </header>
  );
}
