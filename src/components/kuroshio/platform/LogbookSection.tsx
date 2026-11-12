import { Band, SectionHead } from "@/components/kuroshio/Sections";
import { cn } from "@/lib/utils";

// The same Extrusion Line 02 job the demo film follows, alert to close-out.
const ENTRIES = [
  {
    when: "31 Aug 2026 · 06:40",
    title: "Alert ALR-4471 raised",
    body: "Bearing wear on the drive end. Health score 71, sideband energy 41% above this motor's own baseline. The entry opened itself.",
    owner: "Logged by Kuroshio",
  },
  {
    when: "01 Sep 2026 · 10:15",
    title: "Inspection",
    body: "Drive-end bearing confirmed. Two BRG-\u20606208-\u20602RS reserved from store B for the next changeover.",
    owner: "A. Rahman",
  },
  {
    when: "09 Sep 2026 · 14:20",
    title: "Bearing replaced",
    body: "Drive-end bearing replaced with BRG-\u20606208-\u20602RS ×2 and the housing re-greased. Photos attached.",
    owner: "A. Rahman",
  },
  {
    when: "09 Sep 2026 · 16:05",
    title: "Back within baseline",
    body: "Line restarted. The signal settled inside its baseline and ALR-4471 closed against this record.",
    owner: "Closed by A. Rahman",
  },
] as const;

export function LogbookSection() {
  return (
    <Band id="digital-logbook">
      <div className="shell flex flex-col gap-14 lg:gap-20">
        <SectionHead
          body="Every repair and inspection is tied to the machine and the alert that started it, searchable and exportable as PDF. The history stays when the team or contractor changes."
          eyebrow="Digital logbook"
          title="Replace paper logs for good."
        />

        <ol
          aria-label="Extrusion Line 02, Unit 4: maintenance record"
          className="grid lg:grid-cols-4"
          data-reveal="up"
        >
          {ENTRIES.map((entry, index) => {
            const last = index === ENTRIES.length - 1;
            return (
              <li className="relative pb-10 pl-9 last:pb-0 lg:pt-10 lg:pr-8 lg:pb-0 lg:pl-0" key={entry.title}>
                {/* Track: runs down on mobile, across on desktop. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-[5px] w-1 bg-brand lg:top-[5px] lg:left-0 lg:h-1",
                    last ? "h-3 lg:w-3" : "bottom-0 lg:right-0 lg:bottom-auto lg:w-auto"
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 size-3.5 bg-brand",
                    last && "outline-4 outline-offset-0 outline-brand/25"
                  )}
                />
                <p className="tag readout">{entry.when}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{entry.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink">{entry.body}</p>
                <p className="tag mt-3">{entry.owner}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Band>
  );
}
