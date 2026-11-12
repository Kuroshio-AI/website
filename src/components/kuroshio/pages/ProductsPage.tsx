import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { KTrackLoop, PlatformLoop, SayItLoop } from "@/components/kuroshio/demos/loops";
import { UsedBy } from "@/components/kuroshio/pages/KTrackPage";
import type { PageId } from "@/data/mockData";
import { usePageMotion } from "@/hooks/usePageMotion";

interface PageProps {
  readonly onNavigate: (page: PageId) => void;
}


/** Everything we offer, one block each; used on the home page and the products page. */
export function ProductPair({ headingLevel = "h2" }: Readonly<{ headingLevel?: "h2" | "h3" }>) {
  const Heading = headingLevel;

  return (
    <div className="flex flex-col gap-2">
      <article className="grid bg-canvas-sunk md:grid-cols-12" data-reveal="up">
        <div className="flex flex-col gap-6 p-6 md:col-span-5 md:p-10">
          <div className="flex flex-col gap-3">
            <Heading className="display-lg">KTrack</Heading>
            <UsedBy />
          </div>
          <p className="text-[1.125rem] leading-relaxed">
            For inspection and certification companies. Inspectors report from their phone, a reviewer signs off, and each certificate carries a QR code that shows whether it is still valid.
          </p>
          <ul className="flex flex-col gap-1 text-[1.0625rem] font-semibold">
            <li>Inspections on the inspector's phone</li>
            <li>Approval before any certificate is issued</li>
            <li>QR verification on every certificate</li>
            <li>WhatsApp and email expiry alerts</li>
          </ul>
          <PageLink className="btn-brand mt-auto w-fit" page="ktrack">
            Explore KTrack
            <ArrowRight aria-hidden="true" className="size-4" />
          </PageLink>
        </div>
        <div className="flex items-center justify-center bg-[#26251F] md:col-span-7">
          <KTrackLoop />
        </div>
      </article>

      <article className="grid bg-canvas-sunk md:grid-cols-12" data-reveal="up">
        <div className="flex flex-col gap-6 p-6 md:col-span-5 md:p-10">
          <div className="flex flex-col gap-3">
            <Heading className="display-lg">Kuroshio Platform</Heading>
            <UsedBy client="tkm" />
          </div>
          <p className="text-[1.125rem] leading-relaxed">
            Clamp-on meters read any three-phase machine every 40 seconds. You see what each one costs to run, and hear about a failing bearing weeks before it stops.
          </p>
          <ul className="flex flex-col gap-1 text-[1.0625rem] font-semibold">
            <li>EnergyIQ, cost per machine</li>
            <li>Predictive maintenance</li>
            <li>Digital logbook</li>
            <li>Carbon tracking</li>
          </ul>
          <PageLink className="btn-brand mt-auto w-fit" page="platform">
            Explore Kuroshio Platform
            <ArrowRight aria-hidden="true" className="size-4" />
          </PageLink>
        </div>
        <div className="flex items-center justify-center bg-[#26251F] md:col-span-7">
          <PlatformLoop />
        </div>
      </article>

      <article className="grid bg-canvas-sunk md:grid-cols-12" data-reveal="up" id="custom-tools">
        <div className="flex flex-col gap-6 p-6 md:col-span-5 md:p-10">
          <Heading className="display-lg">Custom internal tools</Heading>
          <p className="text-[1.125rem] leading-relaxed">
            If a job runs on spreadsheets and WhatsApp groups today, we turn it into one tool
            your team actually uses. Same engineers as KTrack and Kuroshio Platform, built around
            how your people already work.
          </p>
          <ul className="flex flex-col gap-1 text-[1.0625rem] font-semibold">
            <li>Requests raised from the site, on a phone</li>
            <li>Approvals that do not sit in someone's inbox</li>
            <li>One register instead of five spreadsheets</li>
            <li>WhatsApp alerts when a person needs to act</li>
          </ul>
          <PageLink className="btn-brand mt-auto w-fit" page="contact">
            Tell us what you need
            <ArrowRight aria-hidden="true" className="size-4" />
          </PageLink>
        </div>
        <div className="flex items-center justify-center bg-[#26251F] md:col-span-7">
          <SayItLoop />
        </div>
      </article>
    </div>
  );
}

export function ProductsPage(_props: Readonly<PageProps>) {
  const rootRef = useRef<HTMLElement>(null);
  usePageMotion(rootRef);

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <section className="shell pt-14 pb-24 md:pt-[9vh] md:pb-40">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-x-6">
          <h1 className="display-xl md:col-span-7">What we build</h1>
          <p className="lede max-w-[38ch] md:col-span-5">
            Two products of our own, and custom tools for teams whose work does not fit anyone
            else's software.
          </p>
        </div>
        <div className="mt-14">
          <ProductPair headingLevel="h2" />
        </div>
      </section>
    </main>
  );
}
