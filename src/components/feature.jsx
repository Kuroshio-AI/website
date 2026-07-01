import { Activity, BookOpen, Factory, Gauge, Leaf, Radio } from "lucide-react";

const customers = [
  "Glass",
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
    icon: Activity,
  },
  {
    title: "Predictive maintenance",
    description: "Track motor health and bearing risk before a line stops unexpectedly.",
    icon: Gauge,
  },
  {
    title: "Digital logbook",
    description: "Tie every inspection, repair, and note to the machine readings that caused it.",
    icon: BookOpen,
  },
  {
    title: "Carbon tracking",
    description: "Turn actual energy readings into auditable emissions data per asset.",
    icon: Leaf,
  },
];

const Feature = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col gap-36 px-4" id="platform">
      <div className="flex flex-col gap-10 text-center" id="customers">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-medium tracking-[-0.035em] text-balance">
            Trusted by top companies
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground">
            Built for GCC plants where visibility, uptime, and energy cost matter every shift.
          </p>
        </div>
        <div className="grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
          {customers.map((customer) => (
            <div
              className="flex h-28 items-center justify-center border-b border-r border-border text-xl font-medium tracking-[-0.04em] text-foreground md:h-32 md:text-2xl"
              key={customer}
            >
              {customer}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-16" id="usecases">
        <div className="text-center">
          <h2 className="text-4xl font-medium tracking-[-0.035em] text-balance">
            Kuroshio is designed for plants
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Focused modules for energy, maintenance, and carbon.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.24fr_0.88fr]">
          <div className="flex flex-col gap-24">
            {features.slice(0, 2).map((feature) => (
              <FeatureCopy feature={feature} key={feature.title} />
            ))}
          </div>

          <div className="axis-note-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-white text-black">
                  <Factory aria-hidden="true" className="size-5" />
                </span>
                <span className="text-sm text-muted-foreground">Line A-07 / Today</span>
              </div>
              <button type="button">Save</button>
            </div>
            <div className="flex gap-2">
              <span>Overview</span>
              <span>Transcript</span>
            </div>
            <h3>Your plant snapshot</h3>
            <p>
              Line A-07 used 318 kWh today. Idle periods after lunch created AED 72 of avoidable energy cost, while health stayed normal at 86/100.
            </p>
            <div className="axis-note-callout">
              <Radio aria-hidden="true" className="size-5" />
              <span>Good next step: schedule a bearing inspection and stagger compressor startup by 5 minutes.</span>
            </div>
          </div>

          <div className="flex flex-col gap-24">
            {features.slice(2).map((feature) => (
              <FeatureCopy feature={feature} key={feature.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function FeatureCopy({ feature }) {
  const Icon = feature.icon;

  return (
    <article className="flex flex-col gap-3">
      <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
      <h3 className="text-lg font-medium tracking-[-0.02em]">{feature.title}</h3>
      <p className="max-w-[280px] text-base leading-7 text-muted-foreground text-pretty">
        {feature.description}
      </p>
    </article>
  );
}

export default Feature;
