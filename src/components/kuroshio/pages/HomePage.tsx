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
  { value: "24", accent: "/7", label: "Predictive Monitoring" },
  { value: "15", accent: "ms", label: "Edge Latency" },
] as const;

interface HomeCallToActionProps {
  readonly onNavigate: (page: PageId) => void;
}

interface HeroStatsProps {
  readonly className?: string;
}

function HeroStats({ className = "" }: Readonly<HeroStatsProps>) {
  return (
    <div className={`border-y border-outline-variant/10 bg-primary-container/30 backdrop-blur-sm ${className}`}>
      <dl className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-8 px-gutter py-10 md:grid-cols-4 md:py-12">
        {heroStats.map((stat) => (
          <div
            className="flex flex-col items-center gap-2 border-outline-variant/20 px-2 text-center md:border-r md:last:border-r-0"
            key={stat.label}
          >
            <dt className="order-2 text-[0.72rem] font-medium uppercase tracking-wider text-on-primary-container">
              {stat.label}
            </dt>
            <dd className="order-1 text-3xl font-bold leading-none text-secondary-fixed md:text-4xl">
              {stat.value}
              <span>{stat.accent}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function HomeCallToAction({ onNavigate }: Readonly<HomeCallToActionProps>) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <Button
        className="h-14 w-full rounded-full bg-secondary px-8 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,107,95,0.28)] transition-all hover:bg-secondary/90 hover:shadow-[0_22px_58px_rgba(0,107,95,0.34)] sm:w-auto"
        onClick={() => onNavigate("contact")}
        size="lg"
        type="button"
      >
        {homePage.primaryAction}
        <KuroshioIcon className="size-4" name="arrowRight" strokeWidth={2.5} />
      </Button>
      <Button
        className="h-14 w-full rounded-full border-2 border-outline bg-transparent px-8 text-sm font-bold text-white transition-colors hover:bg-white/[0.06] hover:text-white sm:w-auto"
        onClick={() => onNavigate("platform")}
        size="lg"
        type="button"
        variant="outline"
      >
        {homePage.secondaryAction}
      </Button>
    </div>
  );
}

export function HomePage({ onNavigate }: Readonly<HomePageProps>) {
  return (
    <main className="relative z-10 bg-hero-navy text-on-primary">
      <section className="relative isolate flex min-h-[calc(100svh-70px)] flex-col justify-center overflow-hidden bg-hero-navy">
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

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-gutter py-20 lg:grid-cols-2 lg:pb-48 lg:pt-section-gap-md">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary-fixed md:text-sm">
              {homePage.eyebrow}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-normal text-white md:text-5xl">
              Industrial Intelligence
              <span className="block text-secondary-fixed">at Your Fingertips</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-on-primary-container md:text-lg">
              {homePage.description}
            </p>

            <HomeCallToAction onNavigate={onNavigate} />
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(130,246,227,0.08)_0%,transparent_70%)] blur-3xl" />
            <div className="relative overflow-hidden rounded-xl border border-outline-variant/20 shadow-2xl">
              <img
                alt={homePage.imageAlt}
                className="aspect-[16/9] w-full object-cover transition-transform duration-1000 hover:scale-105"
                src={homePage.image}
              />
            </div>
          </div>
        </div>

        <HeroStats className="relative z-10 hidden lg:absolute lg:inset-x-0 lg:bottom-0 lg:block lg:w-full" />
      </section>

      <HeroStats className="lg:hidden" />
    </main>
  );
}
