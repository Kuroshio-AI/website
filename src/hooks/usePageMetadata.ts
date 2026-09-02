import { useEffect } from "react";

import type { RouteId } from "@/data/mockData";

const pageMetadata: Readonly<Record<RouteId, { readonly description: string; readonly title: string }>> = {
  home: {
    title: "Kuroshio AI | Industrial Intelligence for UAE Manufacturing",
    description:
      "Kuroshio AI helps UAE and GCC manufacturers monitor energy, predict equipment failures, digitise maintenance, and track carbon emissions.",
  },
  platform: {
    title: "Industrial Intelligence Platform | Kuroshio AI",
    description:
      "Explore Kuroshio AI's EnergyIQ, predictive maintenance, digital logbook, and industrial architecture for connected factory operations.",
  },
  industries: {
    title: "Industrial Monitoring for UAE & GCC Manufacturers | Kuroshio AI",
    description:
      "See how Kuroshio AI supports glass, plastics, aluminium, recycling, minerals, buildings, and utility operations across the GCC.",
  },
  about: {
    title: "About Kuroshio AI | Industrial Intelligence Company",
    description:
      "Meet the team building non-invasive industrial intelligence for manufacturers across the UAE, GCC, and India.",
  },
  contact: {
    title: "Request an Industrial Intelligence Demo | Kuroshio AI",
    description:
      "Request a Kuroshio AI demo or contact our UAE and India teams about energy monitoring, predictive maintenance, and digital logbooks.",
  },
  notFound: {
    title: "Page not found | Kuroshio AI",
    description:
      "That Kuroshio AI page could not be found. Browse the platform, industries, about, and contact pages instead.",
  },
};

export function usePageMetadata(page: RouteId) {
  useEffect(() => {
    const metadata = pageMetadata[page];
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');

    document.title = metadata.title;
    description?.setAttribute("content", metadata.description);
    openGraphTitle?.setAttribute("content", metadata.title);
    openGraphDescription?.setAttribute("content", metadata.description);
  }, [page]);
}
