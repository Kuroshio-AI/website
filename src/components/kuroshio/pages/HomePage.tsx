import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import ShapeGrid from "@/components/ShapeGrid";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { homePage } from "@/data/mockData";
import type { IconKey, PageId } from "@/data/mockData";

export interface HomePageProps {
  readonly onNavigate: (page: PageId) => void;
}

interface HomeCallToActionProps {
  readonly onNavigate: (page: PageId) => void;
}

interface SectionHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "center" | "left";
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: Readonly<SectionHeaderProps>) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "mx-auto mb-12 max-w-3xl text-center md:mb-16" : "mb-10 max-w-3xl md:mb-14"}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-fixed">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold leading-[1.12] text-white [text-wrap:balance] md:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-7 text-[#b4cdf0]/68 [text-wrap:pretty] md:text-lg ${
            isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function HomeCallToAction({ onNavigate }: Readonly<HomeCallToActionProps>) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <Button
        className="h-14 w-full rounded-full bg-secondary px-8 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,107,95,0.28)] transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-secondary/90 hover:shadow-[0_22px_58px_rgba(0,107,95,0.34)] active:scale-[0.98] sm:w-auto"
        onClick={() => onNavigate("contact")}
        size="lg"
        type="button"
      >
        {homePage.primaryAction}
        <KuroshioIcon className="size-4" name="arrowRight" strokeWidth={2.5} />
      </Button>
      <Button
        className="h-14 w-full rounded-full border-2 border-outline bg-transparent px-8 text-sm font-bold text-white transition-[background-color,border-color,transform] duration-150 ease-out hover:border-secondary-fixed/70 hover:bg-white/[0.06] hover:text-white active:scale-[0.98] sm:w-auto"
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

function ProblemCard({ item }: Readonly<{ item: (typeof homePage.problems)[number] }>) {
  return (
    <article className="rounded-xl border border-white/[0.08] bg-[#112648]/75 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.18)] transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-[#0e9e8e]/38 hover:bg-[#162f58]/80 hover:shadow-[0_26px_70px_rgba(0,0,0,0.28)]">
      <div className="mb-5 flex size-12 items-center justify-center rounded-lg border border-[#0e9e8e]/30 bg-[#0e9e8e]/12 text-[#82f6e3]">
        <KuroshioIcon className="size-5" name={item.icon as IconKey} strokeWidth={1.9} />
      </div>
      <h3 className="text-lg font-bold text-white [text-wrap:balance]">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#b4cdf0]/68 [text-wrap:pretty]">{item.body}</p>
    </article>
  );
}

function ProductCard({
  item,
  onNavigate,
}: Readonly<{ item: (typeof homePage.products)[number]; onNavigate: (page: PageId) => void }>) {
  return (
    <article className="flex min-h-full flex-col rounded-xl border border-white/[0.08] bg-[#112648]/70 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.18)] transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-[#0e9e8e]/40 hover:bg-[#162f58]/82 hover:shadow-[0_26px_70px_rgba(0,0,0,0.28)]">
      <div className="mb-5 flex size-12 items-center justify-center rounded-lg border border-[#0e9e8e]/30 bg-[#0e9e8e]/12 text-[#82f6e3]">
        <KuroshioIcon className="size-5" name={item.icon as IconKey} strokeWidth={1.9} />
      </div>
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#82f6e3]">{item.tag}</p>
      <h3 className="mt-2 text-xl font-bold leading-tight text-white [text-wrap:balance]">{item.title}</h3>
      <ul className="mt-5 flex flex-1 flex-col gap-3">
        {item.bullets.map((bullet) => (
          <li className="flex items-start gap-3 text-sm leading-6 text-[#b4cdf0]/70 [text-wrap:pretty]" key={bullet}>
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0e9e8e]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <button
        className="mt-6 inline-flex min-h-10 w-fit items-center gap-2 rounded-md text-sm font-bold text-[#82f6e3] transition-[color,gap,transform] duration-150 ease-out hover:gap-3 hover:text-white active:scale-[0.98]"
        onClick={() => onNavigate("platform")}
        type="button"
      >
        Learn More
        <KuroshioIcon className="size-4" name="arrowRight" strokeWidth={2.2} />
      </button>
    </article>
  );
}

function ProcessStep({ item, index }: Readonly<{ item: (typeof homePage.process)[number]; index: number }>) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="relative flex min-h-[220px] flex-col rounded-xl border border-white/[0.08] bg-[#112648]/68 p-6 text-left shadow-[0_16px_42px_rgba(0,0,0,0.16)] transition-[border-color,background-color,box-shadow] duration-200 ease-out hover:border-[#0e9e8e]/34 hover:bg-[#162f58]/76 hover:shadow-[0_20px_54px_rgba(0,0,0,0.22)]">
      <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-[#0e9e8e]/24 bg-[#0e9e8e]/10 px-3 py-1.5 text-[#82f6e3]">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#82f6e3]/70">Step</span>
        <span className="text-sm font-bold leading-none [font-variant-numeric:tabular-nums]">{stepNumber}</span>
      </div>
      <h3 className="text-base font-bold leading-tight text-white [text-wrap:balance]">{item.title}</h3>
      <p className="mt-4 text-sm leading-6 text-[#b4cdf0]/68 [text-wrap:pretty]">{item.body}</p>
    </article>
  );
}

function IndustryTile({
  item,
  onNavigate,
}: Readonly<{ item: (typeof homePage.industries)[number]; onNavigate: (page: PageId) => void }>) {
  return (
    <button
      className="group flex min-h-36 items-start gap-4 rounded-xl border border-white/[0.08] bg-[#112648]/66 p-5 text-left shadow-[0_18px_45px_rgba(0,0,0,0.16)] transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-[#0e9e8e]/36 hover:bg-[#162f58]/82 hover:shadow-[0_24px_62px_rgba(0,0,0,0.24)] active:scale-[0.99]"
      onClick={() => onNavigate("industries")}
      type="button"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#0e9e8e]/26 bg-[#0e9e8e]/12 text-[#82f6e3] transition-[background-color,border-color] duration-150 ease-out group-hover:border-[#0e9e8e]/55 group-hover:bg-[#0e9e8e]/18">
        <KuroshioIcon className="size-5" name={item.icon as IconKey} strokeWidth={1.9} />
      </span>
      <span>
        <span className="block text-base font-bold text-white [text-wrap:balance]">{item.title}</span>
        <span className="mt-2 block text-sm leading-6 text-[#b4cdf0]/66 [text-wrap:pretty]">{item.body}</span>
      </span>
    </button>
  );
}

function NumberBlock({ item }: Readonly<{ item: (typeof homePage.numbers)[number] }>) {
  return (
    <article className="rounded-xl border border-white/[0.08] bg-[#112648]/68 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
      <div className="mb-6 flex items-center justify-between">
        <KuroshioIcon className="size-5 text-[#82f6e3]" name={item.icon as IconKey} strokeWidth={1.9} />
        <span className="h-px flex-1 bg-[#0e9e8e]/18 ml-4" />
      </div>
      <div className="text-5xl font-bold leading-none text-[#82f6e3] [font-variant-numeric:tabular-nums]">
        {item.value}
      </div>
      <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#b4cdf0]/66 [text-wrap:pretty]">{item.body}</p>
    </article>
  );
}

export function HomePage({ onNavigate }: Readonly<HomePageProps>) {
  return (
    <main className="relative z-10 bg-[#07182d] text-on-primary">
      <section className="relative isolate flex min-h-[calc(92svh-70px)] flex-col justify-center overflow-hidden bg-hero-navy">
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
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(17,38,72,0.08)_0%,rgba(17,38,72,0.84)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-primary-fixed-dim/15" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-gutter py-20 lg:grid-cols-2 lg:py-24">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary-fixed md:text-sm">
              <span className="h-px w-8 bg-secondary" />
              {homePage.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-normal text-white [text-wrap:balance] md:text-5xl lg:text-6xl">
              Industrial Intelligence for
              <span className="block text-secondary-fixed">UAE Manufacturing</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-on-primary-container [text-wrap:pretty] md:text-lg">
              {homePage.description}
            </p>

            <HomeCallToAction onNavigate={onNavigate} />
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-outline-variant/20 shadow-2xl ring-1 ring-white/10">
              <img
                alt={homePage.imageAlt}
                className="aspect-[16/9] w-full object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-700 ease-out hover:scale-[1.025]"
                src={homePage.image}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(14,158,142,0.16),transparent_44%,rgba(7,24,45,0.28))]" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07182d] px-gutter py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <SectionHeader eyebrow="The Problem" title="What Is Happening in Your Plant Right Now" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homePage.problems.map((item) => (
              <ProblemCard item={item} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#112648] px-gutter py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.08]" />
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <SectionHeader
            description="Everything you need to monitor, predict, document, and decarbonise in a single dashboard."
            eyebrow="The Platform"
            title="One Platform. Four Capabilities."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homePage.products.map((item) => (
              <ProductCard item={item} key={item.tag} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07182d] px-gutter py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <SectionHeader
            description="No IT integration, no network changes, no system downtime. We bring everything."
            eyebrow="Installation"
            title="Simple. Non-Invasive. Live in Hours."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-5 xl:gap-6">
            {homePage.process.map((item, index) => (
              <ProcessStep index={index} item={item} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#112648] px-gutter py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <SectionHeader
            description="Deployed across industrial sectors with different energy profiles, maintenance patterns, and compliance needs."
            eyebrow="Industries"
            title="Built for UAE and GCC Manufacturing"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homePage.industries.map((item) => (
              <IndustryTile item={item} key={item.title} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07182d] px-gutter py-20 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader eyebrow="By the Numbers" title="Where We Operate" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {homePage.numbers.map((item) => (
              <NumberBlock item={item} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#112648] px-gutter py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] rounded-xl bg-[#07182d] px-6 py-12 text-center md:px-12 md:py-14">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white [text-wrap:balance] md:text-4xl">
            {homePage.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#b4cdf0]/72 [text-wrap:pretty] md:text-lg">
            {homePage.cta.body}
          </p>
          <ShimmerButton
            background="var(--secondary)"
            borderRadius="999px"
            className="mx-auto mt-8 h-12 px-7 text-sm font-bold text-on-secondary shadow-[0_16px_38px_rgba(0,107,95,0.2)] transition-[box-shadow,filter] duration-150 ease-out hover:brightness-110 hover:shadow-[0_18px_46px_rgba(0,107,95,0.3)]"
            onClick={() => onNavigate("contact")}
            shimmerColor="#ffffff"
            shimmerDuration="2.1s"
            shimmerSize="4px"
            shimmerSpread="140deg"
            type="button"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {homePage.cta.action}
              <KuroshioIcon className="size-4" name="arrowRight" strokeWidth={2.3} />
            </span>
          </ShimmerButton>
          <p className="mx-auto mt-5 max-w-xl text-xs font-semibold uppercase tracking-[0.12em] text-[#b4cdf0]/58">
            {homePage.cta.badge}
          </p>
        </div>
      </section>
    </main>
  );
}
