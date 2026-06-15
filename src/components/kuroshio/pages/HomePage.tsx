import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import ShapeGrid from "@/components/ShapeGrid";
import { Button } from "@/components/ui/button";
import { homePage } from "@/data/mockData";
import type { PageId } from "@/data/mockData";

export interface HomePageProps {
  readonly onNavigate: (page: PageId) => void;
}

const heroStats = [
  { value: "99", accent: ".9%", label: "Platform Uptime" },
  { value: "40", accent: "%", label: "Energy Cost Reduction" },
  { value: "3", accent: "x", label: "Faster Failure Detection" },
  { value: "500", accent: "+", label: "Industrial Deployments" },
] as const;

interface HomeCallToActionProps {
  readonly onNavigate: (page: PageId) => void;
}

function HomeCallToAction({ onNavigate }: Readonly<HomeCallToActionProps>) {
  return (
    <section aria-label="Homepage call to action" className="mx-auto mt-6 max-w-5xl md:mt-8">
      <div className="space-y-4 text-center">
        <h2 className="text-balance text-xl font-semibold leading-tight text-[#eef4ff] md:text-2xl">
          Start with one machine. Scale across the floor.
        </h2>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            className="h-11 w-full rounded-md bg-secondary px-8 text-sm font-bold text-on-secondary hover:bg-secondary/90 sm:w-auto"
            onClick={() => onNavigate("contact")}
            size="lg"
            type="button"
          >
            {homePage.primaryAction}
          </Button>
          <Button
            className="h-11 w-full rounded-md border-primary-fixed-dim/15 bg-transparent px-8 text-sm font-medium text-primary-fixed-dim hover:bg-primary-fixed-dim/10 hover:text-surface-container-lowest sm:w-auto"
            onClick={() => onNavigate("platform")}
            size="lg"
            type="button"
            variant="outline"
          >
            {homePage.secondaryAction}
            <KuroshioIcon className="ml-1 size-4" name="arrowRight" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ onNavigate }: Readonly<HomePageProps>) {
  return (
    <main className="bg-hero-navy text-surface-container-lowest">
      <section className="relative isolate flex min-h-[calc(100svh-118px)] overflow-hidden md:h-[calc(100svh-131px)] md:min-h-0">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-45">
          <ShapeGrid
            borderColor="rgba(172, 199, 255, 0.16)"
            direction="diagonal"
            hoverFillColor="rgba(100, 217, 200, 0)"
            hoverTrailAmount={0}
            shape="square"
            speed={0.12}
            squareSize={64}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-primary-fixed-dim/15" />

        <div className="relative z-10 flex w-full flex-col">
          <div className="mx-auto flex w-full max-w-[1180px] flex-1 items-center justify-center px-gutter py-4 text-center md:py-14">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-balance text-[clamp(2.75rem,4.4vw,4.35rem)] font-bold leading-[1.05] tracking-normal text-[#eef4ff]">
                <span className="block md:whitespace-nowrap">Industrial Intelligence</span>
                <span className="mt-3 block text-secondary-fixed-dim">at Your Fingertips</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-6 text-primary-fixed-dim md:mt-8 md:text-lg md:leading-8">
                {homePage.description}
              </p>

              <HomeCallToAction onNavigate={onNavigate} />
            </div>
          </div>

          <dl className="grid w-full grid-cols-2 border-y border-primary-fixed-dim/15 bg-primary-container/20 backdrop-blur-sm lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div
                className="flex min-h-16 flex-col items-center justify-center border-primary-fixed-dim/15 px-3 py-2 text-center even:border-l nth-[n+3]:border-t md:min-h-28 md:px-6 md:py-7 lg:border-l lg:nth-[n+3]:border-t-0 first:lg:border-l-0"
                key={stat.label}
              >
                <dt className="order-2 mt-1 text-[0.62rem] font-medium tracking-[0.06em] text-primary-fixed-dim/70 md:text-xs">{stat.label}</dt>
                <dd className="order-1 text-xl font-bold leading-none text-[#eef4ff] md:text-4xl">
                  {stat.value}
                  <span className="text-secondary-fixed-dim">{stat.accent}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
