import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { contactPage } from "@/data/mockData";
import { useContactForm } from "@/hooks/useContactForm";

export interface ContactPageProps {
  readonly onNavigate?: () => void;
}

const inputClassName =
  "h-11 rounded-lg border-white/[0.08] bg-[#0e2040] px-4 text-sm text-[#eef4ff] placeholder:text-[#b4cdf0]/35 focus-visible:border-[#0e9e8e]/45 focus-visible:ring-[#0e9e8e]/18 disabled:opacity-30";

const selectTriggerClassName =
  "h-11 w-full rounded-lg border-white/[0.08] bg-[#0e2040] px-4 text-sm text-[#eef4ff] focus:ring-[#0e9e8e]/18 data-placeholder:text-[#b4cdf0]/35 disabled:opacity-30";

const labelClassName = "text-xs font-semibold uppercase tracking-[0.04em] text-[#b4cdf0]/65";

function toSelectValue(value: string) {
  return value.toLowerCase().replaceAll("&", "and").replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ContactPage(_props: Readonly<ContactPageProps>) {
  const { errorMessage, submitted, status, successMessage, handleSubmit } = useContactForm();
  const isSending = status === "sending";

  return (
    <main className="relative isolate overflow-hidden bg-[#112648] text-[#eef4ff]">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(14,158,142,0.10),transparent_42%),linear-gradient(180deg,rgba(27,58,107,0.35),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

      <section className="px-gutter pb-8 pt-12 text-center md:pb-10 md:pt-16">
        <div className="mx-auto max-w-[1180px]">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.08] text-[#eef4ff] md:text-5xl lg:text-6xl">
            Let's Start with <span className="text-[#82f6e3]">One Machine.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#b4cdf0]/68">
            {contactPage.hero.description}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 px-gutter pb-24 lg:grid-cols-[1fr_340px]">
        <Card className="rounded-2xl border-white/[0.08] bg-[#162f58]/55 p-0 text-[#eef4ff] shadow-[0_28px_70px_rgba(0,0,0,0.24)] backdrop-blur-md">
          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {status === "success" && (
                  <div className="flex items-start gap-3 rounded-xl border border-[#0e9e8e]/30 bg-[#0e9e8e]/10 p-4 md:col-span-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0e9e8e]">
                      <KuroshioIcon className="size-3 text-white" name="check" strokeWidth={2.6} />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-[#eef4ff]">Message Sent</h2>
                      <p className="mt-1 text-sm leading-6 text-[#b4cdf0]/68">
                        {successMessage}
                      </p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-start gap-3 rounded-xl border border-[#e05b5b]/30 bg-[#e05b5b]/10 p-4 md:col-span-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e05b5b]">
                      <KuroshioIcon className="size-3 text-white" name="mail" strokeWidth={2.6} />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-[#eef4ff]">Message Not Sent</h2>
                      <p className="mt-1 text-sm leading-6 text-[#b4cdf0]/68">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <fieldset className="contents" disabled={submitted || isSending}>
                  {contactPage.fields.map((field) => (
                    <div className="space-y-2" key={field.id}>
                      <Label className={labelClassName} htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="ml-1 text-[#82f6e3]">*</span>}
                      </Label>
                      <Input
                        className={inputClassName}
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        type={field.type}
                      />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label className={labelClassName}>Country / Region</Label>
                    <Select disabled={submitted || isSending} name="region">
                      <SelectTrigger className={selectTriggerClassName}>
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent className="border-white/[0.08] bg-[#112648] text-[#eef4ff]">
                        {contactPage.regions.map((region) => (
                          <SelectItem key={region} value={toSelectValue(region)}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className={labelClassName}>
                      Primary Industry <span className="ml-1 text-[#82f6e3]">*</span>
                    </Label>
                    <Select disabled={submitted || isSending} name="industry" required>
                      <SelectTrigger className={selectTriggerClassName}>
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent className="border-white/[0.08] bg-[#112648] text-[#eef4ff]">
                        {contactPage.industries.map((industry) => (
                          <SelectItem key={industry} value={toSelectValue(industry)}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className={labelClassName} htmlFor="message">
                      How can we help?
                    </Label>
                    <Textarea
                      className="min-h-28 resize-y rounded-lg border-white/[0.08] bg-[#0e2040] px-4 py-3 text-sm leading-7 text-[#eef4ff] placeholder:text-[#b4cdf0]/35 focus-visible:border-[#0e9e8e]/45 focus-visible:ring-[#0e9e8e]/18 disabled:opacity-30"
                      id="message"
                      name="message"
                      placeholder="Tell us about your facility, machines, or the problem you're trying to solve..."
                    />
                  </div>
                </fieldset>

                {!submitted && (
                  <div className="flex justify-end border-t border-white/[0.08] pt-5 md:col-span-2">
                    <Button
                      className="h-12 rounded-lg bg-[#0e9e8e] px-7 text-sm font-bold text-white shadow-[0_16px_35px_rgba(14,158,142,0.18)] hover:bg-[#0b8478]"
                      disabled={isSending}
                      type="submit"
                    >
                      {isSending ? "Sending..." : "Request a Demo"}
                      <KuroshioIcon className="size-4" name="arrowRight" />
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <aside className="space-y-6">
          <Card className="rounded-xl border-white/[0.08] bg-[#162f58]/45 p-0 text-[#eef4ff] backdrop-blur-md">
            <CardContent className="p-6">
              <h2 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#82f6e3]">
                <KuroshioIcon className="size-4" name="mail" strokeWidth={1.9} />
                Direct Contact
              </h2>
              <div className="space-y-5">
                {contactPage.direct.map((item) => (
                  <div key={item.value}>
                    <p className="mb-2 text-[0.68rem] uppercase tracking-[0.07em] text-[#b4cdf0]/35">{item.label}</p>
                    <a className="flex items-center gap-2 text-sm font-semibold text-[#eef4ff] transition-colors hover:text-[#82f6e3]" href={`mailto:${item.value}`}>
                      <KuroshioIcon className="size-4 text-[#b4cdf0]/35" name="mail" strokeWidth={1.8} />
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-lg border border-[#0e9e8e]/30 bg-[#0e9e8e]/12 px-4 py-3">
                <span className="size-2 rounded-full bg-[#0e9e8e]" />
                <p className="text-xs leading-5 text-[#b4cdf0]/68">
                  <strong className="font-bold text-[#82f6e3]">Typically responds</strong> within one business day
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-white/[0.08] bg-[#162f58]/45 p-0 text-[#eef4ff] backdrop-blur-md">
            <CardContent className="p-6">
              <h2 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#82f6e3]">
                <KuroshioIcon className="size-4" name="building" strokeWidth={1.9} />
                Global Offices
              </h2>
              <div className="divide-y divide-white/[0.08]">
                {contactPage.offices.map((office) => (
                  <div className="py-4 first:pt-0 last:pb-0" key={office.city}>
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#eef4ff]">
                      <span className="size-1.5 rounded-full bg-[#0e9e8e]" />
                      {office.city}
                    </div>
                    <p className="ml-1 border-l border-[#0e9e8e]/30 pl-4 text-xs leading-6 text-[#b4cdf0]/68">
                      {office.address.map((line) => (
                        <span className="block" key={line}>
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}
