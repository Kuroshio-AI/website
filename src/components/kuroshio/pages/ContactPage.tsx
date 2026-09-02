import { AlertTriangle, ArrowRight, Check, Loader2 } from "lucide-react";
import { useRef } from "react";

import { CurrentField } from "@/components/kuroshio/CurrentField";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { contactPage } from "@/data/mockData";
import { useContactForm } from "@/hooks/useContactForm";
import { usePageMotion } from "@/hooks/usePageMotion";

const FIELD_CLASS =
  "h-12 w-full border border-hairline-strong bg-panel/50 px-4 text-[0.9375rem] text-ink " +
  "transition-colors placeholder:text-ink-faint hover:border-hairline focus:border-brand " +
  "focus:outline-none focus-visible:outline-none";

const PROMISES = [
  ["Response time", "Within one business day"],
  ["Proof of concept", "One machine · four weeks"],
  ["Your maximum risk", "AED 1,500 · 75% refunded"],
];

function Label({ htmlFor, children, required }) {
  return (
    <label
      className="flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-[0.16em] text-ink-faint uppercase"
      htmlFor={htmlFor}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-brand">
          *
        </span>
      ) : (
        <span className="text-ink-faint normal-case">(optional)</span>
      )}
    </label>
  );
}

export function ContactPage() {
  const rootRef = useRef(null);
  usePageMotion(rootRef);
  const { errorMessage, status, successMessage, handleSubmit } = useContactForm();
  const isSending = status === "sending";

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <section className="relative overflow-hidden border-b border-hairline">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <CurrentField className="absolute inset-0 size-full" density={0.6} opacity={0.6} />
          <div className="grid-field absolute inset-0 opacity-40" />
          <div className="vignette absolute inset-0" />
        </div>

        <div className="shell relative grid gap-10 py-24 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4" data-reveal="fade">
              <span className="tag-brand">Contact</span>
              <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
              <span className="tag">UAE · India</span>
            </div>
            <h1 className="display-xl max-w-[13ch]" data-reveal="up">
              Let&apos;s start with one <span className="text-brand">machine.</span>
            </h1>
            <p className="lede max-w-xl" data-reveal="up" data-reveal-delay="0.08">
              {contactPage.hero.description}
            </p>
          </div>

          <dl className="grid gap-px border border-hairline bg-hairline" data-reveal="scale">
            {PROMISES.map(([label, value]) => (
              <div
                className="flex flex-wrap items-baseline justify-between gap-3 bg-canvas px-5 py-4"
                key={label}
              >
                <dt className="tag">{label}</dt>
                <dd className="readout text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band border-t border-hairline">
        <div className="shell grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          {/* ------------------------------------------------------- form */}
          <div className="flex flex-col gap-8" data-reveal="up">
            <div className="flex items-center gap-4">
              <span className="tag-brand">01</span>
              <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
              <span className="tag">Request a demo</span>
            </div>

            <form className="flex flex-col gap-6" noValidate={false} onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                {contactPage.fields.map((field) => (
                  <div
                    className={
                      field.id === "email" || field.id === "name"
                        ? "flex flex-col gap-2"
                        : "flex flex-col gap-2"
                    }
                    key={field.id}
                  >
                    <Label htmlFor={field.id} required={field.required}>
                      {field.label}
                    </Label>
                    <input
                      autoComplete={
                        { name: "name", company: "organization", role: "organization-title", email: "email", phone: "tel" }[
                          field.id
                        ]
                      }
                      className={FIELD_CLASS}
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      type={field.type}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <Label htmlFor="region" required>
                    Region
                  </Label>
                  <select className={FIELD_CLASS} defaultValue="" id="region" name="region" required>
                    <option disabled value="">
                      Select a region
                    </option>
                    {contactPage.regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="industry" required>
                    Industry
                  </Label>
                  <select
                    className={FIELD_CLASS}
                    defaultValue=""
                    id="industry"
                    name="industry"
                    required
                  >
                    <option disabled value="">
                      Select an industry
                    </option>
                    {contactPage.industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" required={false}>
                  What would you like monitored?
                </Label>
                <textarea
                  className={`${FIELD_CLASS} h-36 resize-y py-3 leading-relaxed`}
                  id="message"
                  name="message"
                  placeholder="e.g. two extrusion lines and a chiller plant in RAK — we suspect idle running overnight."
                />
                <p className="text-xs text-ink-faint">
                  Machine count, site location, and what you already measure all help us prepare.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-brand min-w-44" disabled={isSending} type="submit">
                  {isSending ? (
                    <>
                      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Request a demo
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-ink-faint">
                  We never share your details. No PLC or network access is requested.
                </p>
              </div>

              <div aria-live="polite" role="status">
                {status === "success" ? (
                  <p className="flex items-center gap-3 border border-brand/50 bg-brand/8 px-4 py-3 text-sm text-brand">
                    <Check aria-hidden="true" className="size-4 shrink-0" />
                    {successMessage}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="flex items-center gap-3 border border-fault/50 bg-fault/8 px-4 py-3 text-sm text-fault">
                    <AlertTriangle aria-hidden="true" className="size-4 shrink-0" />
                    {errorMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          {/* ---------------------------------------------------- direct */}
          <aside className="flex flex-col gap-8">
            <div className="flex flex-col gap-5" data-reveal="up">
              <div className="flex items-center gap-4">
                <span className="tag-brand">02</span>
                <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
                <span className="tag">Speak directly</span>
              </div>

              <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
                {contactPage.direct.map((entry) => (
                  <li className="flex items-start gap-4 py-4" key={entry.label}>
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-hairline text-brand">
                      <KuroshioIcon className="size-3.5" name={entry.icon} strokeWidth={1.6} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="tag">{entry.label}</span>
                      {entry.links.map((link) => (
                        <a
                          className="readout w-fit text-sm text-ink transition-colors hover:text-brand"
                          href={link.href}
                          key={link.href}
                        >
                          {link.value}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4" data-reveal="up">
              <span className="tag">Offices</span>
              <div className="grid gap-px border border-hairline bg-hairline">
                {contactPage.offices.map((office) => (
                  <div className="flex flex-col gap-2 bg-canvas p-5" key={office.city}>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 bg-brand" />
                      <span className="text-sm font-semibold tracking-tight text-ink">
                        {office.city}
                      </span>
                    </div>
                    <address className="text-[0.8125rem] leading-relaxed text-ink-dim not-italic">
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

            <div className="panel corner-marks flex flex-col gap-3 p-6" data-reveal="scale">
              <span className="tag-brand">Data handling</span>
              <p className="text-[0.8125rem] leading-relaxed text-ink-dim">
                Telemetry is processed in Azure UAE North. We never connect to your
                corporate network and we never write to your control system.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
