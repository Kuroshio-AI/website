import { useCallback, useEffect, useState } from "react";

import type { PageId, RouteId } from "@/data/mockData";
import { scrollToSection, scrollToTop } from "@/lib/smoothScroll";

const pageIds: ReadonlyArray<PageId> = ["home", "platform", "industries", "about", "contact"];

function normalizePage(value: string): RouteId {
  const cleanValue = value.replace(/^#\/?/, "").replace(/^\//, "").trim();
  if (cleanValue === "") {
    return "home";
  }
  // Pages may carry a sub-segment the page itself owns, e.g.
  // `#/industries/buildings`. The route is always the first segment.
  const route = cleanValue.split("/")[0];
  return pageIds.includes(route as PageId) ? (route as PageId) : "notFound";
}

function readLocationPage(): RouteId {
  if (typeof window === "undefined") {
    return "home";
  }

  if (window.location.hash.startsWith("#/")) {
    return normalizePage(window.location.hash.split("#")[1]);
  }

  return normalizePage(window.location.pathname);
}

export interface UseActivePageResult {
  readonly activePage: RouteId;
  readonly navigate: (page: PageId) => void;
}

export function useActivePage(): Readonly<UseActivePageResult> {
  const [activePage, setActivePage] = useState<RouteId>(readLocationPage);

  useEffect(() => {
    let frame = 0;
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && !hash.startsWith("#/")) {
        // Keep the page in section URLs so refresh and Back restore both.
        const route = activePage === "home" ? "" : activePage;
        window.history.replaceState(window.history.state, "", `#/${route}${hash}`);
      }
      setActivePage(readLocationPage());
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const section = window.location.hash.split("#")[2];
        if (section) scrollToSection(document.getElementById(section));
        else scrollToTop();
      });
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [activePage]);

  const navigate = useCallback((page: PageId) => {
    const nextHash = page === "home" ? "#/" : `#/${page}`;
    if (window.location.hash === nextHash) {
      scrollToTop();
      setActivePage(page);
      return;
    }

    window.location.hash = nextHash;
  }, []);

  return { activePage, navigate };
}
