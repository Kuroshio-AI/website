import { AlertTriangle, ArrowRight, Check, Loader2 } from "lucide-react";
import { useRef } from "react";

import { PILOT_NOTE_KEY } from "@/components/kuroshio/home/HomeSections";
import { contactPage } from "@/data/mockData";
import { useContactForm } from "@/hooks/useContactForm";
import { usePageMotion } from "@/hooks/usePageMotion";

const FIELD_CLASS =
  "h-11 w-full bg-panel px-3.5 text-base text-ink transition-colors placeholder:text-ink-faint " +
  "hover:bg-white focus:bg-white focus:outline-2 focus:outline-offset-0 focus:outline-brand";

const PROMISES = [
  ["Response time", "Within one business day"],
  ["Platform pilot", "One machine, four weeks"],
  ["Pilot's maximum risk", "AED 1,500, 75% refunded"],
  ["KTrack demo", "On your own register"],
];

const ROW_CLASS =
  "grid gap-x-8 gap-y-1 bg-white/[0.06] px-4 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline";

function Label({ htmlFor, children, required }) {
  return (
    <label
      className="flex items-center gap-1.5 text-[0.9375rem] font-medium"
      htmlFor={htmlFor}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-brand">
          *
        </span>
      ) : (
        <span className="font-normal text-ink-dim">(optional)</span>
      )}
    </label>
  );
}

// The home page's pilot dialog leaves its choice here for the message field.
function readPilotNote() {
  try {
    return sessionStorage.getItem(PILOT_NOTE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

export function ContactPage() {
  const rootRef = useRef(null);
  usePageMotion(rootRef);
  const { errorMessage, status, successMessage, handleSubmit } =
    useContactForm();
  const isSending = status === "sending";

  return (
    <main className="outline-none" ref={rootRef} tabIndex={-1}>
      <section className="shell grid gap-10 pt-8 pb-20 md:pt-10 md:pb-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1
            className="max-w-[12ch] font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.035em] text-ink"
            data-reveal="up"
          >
            {contactPage.hero.title}
          </h1>
          <p
            className="lede max-w-xl"
            data-reveal="up"
            data-reveal-delay="0.08"
          >
            {contactPage.hero.description}
          </p>

          <dl
            className="mt-4 flex flex-col gap-1 bg-panel p-2 lg:mt-auto"
            data-reveal="up"
            data-reveal-delay="0.14"
          >
            {PROMISES.map(([label, value]) => (
              <div
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-canvas px-4 py-3"
                key={label}
              >
                <dt className="text-[0.9375rem] text-ink-dim">{label}</dt>
                <dd className="text-base font-semibold text-brand">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* --------------------------------------------------------- form */}
        <div
          className="bg-canvas-sunk p-6 md:p-8"
          data-reveal="scale"
        >
          <h2 className="sr-only">Request a demo</h2>

          <form
            className="flex flex-col gap-4"
            noValidate={false}
            onSubmit={handleSubmit}
          >
            <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2 xl:grid-cols-3">
              {contactPage.fields.map((field) => (
                <div
                  className="flex flex-col gap-1.5"
                  key={field.id}
                >
                  <Label htmlFor={field.id} required={field.required}>
                    {field.label}
                  </Label>
                  <input
                    autoComplete={
                      {
                        name: "name",
                        company: "organization",
                        role: "organization-title",
                        email: "email",
                        phone: "tel",
                      }[field.id]
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

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="region" required>
                  Region
                </Label>
                <select
                  className={FIELD_CLASS}
                  defaultValue=""
                  id="region"
                  name="region"
                  required
                >
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

              <div className="flex flex-col gap-1.5 sm:col-span-2 xl:col-span-3">
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
                  {contactPage.industryGroups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message" required={false}>
                What do you need?
              </Label>
              <textarea
                className={`${FIELD_CLASS} h-24 resize-y py-2.5 leading-relaxed`}
                defaultValue={readPilotNote()}
                id="message"
                name="message"
                placeholder="e.g. two extrusion lines and a chiller plant in RAK. Asset count, site and what you already measure all help."
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                className="btn-brand min-w-44"
                disabled={isSending}
                type="submit"
              >
                {isSending ? (
                  <>
                    <Loader2
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                    Sending
                  </>
                ) : (
                  <>
                    Request a demo
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </>
                )}
              </button>
              <p className="text-sm text-ink-dim">
                We never share your details. No PLC or network access is
                requested.
              </p>
            </div>

            <div aria-live="polite" role="status">
              {status === "success" ? (
                <p className="flex items-center gap-3 bg-brand-soft px-4 py-3 text-base font-medium text-brand">
                  <Check aria-hidden="true" className="size-4 shrink-0" />
                  {successMessage}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="flex items-center gap-3 bg-fault-soft px-4 py-3 text-base text-fault">
                  <AlertTriangle
                    aria-hidden="true"
                    className="size-4 shrink-0"
                  />
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      {/* ----------------------------------------------------------- direct */}
      <section className="band bg-[#26251F] text-[#EDECE8]">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="display-lg" data-reveal="up">
              Or speak to us directly.
            </h2>
            <p
              className="lede max-w-xl text-[#EDECE8]"
              data-reveal="up"
              data-reveal-delay="0.08"
            >
              Readings are processed in Azure UAE North. We never connect to
              your corporate network and we never write to your control system.
            </p>
          </div>

          <dl
            className="flex flex-col gap-1"
            data-reveal="up"
            data-reveal-delay="0.1"
          >
            {contactPage.direct.map((entry) => (
              <div className={ROW_CLASS} key={entry.label}>
                <dt className="text-[0.9375rem] text-[#A9A79F]">{entry.label}</dt>
                <dd className="flex flex-col gap-1">
                  {entry.links.map((link) => (
                    <a
                      className="w-fit text-xl font-semibold tracking-tight transition-colors hover:text-[#7FA6F4]"
                      href={link.href}
                      key={link.href}
                    >
                      {link.value}
                    </a>
                  ))}
                </dd>
              </div>
            ))}
            {contactPage.offices.map((office) => (
              <div className={ROW_CLASS} key={office.city}>
                <dt className="text-[0.9375rem] text-[#A9A79F]">
                  {office.city} office
                </dt>
                <dd>
                  <address className="text-base leading-relaxed not-italic">
                    {office.address.map((line) => (
                      <span className="block" key={line}>
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
