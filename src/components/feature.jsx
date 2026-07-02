const industries = [
  "Glass lines",
  "Plastics",
  "Aluminium",
  "Rubber",
  "Minerals",
  "Utilities",
  "HVAC",
  "Facilities",
];

const features = [
  {
    title: "EnergyIQ",
    description: "See per-machine kW, idle waste, tariff impact, and power-factor signals.",
  },
  {
    title: "Predictive maintenance",
    description: "Track motor health and bearing risk before a line stops unexpectedly.",
  },
  {
    title: "Digital logbook",
    description: "Tie every inspection, repair, and note to the machine readings that caused it.",
  },
  {
    title: "Carbon tracking",
    description: "Turn actual energy readings into auditable emissions data per asset.",
  },
];

const Feature = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col gap-36 px-4" id="platform">
      <div className="flex flex-col gap-10 text-center" id="customers">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-medium tracking-[-0.035em] text-balance">
            Built for GCC industrial teams
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground">
            For energy-intensive plants and facilities where visibility, uptime,
            and power cost matter every shift.
          </p>
        </div>
        <div className="grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
          {industries.map((industry) => (
            <div
              className="flex h-28 items-center justify-center border-b border-r border-border text-xl font-medium tracking-[-0.04em] text-foreground md:h-32 md:text-2xl"
              key={industry}
            >
              {industry}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:gap-16" id="usecases">
        <FeatureVisual className="order-1 md:hidden" />

        <div className="order-2 text-center lg:order-1">
          <h2 className="text-2xl font-medium tracking-[-0.035em] text-balance md:text-4xl">
            Kuroshio is designed for plants
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground md:mt-4 md:max-w-2xl md:text-base md:leading-7">
            Focused modules for energy, maintenance, and carbon.
          </p>
        </div>

        <div className="order-3 grid items-start gap-9 md:gap-12 lg:order-2 lg:grid-cols-[minmax(0,12.5rem)_40rem_minmax(0,12.5rem)] lg:items-center lg:gap-8">
          <div className="flex flex-col gap-9 md:gap-12 lg:gap-24">
            {features.slice(0, 2).map((feature) => (
              <FeatureCopy feature={feature} key={feature.title} />
            ))}
          </div>

          <FeatureVisual className="hidden lg:block" />

          <div className="flex flex-col gap-9 md:gap-12 lg:gap-24">
            {features.slice(2).map((feature) => (
              <FeatureCopy feature={feature} key={feature.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function FeatureVisual({ className = "" }) {
  return (
    <picture className={`feature-art-frame ${className}`.trim()}>
      <source
        media="(max-width: 767px)"
        srcSet="/images/feature/kuroshio_plant_snapshot_card_mobile.svg"
      />
      <img
        alt="Kuroshio plant snapshot preview"
        className="feature-art"
        src="/images/feature/kuroshio_plant_snapshot_card.svg"
      />
    </picture>
  );
}

function FeatureCopy({ feature }) {
  return (
    <article className="flex flex-col gap-2 md:mx-auto md:w-full md:max-w-[680px] lg:mx-0 lg:max-w-none lg:gap-4">
      <h3 className="text-base font-semibold tracking-[-0.025em] text-foreground lg:text-xl">
        {feature.title}
      </h3>
      <p className="max-w-[280px] text-[0.82rem] leading-5 text-muted-foreground text-pretty md:max-w-none md:text-sm lg:max-w-[280px] lg:text-[0.95rem] lg:leading-6">
        {feature.description}
      </p>
    </article>
  );
}

export default Feature;
