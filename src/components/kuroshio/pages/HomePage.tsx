import { useRef } from "react";

import { HeroSection } from "@/components/kuroshio/home/HeroSection";
import { PilotDialog } from "@/components/kuroshio/home/HomeSections";
import { ProductPair } from "@/components/kuroshio/pages/ProductsPage";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <HeroSection />

      <section className="band bg-canvas">
        <div className="shell">
          <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end md:gap-x-6">
            <h2 className="display-lg md:col-span-7" data-reveal="up">
              What we build
            </h2>
            <p className="lede max-w-[40ch] md:col-span-5" data-reveal="up">
              Two products of our own, and custom tools for teams whose work does not fit
              anyone else's software.
            </p>
          </div>
          <ProductPair headingLevel="h3" />
        </div>
      </section>

      <PilotDialog onNavigate={onNavigate} />
    </main>
  );
}
