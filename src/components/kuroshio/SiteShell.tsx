import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { navItems } from "@/data/mockData";
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
    readonly icon: "book" | "building" | "factory" | "gauge" | "mail" | "shield";
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

interface SiteNavigationProps {
  readonly activePage: PageId;
  readonly className?: string;
  readonly linkClassName?: string;
  readonly listClassName?: string;
  readonly onNavigate: (page: PageId) => void;
}

const navLinkClassName =
  "h-9 rounded-md px-3.5 py-2 text-sm font-medium text-primary-fixed-dim hover:bg-surface-container-lowest/10 hover:text-surface-container-lowest focus:bg-surface-container-lowest/10 focus:text-surface-container-lowest";

function SiteNavigation({
  activePage,
  className,
  linkClassName,
  listClassName,
  onNavigate,
}: Readonly<SiteNavigationProps>) {
  return (
    <NavigationMenu className={cn("max-w-none flex-none justify-start", className)} viewport={false}>
      <NavigationMenuList className={cn("justify-start gap-1", listClassName)}>
        {navItems.map((item) => {
          const isActive = activePage === item.id;

          return (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                aria-current={isActive ? "page" : undefined}
                asChild
                className={cn(
                  navLinkClassName,
                  isActive && "bg-secondary-fixed/15 text-secondary-fixed",
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
        </nav>

        <div className="overflow-x-auto border-t border-primary-fixed-dim/15 bg-hero-navy px-gutter py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
          <SiteNavigation
            activePage={activePage}
            className="w-max"
            linkClassName="shrink-0"
            listClassName="min-w-max flex-none"
            onNavigate={onNavigate}
          />
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
