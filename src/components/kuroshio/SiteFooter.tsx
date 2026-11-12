import { useEffect, useState } from "react";

import { PageLink } from "@/components/kuroshio/PageLink";
import { contactPage, navItems } from "@/data/mockData";
import type { RouteId } from "@/data/mockData";

interface SiteFooterProps {
  readonly activePage: RouteId;
}

const OFFICES = [
  { city: "Ras Al Khaimah", zone: "Asia/Dubai", note: "Installs and support" },
  { city: "Trivandrum, STPI", zone: "Asia/Kolkata", note: "Hardware and software" },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const tile = "flex flex-col p-5 md:p-6";

export function SiteFooter({ activePage }: Readonly<SiteFooterProps>) {
  const now = useClock();
  const email = contactPage.direct[0].links[0];

  return (
    <footer className="bg-canvas p-1.5 md:p-2.5">
      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-12 md:gap-2">
        <PageLink
          className="group order-2 col-span-2 flex min-h-[200px] flex-col justify-between bg-brand p-5 text-white transition-colors hover:bg-brand-deep md:order-none md:col-span-4 md:col-start-9 md:row-start-2 md:min-h-[320px] md:p-6"
          page="contact"
        >
          <span className="display-md max-w-[12ch]">
            {activePage === "ktrack"
              ? "See your own register in KTrack"
              : activePage === "platform"
                ? "Talk to an engineer" /* the page's own close already offers the one-machine pilot */
                : "Tell us what you need"}
          </span>
          <svg
            aria-hidden="true"
            className="size-14 self-end transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 48 48"
          >
            <path d="M10 38 38 10M16 10h22v22" />
          </svg>
        </PageLink>

        <div className="order-1 col-span-2 flex min-h-[160px] items-center justify-center overflow-hidden bg-ink md:order-none md:col-span-8 md:col-start-1 md:row-start-2 md:min-h-[320px]">
          <span className="font-[family-name:var(--font-display)] text-[17vw] leading-none font-bold tracking-[-0.06em] text-canvas select-none md:text-[9.5vw]">
            Kuroshio
          </span>
        </div>

        <nav
          aria-label="Footer"
          className={`${tile} order-3 bg-canvas-sunk md:order-none md:col-span-3 md:row-start-1 md:min-h-[220px]`}
        >
          <ul className="flex flex-col gap-1 text-base">
            {[
              { id: "home" as const, label: "Home" },
              { id: "platform" as const, label: "Kuroshio Platform" },
              { id: "ktrack" as const, label: "KTrack" },
              ...navItems.filter((item) => item.id !== "products"),
            ].map((item) => (
              <li key={item.id}>
                <PageLink
                  aria-current={activePage === item.id ? "page" : undefined}
                  className="text-ink transition-colors hover:text-brand aria-[current=page]:text-brand"
                  page={item.id}
                >
                  {item.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${tile} order-4 justify-between bg-canvas-sunk md:order-none md:col-span-3 md:row-start-1`}>
          <a
            className="text-lg font-semibold break-all text-ink transition-colors hover:text-brand md:text-xl"
            href={email.href}
          >
            {email.value}
          </a>
          <div className="mt-6 flex flex-col gap-0.5 text-base">
            {contactPage.direct.slice(1).flatMap((entry) =>
              entry.links.map((link) => (
                <a className="tabular-nums text-ink transition-colors hover:text-brand" href={link.href} key={link.href}>
                  {link.value} <span className="text-ink-faint">{entry.label}</span>
                </a>
              ))
            )}
          </div>
        </div>

        <div className={`${tile} order-5 justify-between gap-6 bg-canvas-sunk md:order-none md:col-span-2 md:row-start-1`}>
          {OFFICES.map((office) => (
            <p className="flex flex-col text-base" key={office.city}>
              <span className="font-semibold text-ink">{office.city}</span>
              <span className="tabular-nums text-ink-dim">
                {now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: office.zone })}{" "}
                · {office.note}
              </span>
            </p>
          ))}
        </div>

        <div className={`${tile} order-6 col-span-2 justify-between gap-8 bg-canvas-sunk md:order-none md:col-span-4 md:row-start-1`}>
          <p className="max-w-[28ch] text-xl leading-snug font-semibold text-ink md:text-2xl">
            Named after a current you cannot see from the shore.
          </p>
          <div className="flex flex-col gap-1 text-[0.8125rem] text-ink-faint">
            <p>
              © {now.getFullYear()} Kuroshio AI Private Limited (Trivandrum) and Kuroshio AI Ltd (RAKEZ).
            </p>
            <p>
              Current visualisation:{" "}
              <a
                className="underline underline-offset-2 hover:text-brand"
                href="https://commons.wikimedia.org/wiki/File:Western_Boundary_Currents_-_The_Kuroshio_Current.jpg"
              >
                NASA Goddard Space Flight Center, CC BY 2.0
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
