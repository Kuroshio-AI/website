import type { ReactNode } from "react";

import { SiteFooter } from "@/components/kuroshio/SiteFooter";
import { SiteHeader } from "@/components/kuroshio/SiteHeader";
import type { RouteId } from "@/data/mockData";

export interface SiteShellProps {
  readonly activePage: RouteId;
  readonly children: ReactNode;
}

export function SiteShell({ activePage, children }: Readonly<SiteShellProps>) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader activePage={activePage} />
      <div id="main">{children}</div>
      <SiteFooter activePage={activePage} />
    </div>
  );
}
