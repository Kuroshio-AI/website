import { ArrowRight } from "lucide-react";

import { PageLink } from "@/components/kuroshio/PageLink";
import type { PageId } from "@/data/mockData";

// Same facts as PilotTable on the home page, folded into the closing call to action.
const ROWS = [
  ["Cost", "AED 1,500 at most", "Quoted from the pilot report"],
  ["What we meter", "One machine, your choice", "Every machine you name"],
  ["Install", "3 to 4 hours, no stoppage", "Same clamp-on kit, no stoppage"],
  ["How long", "Four weeks", "Ongoing"],
  ["If it shows nothing", "75% of the fee refunded", "Nothing to refund"],
  ["What you keep", "The four-week report", "Full history, exportable as PDF"],
] as const;

export function PilotClose({
  onNavigate,
  more = { page: "industries", label: "See your industry" },
}: Readonly<{
  onNavigate: (page: PageId) => void;
  more?: { page: PageId; label: string };
}>) {
  return (
    <section className="band bg-canvas-sunk" id="pilot">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <h2 className="display-lg" data-reveal="up">
            Try it on one machine first.
          </h2>
          <p className="lede max-w-xl text-ink" data-reveal="up" data-reveal-delay="0.08">
            Meter the line you argue about most for four weeks. If the numbers do not convince
            you, 75% of the fee comes back and you keep the report.
          </p>
          <div className="flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="0.14">
            <button className="btn-brand" onClick={() => onNavigate("contact")} type="button">
              Request a demo
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
            <PageLink className="btn-ghost" page={more.page}>
              {more.label}
            </PageLink>
          </div>
        </div>

        <div className="bg-panel p-2 sm:p-4" data-reveal="up" data-reveal-delay="0.1">
          <table className="w-full border-collapse text-left text-base">
            <thead>
              <tr className="max-sm:grid max-sm:grid-cols-2">
                <td className="max-sm:hidden" />
                <th className="px-3 pt-3 pb-4 text-xl font-semibold tracking-tight text-ink sm:px-4" scope="col">Pilot</th>
                <th className="px-3 pt-3 pb-4 text-xl font-semibold tracking-tight text-ink sm:px-4" scope="col">Site rollout</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, pilot, rollout]) => (
                <tr className="border-t-4 border-panel bg-canvas max-sm:grid max-sm:grid-cols-2" key={label}>
                  <th className="px-3 py-3 text-[0.9375rem] max-sm:col-span-2 max-sm:pb-0 sm:w-[30%] font-normal text-ink-dim sm:px-4" scope="row">
                    {label}
                  </th>
                  <td className="px-3 py-3 text-ink sm:px-4">{pilot}</td>
                  <td className="px-3 py-3 text-ink sm:px-4">{rollout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
