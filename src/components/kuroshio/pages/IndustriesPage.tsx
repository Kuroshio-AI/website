import { Button } from "@/components/ui/button";
import { industriesPage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";

export interface IndustriesPageProps {
  readonly onNavigate: (page: PageId) => void;
}

export function IndustriesPage({ onNavigate }: Readonly<IndustriesPageProps>) {
  return (
    <main>
      <section className="bg-hero-navy px-gutter py-section-gap-md text-center text-surface-container-lowest">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {industriesPage.title}
          </h1>
          <p className="mx-auto mt-stack-md max-w-2xl text-lg leading-8 text-primary-fixed-dim md:text-xl">
            {industriesPage.description}
          </p>
        </div>
      </section>

      <section className="bg-surface px-gutter py-section-gap-md">
        <div className="mx-auto max-w-[1280px] space-y-section-gap-md">
          {industriesPage.sectors.map((sector, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                className={`grid grid-cols-1 items-center gap-section-gap-md lg:grid-cols-2 ${
                  reversed ? "lg:[&>div:first-child]:order-2" : ""
                }`}
                key={sector.title}
              >
                <div>
                  <h2 className="text-3xl font-bold text-primary-container md:text-4xl">{sector.title}</h2>
                  <p className="mt-stack-md text-lg leading-8 text-on-surface-variant">{sector.body}</p>
                  <div className="mt-stack-lg grid gap-stack-lg sm:grid-cols-2">
                    <div>
                      <h3 className="mb-stack-sm font-bold text-secondary">Machines Monitored</h3>
                      <ul className="list-disc space-y-2 pl-5 text-on-surface-variant">
                        {sector.machines.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-stack-sm font-bold text-secondary">Signals Monitored</h3>
                      <ul className="list-disc space-y-2 pl-5 text-on-surface-variant">
                        {sector.signals.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="h-[320px] overflow-hidden rounded-xl border border-border-cool bg-primary-container shadow-sm">
                  <img alt={sector.imageAlt} className="size-full object-cover" src={sector.image} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-container px-gutter py-section-gap-md text-center text-surface-container-lowest">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{industriesPage.cta.title}</h2>
        <Button className="mt-stack-lg h-12 rounded-lg bg-secondary px-8 text-on-secondary hover:bg-secondary/90" onClick={() => onNavigate("contact")} type="button">
          {industriesPage.cta.action}
        </Button>
      </section>
    </main>
  );
}
