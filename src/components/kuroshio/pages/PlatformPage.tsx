import {
  AnchorNav,
  ArchitectureSection,
  MachineTable,
  MetricCard,
  PlatformHero,
  ProductFeatureSection,
} from "@/components/kuroshio/PlatformSections";
import { platformPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";

export interface PlatformPageProps {
  readonly onNavigate: (page: PageId) => void;
}

export function PlatformPage({ onNavigate }: Readonly<PlatformPageProps>) {
  return (
    <main className="relative isolate bg-hero-navy text-[#eef4ff]">
      <PlatformHero onNavigate={onNavigate} />
      <AnchorNav items={platformPage.anchorNav} />

      <section className="mx-auto max-w-[1180px] scroll-mt-36 px-gutter py-20 md:scroll-mt-14 md:py-28" id="energy-iq">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-3xl font-bold text-[#eef4ff] md:text-4xl">EnergyIQ</h2>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0e9e8e]/30 bg-[#0e9e8e]/15 px-3 py-1 text-xs font-bold uppercase text-[#82f6e3]">
                <span className="size-2 rounded-full bg-[#0e9e8e]" />
                Live Data
              </span>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#b4cdf0]/70">
              Real-time energy intelligence across every production asset, from active load to avoidable idle waste.
            </p>
          </div>
          <div className="text-sm text-[#b4cdf0]/60 md:text-right">
            <div>24 OCT 2023</div>
            <div className="mt-1 text-xs uppercase">14:30:00 UTC</div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platformPage.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <MachineTable rows={platformPage.machines} />
      </section>

      <ProductFeatureSection
        description={platformPage.predictive.description}
        features={platformPage.predictive.features}
        id="predictive-maintenance"
        title={platformPage.predictive.title}
        visual="health"
      />

      <ProductFeatureSection
        description={platformPage.logbook.description}
        features={platformPage.logbook.features}
        id="digital-logbook"
        title={platformPage.logbook.title}
        visual="logbook"
      />

      <ArchitectureSection onNavigate={onNavigate} />
    </main>
  );
}
