import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { navItems } from "@/data/mockData";
import type { IconKey } from "@/data/mockData";
import type { PageId } from "@/data/mockData";

export interface SiteShellProps {
  readonly activePage: PageId;
  readonly children: ReactNode;
  readonly onNavigate: (page: PageId) => void;
}

const footerColumns: ReadonlyArray<{
  readonly title: string;
  readonly links: ReadonlyArray<{
    readonly icon: IconKey;
    readonly id: PageId;
    readonly label: string;
    readonly muted?: boolean;
  }>;
}> = [
  {
    title: "Product",
    links: [
      { icon: "gauge", id: "platform", label: "Platform" },
      { icon: "factory", id: "industries", label: "Industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { icon: "building", id: "about", label: "About" },
      { icon: "mail", id: "contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { icon: "shield", id: "home", label: "Privacy", muted: true },
      { icon: "book", id: "home", label: "Terms", muted: true },
    ],
  },
];

export function SiteShell({ activePage, children, onNavigate }: Readonly<SiteShellProps>) {
  return (
    <div className="min-h-screen bg-hero-navy text-on-surface">
      <header className="sticky top-0 z-50 border-b border-primary-fixed-dim/20 bg-hero-navy/95 backdrop-blur-md">
        <nav className="mx-auto flex h-[70px] max-w-[1180px] items-center justify-between px-gutter">
          <button
            className="text-base font-bold text-surface-container-lowest transition-opacity hover:opacity-90"
            onClick={() => onNavigate("home")}
            type="button"
          >
            Kuroshio <span className="text-secondary-fixed">AI</span>
          </button>

          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  className={`text-sm font-medium transition-colors hover:text-surface-container-lowest ${
                    isActive ? "text-secondary-fixed" : "text-primary-fixed-dim"
                  }`}
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <Button
            className="hidden h-10 rounded-md bg-secondary px-5 text-sm font-bold text-on-secondary hover:bg-secondary/90 sm:inline-flex"
            onClick={() => onNavigate("contact")}
            type="button"
          >
            Request a Demo
          </Button>
        </nav>

        <div className="flex gap-5 overflow-x-auto border-t border-primary-fixed-dim/15 bg-hero-navy px-gutter py-3 md:hidden">
          {navItems.map((item) => (
            <button
              className={`shrink-0 text-sm font-medium transition-colors hover:text-surface-container-lowest ${
                activePage === item.id ? "text-secondary-fixed" : "text-primary-fixed-dim"
              }`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {children}

      <footer className="border-t border-primary-fixed-dim/20 bg-hero-navy px-gutter py-16 text-on-primary-container md:px-12 md:py-20 xl:px-20">
        <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-12 md:grid-cols-[1.55fr_0.85fr_0.85fr_0.85fr] md:gap-14 xl:gap-20">
          <div className="max-w-sm">
            <button
              className="text-xl font-bold text-surface-container-lowest transition-opacity hover:opacity-90"
              onClick={() => onNavigate("home")}
              type="button"
            >
              Kuroshio <span className="text-secondary-fixed">AI</span>
            </button>
            <p className="mt-2 text-sm leading-6 text-primary-fixed-dim">
              Industrial intelligence for connected factory floors.
            </p>
            <p className="mt-5 text-sm leading-6 text-primary-fixed-dim">
              (c) 2024 Kuroshio AI. DPIIT Recognised Deep Tech Startup.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div className="min-w-0" key={column.title}>
              <h2 className="text-sm font-bold text-surface-container-lowest">{column.title}</h2>
              <div className="mt-5 flex flex-col gap-4">
                {column.links.map((item) => {
                  const isActive = !item.muted && activePage === item.id;
                  return (
                  <button
                    className={`group flex w-fit items-center gap-3 text-sm font-medium transition-colors hover:text-secondary-fixed ${
                      isActive
                        ? "text-secondary-fixed"
                        : item.muted
                          ? "text-primary-fixed-dim"
                          : "text-surface-container-highest"
                    }`}
                    key={item.label}
                    onClick={() => onNavigate(item.id)}
                    type="button"
                  >
                    <KuroshioIcon
                      className={`size-4 transition-colors group-hover:text-secondary-fixed ${
                        isActive ? "text-secondary-fixed" : "text-primary-fixed-dim"
                      }`}
                      name={item.icon}
                      strokeWidth={1.8}
                    />
                    {item.label}
                  </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
