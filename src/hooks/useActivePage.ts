import { useCallback, useEffect, useState } from "react";

import type { PageId, RouteId } from "@/data/mockData";
import { getScrollBehavior } from "@/lib/utils";

const pageIds: ReadonlyArray<PageId> = ["home", "platform", "industries", "about", "contact"];

function normalizePage(value: string): RouteId {
  const cleanValue = value.replace(/^#\/?/, "").replace(/^\//, "").trim();
  if (cleanValue === "") {
    return "home";
  }
  return pageIds.includes(cleanValue as PageId) ? (cleanValue as PageId) : "notFound";
}

function readLocationPage(): RouteId {
  if (typeof window === "undefined") {
    return "home";
  }

  if (window.location.hash) {
    return normalizePage(window.location.hash);
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
    const handleHashChange = () => {
      setActivePage(readLocationPage());
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((page: PageId) => {
    const nextHash = page === "home" ? "#/" : `#/${page}`;
    if (window.location.hash === nextHash) {
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
      setActivePage(page);
      return;
    }

    window.location.hash = nextHash;
  }, []);

  return { activePage, navigate };
}
