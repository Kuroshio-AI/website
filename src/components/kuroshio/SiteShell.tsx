import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { contactPage, navItems } from "@/data/mockData";
import type { PageId } from "@/data/mockData";
import { cn } from "@/lib/utils";

export interface SiteShellProps {
  readonly activePage: PageId;
  readonly children: ReactNode;
  readonly onNavigate: (page: PageId) => void;
}

const footerColumns: ReadonlyArray<{
  readonly title: string;
  readonly links: ReadonlyArray<{
    readonly icon: "book" | "building" | "factory" | "gauge" | "leaf" | "mail" | "settings" | "shield" | "zap";
    readonly id: PageId;
    readonly label: string;
  }>;
}> = [
  {
    title: "Platform",
    links: [
      { icon: "zap", id: "platform", label: "EnergyIQ" },
      { icon: "settings", id: "platform", label: "Predictive Maintenance" },
      { icon: "book", id: "platform", label: "Digital Logbook" },
      { icon: "leaf", id: "platform", label: "Carbon Tracking" },
    ],
  },
  {
    title: "Industries",
    links: [
      { icon: "factory", id: "industries", label: "Glass Processing" },
      { icon: "factory", id: "industries", label: "Plastics" },
      { icon: "factory", id: "industries", label: "Aluminium Extrusion" },
      { icon: "factory", id: "industries", label: "Rubber Recycling" },
      { icon: "factory", id: "industries", label: "Minerals Processing" },
      { icon: "building", id: "industries", label: "Building & Utilities" },
    ],
  },
  {
    title: "Company",
    links: [
      { icon: "building", id: "about", label: "About" },
      { icon: "mail", id: "contact", label: "Contact" },
      { icon: "shield", id: "about", label: "DPIIT Recognised" },
    ],
  },
];

interface SiteNavigationProps {
  readonly activePage: PageId;
  readonly className?: string;
  readonly linkClassName?: string;
  readonly listClassName?: string;
  readonly onNavigate: (page: PageId) => void;
}

const navLinkClassName =
  "h-11 rounded-lg border border-white/[0.08] bg-white/[0.035] px-5 text-[0.95rem] font-semibold text-primary-fixed-dim transition-[background-color,border-color,box-shadow,color,transform] duration-150 ease-out hover:-translate-y-px hover:border-secondary-fixed/30 hover:bg-white/[0.08] hover:text-surface-container-lowest hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)] focus:border-secondary-fixed/35 focus:bg-white/[0.08] focus:text-surface-container-lowest";

function SiteNavigation({
  activePage,
  className,
  linkClassName,
  listClassName,
  onNavigate,
}: Readonly<SiteNavigationProps>) {
  return (
    <NavigationMenu className={cn("max-w-none flex-none justify-start", className)} viewport={false}>
      <NavigationMenuList className={cn("justify-start gap-2", listClassName)}>
        {navItems.map((item) => {
          const isActive = activePage === item.id;

          return (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                aria-current={isActive ? "page" : undefined}
                asChild
                className={cn(
                  navLinkClassName,
                  isActive && "border-secondary-fixed/40 bg-secondary-fixed/15 text-secondary-fixed shadow-[0_10px_28px_rgba(100,217,200,0.1)]",
                  linkClassName
                )}
              >
                <button onClick={() => onNavigate(item.id)} type="button">
                  {item.label}
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function SiteShell({ activePage, children, onNavigate }: Readonly<SiteShellProps>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigate = (page: PageId) => {
    setIsMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <div className="min-h-screen bg-hero-navy text-on-surface">
      <header className="sticky top-0 z-50 border-b border-primary-fixed-dim/20 bg-hero-navy/95 backdrop-blur-md">
        <nav className="mx-auto flex h-[70px] max-w-[1180px] items-center justify-between px-gutter">
          <button
            className="text-xl font-bold text-surface-container-lowest transition-opacity hover:opacity-90 md:text-2xl"
            onClick={() => onNavigate("home")}
            type="button"
          >
            Kuroshio <span className="text-secondary-fixed">AI</span>
          </button>

          <SiteNavigation activePage={activePage} className="hidden md:flex" onNavigate={onNavigate} />

          <Button
            className="hidden h-10 rounded-md bg-secondary px-5 text-sm font-bold text-on-secondary hover:bg-secondary/90 sm:inline-flex"
            onClick={() => onNavigate("contact")}
            type="button"
          >
            Request a Demo
          </Button>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-surface-container-lowest transition-[background-color,border-color,color,transform] duration-150 ease-out hover:border-secondary-fixed/35 hover:bg-white/[0.09] hover:text-secondary-fixed active:scale-95 md:hidden"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            {isMobileMenuOpen ? <X className="size-5" strokeWidth={2.2} /> : <Menu className="size-5" strokeWidth={2.2} />}
          </button>
        </nav>

        <div
          aria-hidden={!isMobileMenuOpen}
          className={cn(
            "grid border-t border-primary-fixed-dim/15 bg-hero-navy shadow-[0_22px_44px_rgba(0,0,0,0.24)] transition-[grid-template-rows,opacity,transform] duration-300 ease-out md:hidden",
            isMobileMenuOpen
              ? "grid-rows-[1fr] opacity-100 translate-y-0"
              : "pointer-events-none grid-rows-[0fr] -translate-y-2 opacity-0"
          )}
          id="mobile-navigation"
          inert={!isMobileMenuOpen ? true : undefined}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2 px-gutter py-4">
              {navItems.map((item) => {
                const isActive = activePage === item.id;

                return (
                  <button
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-left text-base font-semibold text-primary-fixed-dim transition-[background-color,border-color,color] duration-150 ease-out hover:border-secondary-fixed/35 hover:bg-white/[0.08] hover:text-surface-container-lowest",
                      isActive && "border-secondary-fixed/40 bg-secondary-fixed/15 text-secondary-fixed"
                    )}
                    key={item.id}
                    onClick={() => handleMobileNavigate(item.id)}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    type="button"
                  >
                    {item.label}
                    <KuroshioIcon className="size-4" name="arrowRight" strokeWidth={2.1} />
                  </button>
                );
              })}

              <Button
                className="mt-2 h-12 rounded-xl bg-secondary px-5 text-sm font-bold text-on-secondary hover:bg-secondary/90"
                onClick={() => handleMobileNavigate("contact")}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                type="button"
              >
                Request a Demo
                <KuroshioIcon className="size-4" name="arrowRight" strokeWidth={2.2} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-primary-fixed-dim/20 bg-hero-navy px-gutter py-16 text-on-primary-container md:px-12 md:py-20 xl:px-20">
        <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_1.05fr_0.9fr_1.25fr] md:gap-12 xl:gap-16">
          <div className="max-w-sm">
            <button
              className="text-xl font-bold text-surface-container-lowest transition-opacity hover:opacity-90"
              onClick={() => onNavigate("home")}
              type="button"
            >
              Kuroshio <span className="text-secondary-fixed">AI</span>
            </button>
            <p className="mt-2 text-sm leading-6 text-primary-fixed-dim">
              Industrial intelligence for connected factory floors across the UAE and GCC.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-secondary-fixed/25 bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary-fixed">
              <KuroshioIcon className="size-4" name="shield" strokeWidth={1.8} />
              DPIIT Recognised Deep Tech Startup
            </div>
          </div>

          {footerColumns.map((column) => (
            <div className="min-w-0" key={column.title}>
              <h2 className="text-sm font-bold text-surface-container-lowest">{column.title}</h2>
              <div className="mt-5 flex flex-col gap-4">
                {column.links.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      className={`group flex w-fit items-center gap-3 text-sm font-medium transition-colors hover:text-secondary-fixed ${
                        isActive ? "text-secondary-fixed" : "text-surface-container-highest"
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

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-surface-container-lowest">Contact</h2>
            <div className="mt-5 flex flex-col gap-5">
              {contactPage.offices.map((office) => (
                <div key={office.city}>
                  <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-secondary-fixed">
                    {office.city}
                  </p>
                  <p className="text-sm leading-6 text-primary-fixed-dim">
                    {office.address.map((line) => (
                      <span className="block" key={line}>
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
              <div>
                <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-secondary-fixed">Email</p>
                <div className="flex flex-col gap-2">
                  {contactPage.direct.map((item) => (
                    <a className="text-sm font-medium text-surface-container-highest transition-colors hover:text-secondary-fixed" href={`mailto:${item.value}`} key={item.value}>
                      {item.value}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 flex w-full max-w-[1680px] flex-col gap-3 border-t border-primary-fixed-dim/15 pt-6 text-xs text-primary-fixed-dim md:flex-row md:items-center md:justify-between">
          <span>&copy; 2026 Kuroshio AI. All rights reserved.</span>
          <span>Industrial Intelligence for the UAE & GCC</span>
        </div>
      </footer>
    </div>
  );
}
