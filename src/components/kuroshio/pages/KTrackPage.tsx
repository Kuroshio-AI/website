import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { KTrackLoop } from "@/components/kuroshio/demos/loops";
import { PageLink } from "@/components/kuroshio/PageLink";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";
import { cn } from "@/lib/utils";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}

const CLIENTS = {
  kee: { name: "Kee Safety", logo: "/clients/kee-safety.png" },
  tkm: { name: "TKM College of Engineering", logo: "/clients/tkm.png" },
};

/** Client mark: the client's own logo, shown because they use the product. */
export function UsedBy({
  className,
  client = "kee",
  size = "sm",
}: Readonly<{ className?: string; client?: keyof typeof CLIENTS; size?: "sm" | "lg" }>) {
  const { name, logo } = CLIENTS[client];
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <img
        alt={name}
        // The TKM seal is black line art on transparency; the white disc keeps it legible on dark cards.
        className={cn(size === "lg" ? "size-[72px] md:size-[85px]" : "size-11", client === "tkm" && "rounded-full bg-white")}
        height={170}
        src={logo}
        width={170}
      />
      <span className={size === "lg" ? "text-[1.125rem] font-semibold" : "text-[0.9375rem] font-semibold"}>
        Used by {name}
      </span>
    </span>
  );
}

export const KTRACK_DEMO_URL = "https://kuroshio-ktrack.vercel.app";

// The closed loop from the KTrack client brochure, in order.
const LOOP = [
  ["Register", "Add equipment and its certificates in KTrack, or bring your existing Excel register in. Every item gets an ID, type, serial, site, owner, interval and due date."],
  ["Inspect", "The inspector opens the job on their phone, answers every checklist item, adds up to three photos and signs on screen. The submission is the report."],
  ["Review", "A reviewer approves it, or returns it with a mandatory comment. A failed item blocks issue, so nothing goes out without a second pair of eyes."],
  ["Certify", "The approved inspection becomes a numbered certificate with an explicit expiry and next inspection date, issued under your name."],
  ["Verify", "Every certificate carries a QR code. Any phone camera shows whether it is valid, expired, revoked or superseded. No login needed."],
  ["Remind", "WhatsApp and email alerts reach the equipment owner at 30 days, 7 days, on the day and when overdue. Every send is logged."],
] as const;

export function KTrackPage(_props: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <section className="shell grid gap-12 pt-14 pb-20 md:grid-cols-12 md:gap-x-6 md:pt-[9vh] md:pb-28">
        <div className="flex flex-col gap-7 md:col-span-6">
          <h1 className="display-xl max-w-[13ch]">Every certificate. Every expiry.</h1>
          <p className="lede max-w-[38ch]">
            For inspection and certification companies. The inspector writes the report on their phone, a reviewer approves it, and anyone with a camera can check the certificate it produces.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <PageLink className="btn-brand" page="contact">
              Request a KTrack demo
              <ArrowRight aria-hidden="true" className="size-4" />
            </PageLink>
            <a
              className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink underline-offset-4 hover:underline"
              href={KTRACK_DEMO_URL}
              rel="noreferrer"
              target="_blank"
            >
              Try the sample app
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-5">
            {[
              ["WhatsApp and email alerts", "Owners hear before every expiry, on the schedule you set. Every send is logged."],
              ["Checked with any camera", "The QR on each certificate shows valid, expired or revoked. No login."],
              ["Signed off on site", "Inspectors tick the checklist, add photos and sign on their phone."],
            ].map(([title, body]) => (
              <div className="flex flex-col gap-1.5" key={title}>
                <dt className="text-[1.0625rem] leading-snug font-bold">{title}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex items-center justify-center bg-[#26251F] md:col-span-6">
          <KTrackLoop />
        </div>
      </section>

      <section className="bg-brand text-white">
        <div className="shell grid gap-6 py-16 md:grid-cols-12 md:items-end md:gap-x-6 md:py-24">
          <div className="flex flex-col gap-6 md:col-span-8">
            <img alt="" aria-hidden="true" className="size-[72px] md:size-[85px]" height={170} src="/clients/kee-safety.png" width={170} />
            <h2 className="font-[family-name:var(--font-display)] text-[13vw] leading-[0.88] font-bold tracking-[-0.05em] md:text-[6.5vw]">
              Used by Kee Safety
            </h2>
          </div>
          <p className="text-[1.125rem] md:col-span-4">
            Kee Safety makes fall-protection systems and safety barriers, Kee Klamp among them. Their inspection and certificate register runs on KTrack.
          </p>
        </div>
      </section>

      <section className="band bg-canvas">
        <div className="shell">
          <h2 className="display-lg max-w-[16ch]" data-reveal="up">
            One loop, register to reminder
          </h2>
          <ol className="mt-12 flex flex-col">
            {LOOP.map(([name, body], index) => (
              <li
                className={cn(
                  "grid gap-2 px-4 py-6 md:grid-cols-12 md:gap-x-6 md:px-6 md:py-8",
                  index % 2 === 0 && "bg-canvas-sunk"
                )}
                data-reveal="up"
                key={name}
              >
                <h3 className="display-md md:col-span-5">{name}</h3>
                <p className="max-w-[56ch] text-[1.125rem] leading-relaxed md:col-span-7">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-canvas">
        <div className="shell flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <h2 className="display-lg max-w-[14ch]">Bring us your Excel register.</h2>
          <div className="flex max-w-[40ch] flex-col gap-6">
            <p className="text-[1.125rem]">
              KTrack validates every row, shows errors before importing and never overwrites
              existing records. We will show you your own equipment and expiry dates in it.
            </p>
            <PageLink className="btn-brand w-fit" page="contact">
              Request a KTrack demo
            </PageLink>
          </div>
        </div>
      </section>
    </main>
  );
}
