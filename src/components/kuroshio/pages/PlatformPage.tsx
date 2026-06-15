import { Button } from "@/components/ui/button";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { PageHero } from "@/components/kuroshio/PageHero";
import {
  AnchorNav,
  ArchitectureSection,
  MachineTable,
  MetricCard,
  ProductFeatureSection,
} from "@/components/kuroshio/PlatformSections";
import { platformPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";

export interface PlatformPageProps {
  readonly onNavigate: (page: PageId) => void;
}

export function PlatformPage({ onNavigate }: Readonly<PlatformPageProps>) {
  return (
    <main>
      <PageHero
        action={platformPage.hero.action}
        description={platformPage.hero.description}
        image={platformPage.hero.image}
        imageAlt="Dark industrial analytics dashboard composition."
        onAction={() => document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" })}
        title={platformPage.hero.title}
      />
      <AnchorNav items={platformPage.anchorNav} />

      <section className="mx-auto max-w-[1280px] scroll-mt-40 px-gutter py-section-gap-md" id="energy-iq">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-3xl font-bold text-on-surface md:text-4xl">EnergyIQ</h2>
              <span className="inline-flex items-center gap-2 rounded bg-primary-fixed px-3 py-1 text-xs font-bold uppercase text-primary">
                <span className="size-2 rounded-full bg-primary" />
                Live Data
              </span>
            </div>
            <p className="text-base leading-6 text-on-surface-variant">
              Today's plant-level energy consumption and operational efficiency.
            </p>
          </div>
          <div className="text-sm text-on-surface-variant md:text-right">
            <div>24 OCT 2023</div>
            <div className="mt-1 text-xs uppercase">14:30:00 UTC</div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <section className="mx-auto max-w-[1280px] px-gutter pb-section-gap-md">
        <div className="rounded-xl border border-border-cool bg-surface-teal p-6 text-primary shadow-sm">
          <div className="flex flex-col gap-stack-md md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <KuroshioIcon className="mt-1 size-6 text-secondary" name="leaf" />
              <div>
                <h2 className="text-2xl font-bold">Carbon & Sustainability</h2>
                <p className="mt-2 max-w-3xl text-base leading-7 text-on-secondary-fixed-variant">
                  Convert machine energy behavior into operational evidence for waste reduction, compliance reporting,
                  and facility-level carbon accounting.
                </p>
              </div>
            </div>
            <Button className="h-11 rounded-lg bg-secondary px-5 text-on-secondary hover:bg-secondary/90" onClick={() => onNavigate("contact")} type="button">
              Discuss Reporting
            </Button>
          </div>
        </div>
      </section>

      <ArchitectureSection onNavigate={onNavigate} />
    </main>
  );
}
