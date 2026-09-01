import { PageLink } from "@/components/kuroshio/PageLink";
import { CurrentMark } from "@/components/kuroshio/Wordmark";
import { contactPage, navItems } from "@/data/mockData";
import type { PageId } from "@/data/mockData";

interface SiteFooterProps {
  readonly activePage: PageId;
}

const CREDENTIALS = [
  "DPIIT recognised deep tech",
  "Kerala Makers Village",
  "RAK Innovation City · RAKEZ",
  "IIT Madras affiliation",
  "Azure UAE North residency",
];

export function SiteFooter({ activePage }: Readonly<SiteFooterProps>) {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-abyss-deep">
      <div className="mask-fade-x flex overflow-hidden border-b border-hairline py-2.5">
        <div className="animate-ticker flex shrink-0 whitespace-nowrap">
          {[...CREDENTIALS, ...CREDENTIALS].map((item, index) => (
            <span className="tag px-8 text-[0.625rem]" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:py-20">
        <div className="flex flex-col gap-5">
          <CurrentMark className="size-9 text-signal" />
          <p className="max-w-xs text-[0.9375rem] leading-relaxed text-bone-dim">
            Non-invasive industrial intelligence for manufacturers across the UAE
            and GCC. Engineered in Kerala, deployed on the plant floor.
          </p>
          <PageLink className="btn-ghost mt-2 w-fit text-[0.8125rem]" page="contact">
            Start with one machine
          </PageLink>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="tag mb-1">Navigate</p>
          <PageLink
            aria-current={activePage === "home" ? "page" : undefined}
            className="w-fit text-sm text-bone-dim transition-colors hover:text-signal"
            page="home"
          >
            Home
          </PageLink>
          {navItems.map((item) => (
            <PageLink
              aria-current={activePage === item.id ? "page" : undefined}
              className="w-fit text-sm text-bone-dim transition-colors hover:text-signal"
              key={item.id}
              page={item.id}
            >
              {item.label}
            </PageLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="tag mb-1">Direct</p>
          {contactPage.direct.map((entry) => (
            <div className="flex flex-col gap-1" key={entry.label}>
              <span className="text-[0.6875rem] tracking-[0.16em] text-bone-faint uppercase">
                {entry.label}
              </span>
              {entry.links.map((link) => (
                <a
                  className="readout w-fit text-sm text-bone-dim transition-colors hover:text-signal"
                  href={link.href}
                  key={link.href}
                >
                  {link.value}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <p className="tag">Offices</p>
          {contactPage.offices.map((office) => (
            <div className="flex flex-col gap-1.5" key={office.city}>
              <span className="text-sm font-medium tracking-tight text-bone">{office.city}</span>
              <address className="text-[0.8125rem] leading-relaxed text-bone-faint not-italic">
                {office.address.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-hairline py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="tag">© {new Date().getFullYear()} Kuroshio AI · All rights reserved</p>
        <p className="tag">Kuroshio AI Private Limited · Kuroshio AI Ltd</p>
      </div>

      <div aria-hidden="true" className="pointer-events-none relative -mb-[0.18em] overflow-hidden px-4">
        <span className="block bg-gradient-to-b from-[rgba(147,202,205,0.12)] to-transparent bg-clip-text text-center font-[family-name:var(--font-display)] text-[clamp(3.5rem,15vw,14rem)] leading-[0.78] font-bold tracking-[-0.05em] text-transparent select-none">
          KUROSHIO
        </span>
      </div>
    </footer>
  );
}
