import { useEffect } from "react";

import type { RouteId } from "@/data/mockData";

const pageMetadata: Readonly<Record<RouteId, { readonly description: string; readonly title: string }>> = {
  home: {
    title: "Kuroshio AI | Software for industrial and inspection teams",
    description:
      "Kuroshio AI builds Kuroshio Platform for machine energy and health, KTrack for inspections and certificates, and custom internal tools for operations teams in the UAE and GCC.",
  },
  products: {
    title: "Products and services | Kuroshio AI",
    description:
      "Kuroshio Platform for machine energy and health, KTrack for inspections and certificates, and custom internal tools built around your process.",
  },
  ktrack: {
    title: "KTrack: Inspections, Certificates and Renewals | Kuroshio AI",
    description:
      "KTrack: inspection reporting, certification and expiry tracking for inspection and certification companies, with QR-verified certificates and WhatsApp alerts. Used by Kee Safety.",
  },
  platform: {
    title: "Kuroshio Platform | Kuroshio AI",
    description:
      "Explore Kuroshio AI's EnergyIQ, predictive maintenance, digital logbook, and architecture - one sensing layer for any three-phase asset, factory floor or plant room.",
  },
  industries: {
    title: "Monitoring for Factories and Buildings in the UAE & GCC | Kuroshio AI",
    description:
      "See how Kuroshio AI supports glass, plastics, aluminium and minerals plants alongside chiller plant, towers, hotels and malls across the GCC.",
  },
  about: {
    title: "About Kuroshio AI | Industrial Intelligence Company",
    description:
      "Meet the team building non-invasive industrial intelligence for factories and buildings across the UAE, GCC, and India.",
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
