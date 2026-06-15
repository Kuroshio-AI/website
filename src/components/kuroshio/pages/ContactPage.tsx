import { ArrowRight } from "lucide-react";

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

export function ContactPage(_props: Readonly<ContactPageProps>) {
  const { submitted, handleSubmit } = useContactForm();

  return (
    <main>
      <section className="relative overflow-hidden bg-hero-navy px-gutter py-section-gap-md text-center text-surface-container-lowest">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,var(--secondary-fixed)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{contactPage.hero.title}</h1>
          <p className="mt-stack-md max-w-2xl text-lg leading-8 text-primary-fixed md:text-xl">{contactPage.hero.description}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-gutter py-section-gap-md lg:grid-cols-3">
        <Card className="border-border-cool bg-surface-container-lowest p-0 shadow-sm lg:col-span-2">
          <CardContent className="p-8">
            {submitted && (
              <div className="mb-8 rounded-lg border border-secondary bg-surface-teal p-4">
                <div className="flex items-start gap-3">
                  <KuroshioIcon className="mt-1 size-5 text-secondary" name="check" />
                  <div>
                    <h2 className="font-bold text-on-secondary-container">Message Sent</h2>
                    <p className="mt-1 text-base leading-6 text-on-secondary-container">
                      Thank you. Our technical team will be in touch shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {contactPage.fields.map((field) => (
                  <div className="space-y-2" key={field.id}>
                    <Label className="text-on-surface" htmlFor={field.id}>
                      {field.label} {field.required && <span className="text-critical">*</span>}
                    </Label>
                    <Input
                      className="h-12 rounded-lg border-border-cool bg-surface-container-lowest px-4 text-on-surface focus-visible:border-secondary focus-visible:ring-secondary/30"
                      id={field.id}
                      required={field.required}
                      type={field.type}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label className="text-on-surface">Country / Region</Label>
                  <Select>
                    <SelectTrigger className="h-12 w-full rounded-lg border-border-cool bg-surface-container-lowest px-4 text-on-surface focus:ring-secondary/30">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactPage.regions.map((region) => (
                        <SelectItem key={region} value={region.toLowerCase().replaceAll(" ", "-")}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-on-surface">
                    Primary Industry <span className="text-critical">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-12 w-full rounded-lg border-border-cool bg-surface-container-lowest px-4 text-on-surface focus:ring-secondary/30">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactPage.industries.map((industry) => (
                        <SelectItem key={industry} value={industry.toLowerCase().replaceAll(" ", "-")}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-on-surface" htmlFor="message">
                  How can we help?
                </Label>
                <Textarea
                  className="min-h-32 rounded-lg border-border-cool bg-surface-container-lowest px-4 py-3 text-on-surface focus-visible:border-secondary focus-visible:ring-secondary/30"
                  id="message"
                />
              </div>

              <div className="flex justify-end border-t border-border-cool pt-4">
                <Button className="h-12 rounded-lg bg-secondary px-8 text-on-secondary hover:bg-secondary/90" type="submit">
                  Request a Demo
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <aside className="space-y-8">
          <Card className="border-border-cool bg-surface-container-low p-0">
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-on-surface">
                <KuroshioIcon className="size-5 text-outline" name="mail" />
                Direct Contact
              </h2>
              <div className="space-y-4">
                {contactPage.direct.map((item) => (
                  <div key={item.value}>
                    <p className="mb-1 text-sm text-outline">{item.label}</p>
                    <a className="font-medium text-primary transition-colors hover:text-secondary" href={`mailto:${item.value}`}>
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border-cool bg-surface-container-lowest p-0 shadow-sm">
            <KuroshioIcon className="absolute right-5 top-5 size-20 text-outline opacity-10" name="building" />
            <CardContent className="relative z-10 p-6">
              <h2 className="mb-6 text-2xl font-bold text-on-surface">Global Offices</h2>
              <div className="space-y-6">
                {contactPage.offices.map((office) => (
                  <div key={office.city}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`size-2 rounded-full ${office.tone === "secondary" ? "bg-secondary" : "bg-primary"}`} />
                      <h3 className="font-bold text-on-surface">{office.city}</h3>
                    </div>
                    <p className="ml-1 border-l-2 border-surface-container-high pl-4 leading-7 text-on-surface-variant">
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
