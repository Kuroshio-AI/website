import { useCallback, useEffect, useState } from "react";

import type { PageId } from "@/data/mockData";

const pageIds: ReadonlyArray<PageId> = ["home", "platform", "industries", "about", "contact"];

function normalizePage(value: string): PageId {
  const cleanValue = value.replace(/^#\/?/, "").replace(/^\//, "").trim();
  return pageIds.includes(cleanValue as PageId) ? (cleanValue as PageId) : "home";
}

function readLocationPage(): PageId {
  if (typeof window === "undefined") {
    return "home";
  }

  if (window.location.hash) {
    return normalizePage(window.location.hash);
  }

  return normalizePage(window.location.pathname);
}

export interface UseActivePageResult {
  readonly activePage: PageId;
  readonly navigate: (page: PageId) => void;
}

export function useActivePage(): Readonly<UseActivePageResult> {
  const [activePage, setActivePage] = useState<PageId>(readLocationPage);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(readLocationPage());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((page: PageId) => {
    const nextHash = page === "home" ? "#/" : `#/${page}`;
    if (window.location.hash === nextHash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActivePage(page);
      return;
    }

    window.location.hash = nextHash;
  }, []);

  return { activePage, navigate };
}
