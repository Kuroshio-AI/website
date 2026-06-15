import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureList } from "@/components/kuroshio/FeatureList";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { platformPage } from "@/data/mockData";
import type { IconKey, PageId } from "@/data/mockData";

const metricToneClasses = {
  primary: "border-t-primary-container text-primary-container",
  secondary: "border-t-secondary text-secondary",
  neutral: "border-t-outline text-outline",
  critical: "border-t-critical text-critical",
} as const;

const statusToneClasses = {
  primary: "bg-primary-fixed text-primary",
  warning: "bg-tertiary-fixed text-tertiary",
  neutral: "bg-surface-variant text-outline",
  critical: "bg-error-container text-error",
} as const;

export interface AnchorNavProps {
  readonly items: typeof platformPage.anchorNav;
}

export function AnchorNav({ items }: Readonly<AnchorNavProps>) {
  return (
    <div className="sticky top-20 z-40 hidden overflow-x-auto border-b border-border-cool bg-surface-container-lowest shadow-sm md:block">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-stack-lg px-gutter text-sm text-on-surface-variant">
        {items.map((item) => (
          <a className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-primary" href={`#${item.id}`} key={item.id}>
            <KuroshioIcon className="size-4" name={item.icon as IconKey} />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export interface MetricCardProps {
  readonly metric: (typeof platformPage.metrics)[number];
}

export function MetricCard({ metric }: Readonly<MetricCardProps>) {
  const tone = metricToneClasses[metric.tone];

  return (
    <Card className={`h-36 rounded-b-lg rounded-t-none border-border-cool border-t-4 bg-surface-container-lowest p-0 shadow-sm ${tone}`}>
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="text-xs font-bold uppercase text-on-surface-variant">{metric.label}</span>
          <KuroshioIcon className="size-5" name={metric.icon as IconKey} />
        </div>
        <div className="text-3xl font-bold text-on-surface">
          {metric.value} <span className="text-sm font-medium text-on-surface-variant">{metric.unit}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="uppercase text-on-surface-variant">{metric.helper}</span>
          {metric.delta && <span className="text-secondary">{metric.delta}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

export interface MachineTableProps {
  readonly rows: typeof platformPage.machines;
}

export function MachineTable({ rows }: Readonly<MachineTableProps>) {
  return (
    <Card className="overflow-hidden border-border-cool bg-surface-container-lowest p-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border-cool p-6">
        <CardTitle className="text-xl font-bold text-on-surface">Machine Energy Profiles</CardTitle>
        <Button className="h-9 rounded border-outline-variant text-primary" type="button" variant="outline">
          <KuroshioIcon className="size-4" name="download" />
          Export CSV
        </Button>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-cool bg-surface-container-low text-xs uppercase text-on-surface-variant">
              <th className="p-4 font-bold">Machine / Type</th>
              <th className="p-4 font-bold">State</th>
              <th className="p-4 text-right font-bold">Idle Time</th>
              <th className="p-4 text-right font-bold">Energy Today</th>
              <th className="p-4 text-right font-bold">Cost Today</th>
              <th className="p-4 font-bold">24h Timeline</th>
              <th className="p-4 text-right font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-cool text-sm">
            {rows.map((row) => {
              const statusTone = statusToneClasses[row.tone];
              return (
                <tr className="transition-colors hover:bg-surface-teal/40" key={row.machine}>
                  <td className="p-4">
                    <div className="font-medium text-on-surface">{row.machine}</div>
                    <div className="text-xs text-on-surface-variant">{row.type}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-bold uppercase ${statusTone}`}>
                      {row.state}
                    </span>
                  </td>
                  <td className="p-4 text-right text-on-surface-variant">{row.idle}</td>
                  <td className="p-4 text-right text-on-surface-variant">{row.energy}</td>
                  <td className="p-4 text-right text-on-surface-variant">{row.cost}</td>
                  <td className="p-4">
                    <div className="flex h-2 overflow-hidden rounded-full bg-surface-variant">
                      <div className="bg-primary-container" style={{ width: `${row.load}%` }} />
                      {row.accent > 0 && <div className="bg-warning" style={{ width: `${row.accent}%` }} />}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button className="h-8 px-0 text-xs font-bold uppercase text-primary" type="button" variant="link">
                      Details
                      <KuroshioIcon className="size-4" name="arrowRight" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export interface HealthScoreCardProps {
  readonly score: number;
}

export function HealthScoreCard({ score }: Readonly<HealthScoreCardProps>) {
  const bars = [30, 40, 35, 50, 45, 60, 80];

  return (
    <Card className="w-full max-w-md border-border-cool bg-surface-container-lowest p-0 shadow-sm">
      <CardContent className="p-8">
        <div className="flex flex-col items-center">
          <div className="relative size-48">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-variant"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-secondary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${score}, 100`}
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-on-surface">{score}</span>
              <span className="text-xs font-semibold uppercase text-on-surface-variant">Health Score</span>
            </div>
          </div>

          <div className="mt-8 w-full">
            <div className="mb-2 flex items-end justify-between">
              <span className="text-sm text-on-surface-variant">Vibration Trend</span>
              <span className="text-sm font-semibold text-secondary">+2.4%</span>
            </div>
            <div className="flex h-16 items-end gap-1 rounded bg-surface-variant px-2 pb-2">
              {bars.map((height, index) => (
                <div
                  className="w-full rounded-t bg-primary"
                  key={`${height}-${String(index)}`}
                  style={{ height: `${height}%`, opacity: 0.2 + index * 0.12 }}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export interface LogbookPreviewProps {
  readonly entries: typeof platformPage.logbook.entries;
}

export function LogbookPreview({ entries }: Readonly<LogbookPreviewProps>) {
  return (
    <Card className="w-full max-w-md overflow-hidden border-border-cool bg-surface-container-lowest p-0 shadow-sm">
      <div className="flex items-center justify-between border-b border-border-cool bg-primary-container p-4 text-surface-container-lowest">
        <div className="flex items-center gap-2">
          <KuroshioIcon className="size-5" name="book" />
          <span className="text-xl font-bold">Maintenance Log</span>
        </div>
        <Button className="size-8 text-surface-container-lowest hover:bg-primary-fixed-dim/20" size="icon" type="button" variant="ghost">
          <KuroshioIcon className="size-4" name="download" />
        </Button>
      </div>

      <div className="space-y-4 p-6">
        {entries.map((entry) => (
          <div
            className={`border-l-2 py-1 pl-4 ${entry.tone === "secondary" ? "border-secondary" : "border-outline-variant"}`}
            key={entry.title}
          >
            <div className="mb-1 flex items-start justify-between gap-3">
              <span className="font-bold text-on-surface">{entry.title}</span>
              <span className="text-xs text-on-surface-variant">{entry.date}</span>
            </div>
            <p className="mb-3 text-sm leading-5 text-on-surface-variant">{entry.body}</p>
            <div className="flex items-center gap-2">
              <span
                className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                  entry.tone === "secondary"
                    ? "bg-primary-container text-surface-container-lowest"
                    : "bg-surface-variant text-on-surface-variant"
                }`}
              >
                {entry.initials}
              </span>
              <span className="text-xs text-on-surface-variant">{entry.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export interface ArchitectureSectionProps {
  readonly onNavigate: (page: PageId) => void;
}

export function ArchitectureSection({ onNavigate }: Readonly<ArchitectureSectionProps>) {
  return (
    <section className="scroll-mt-40 border-y border-border-cool bg-surface-light py-section-gap-md" id="architecture">
      <div className="mx-auto max-w-[1280px] px-gutter">
        <div className="mx-auto mb-stack-lg max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-primary md:text-4xl">{platformPage.architecture.title}</h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-stack-lg lg:grid-cols-2">
          <div className="space-y-stack-md">
            {platformPage.architecture.cards.map((card) => (
              <Card className="border-border-cool bg-surface-container-lowest p-0 shadow-sm" key={card.title}>
                <CardContent className="p-6">
                  <h3 className="mb-3 flex items-center gap-2 text-xl font-bold text-primary">
                    <KuroshioIcon className="size-5" name={card.icon as IconKey} />
                    {card.title}
                  </h3>
                  <p className="text-base leading-6 text-on-surface-variant">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="relative h-full overflow-hidden border-primary-fixed-dim/20 bg-primary-container p-0 text-surface-container-lowest">
            <KuroshioIcon className="absolute right-6 top-6 size-28 text-primary-fixed-dim opacity-10" name="cpu" />
            <CardContent className="relative z-10 flex h-full flex-col justify-center p-8">
              <h4 className="mb-6 text-sm font-bold uppercase text-primary-fixed-dim">Data Pipeline</h4>
              <div className="flex flex-col gap-4">
                {platformPage.architecture.pipeline.map((item, index) => (
                  <div className="contents" key={item.label}>
                    <div className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary-fixed text-primary-fixed">
                        <KuroshioIcon className="size-5" name={item.icon as IconKey} />
                      </div>
                      <div className="flex-1 rounded bg-on-primary-container p-3 text-sm font-semibold text-primary-container">
                        {item.label}
                      </div>
                    </div>
                    {index < platformPage.architecture.pipeline.length - 1 && <div className="mx-auto h-6 w-px bg-primary-fixed" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-section-gap-md rounded-2xl bg-hero-navy p-8 text-center text-surface-container-lowest md:p-12">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">{platformPage.cta.title}</h2>
          <p className="mx-auto mt-stack-md max-w-2xl text-lg leading-8 text-primary-fixed-dim">{platformPage.cta.description}</p>
          <Button className="mt-stack-lg h-12 rounded-lg bg-secondary px-8 text-on-secondary hover:bg-secondary/90" onClick={() => onNavigate("contact")} type="button">
            {platformPage.cta.action}
          </Button>
        </div>
      </div>
    </section>
  );
}

export interface ProductFeatureSectionProps {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly features: ReadonlyArray<string>;
  readonly visual: "health" | "logbook";
}

export function ProductFeatureSection({
  id,
  title,
  description,
  features,
  visual,
}: Readonly<ProductFeatureSectionProps>) {
  const isLogbook = visual === "logbook";

  return (
    <section className={`${isLogbook ? "bg-surface" : "bg-surface-light"} scroll-mt-40 py-section-gap-md`} id={id}>
      <div
        className={`mx-auto flex max-w-[1280px] flex-col items-center gap-section-gap-md px-gutter ${
          isLogbook ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div className="flex-1">
          <h2 className="text-3xl font-bold leading-tight text-on-surface md:text-4xl">{title}</h2>
          <p className="mt-stack-md max-w-2xl text-lg leading-8 text-on-surface-variant">{description}</p>
          <FeatureList items={features} />
        </div>

        <div className="flex w-full flex-1 justify-center">{isLogbook ? <LogbookPreview entries={platformPage.logbook.entries} /> : <HealthScoreCard score={85} />}</div>
      </div>
    </section>
  );
}
