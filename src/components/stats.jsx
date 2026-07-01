const tools = ["PLC", "Meter", "SIM", "Azure", "PDF"];

const stats = [
  {
    name: "Live telemetry refresh",
    value: "60s",
  },
  {
    name: "Dashboard ready in",
    value: "24h",
  },
  {
    name: "POC fee refunded if no value",
    value: "75%",
  },
];

const Stats = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1120px] flex-col gap-16 px-4" id="deployment">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.035em] text-balance">
          Works with your existing plant stack
        </h2>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          No PLC access, no client network, no months-long integration project.
        </p>
        <div className="mt-5 flex items-center justify-center -space-x-3">
          {tools.map((tool) => (
            <span
              className="flex size-14 items-center justify-center rounded-full border border-background bg-foreground text-sm font-semibold text-background shadow-sm"
              key={tool}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-[1.35rem] border border-border bg-card md:grid-cols-3">
        {stats.map((stat) => (
          <div
            className="flex flex-col items-center justify-center border-b border-border px-6 py-12 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            key={stat.name}
          >
            <div className="text-5xl font-medium leading-none tracking-[-0.04em] text-foreground tabular-nums">
              {stat.value}
            </div>
            <p className="mt-3 max-w-40 text-sm leading-5 text-muted-foreground">
              {stat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
