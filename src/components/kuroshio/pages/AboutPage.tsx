import { Card, CardContent } from "@/components/ui/card";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import { aboutPage } from "@/data/mockData";
import type { IconKey } from "@/data/mockData";

export interface AboutPageProps {
  readonly onNavigate?: () => void;
}

export function AboutPage(_props: Readonly<AboutPageProps>) {
  return (
    <main>
      <section className="relative overflow-hidden bg-hero-navy px-gutter py-section-gap-md text-surface-container-lowest">
        <div className="absolute inset-0 opacity-10">
          <svg className="size-full">
            <defs>
              <pattern height="40" id="about-grid" patternUnits="userSpaceOnUse" width="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect fill="url(#about-grid)" height="100%" width="100%" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{aboutPage.hero.title}</h1>
          <p className="mt-stack-md max-w-2xl text-lg leading-8 text-surface-dim md:text-xl">{aboutPage.hero.description}</p>
        </div>
      </section>

      <section className="bg-surface px-gutter py-section-gap-md">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-gutter md:grid-cols-12">
          <aside className="h-fit border-l-2 border-secondary pl-6 md:col-span-4 md:sticky md:top-32">
            <h2 className="mb-stack-md text-3xl font-bold text-primary md:text-4xl">{aboutPage.story.title}</h2>
            <p className="text-base leading-7 text-on-surface-variant">{aboutPage.story.aside}</p>
          </aside>
          <div className="space-y-stack-lg text-lg leading-8 text-on-surface md:col-span-8">
            {aboutPage.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="rounded-xl border border-secondary-container bg-surface-teal p-stack-lg">
              <h3 className="mb-stack-sm flex items-center gap-2 text-2xl font-bold text-secondary">
                <KuroshioIcon className="size-6" name="factory" />
                {aboutPage.story.calloutTitle}
              </h3>
              <p className="text-base leading-7 text-on-secondary-fixed-variant">{aboutPage.story.calloutBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border-cool bg-surface-light px-gutter py-section-gap-md">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-stack-lg text-center text-3xl font-bold text-primary">Recognized & Supported By</h2>
          <div className="grid grid-cols-2 gap-gutter md:grid-cols-4">
            {aboutPage.credentials.map(([name, detail]) => (
              <Card className="h-32 border-border-cool bg-surface-container-lowest p-0 text-center shadow-sm" key={name}>
                <CardContent className="flex size-full flex-col items-center justify-center p-stack-lg">
                  <span className="font-semibold text-on-surface">{name}</span>
                  <span className="text-sm text-outline">{detail}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-gutter py-section-gap-md">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-section-gap-md max-w-3xl text-center">
            <h2 className="mb-stack-md text-3xl font-bold text-primary md:text-4xl">Leadership</h2>
            <p className="text-base leading-7 text-on-surface-variant">
              A multidisciplinary team of engineers, data scientists, and industrial experts.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3 lg:grid-cols-5">
            {aboutPage.leadership.map(([name, role]) => (
              <Card className="border-border-cool bg-surface-container-lowest p-0 transition-colors hover:border-secondary" key={name}>
                <CardContent className="p-stack-md">
                  <h3 className="text-xl font-bold text-on-surface">{name}</h3>
                  <p className="mt-1 text-sm font-medium text-secondary">{role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-gutter py-section-gap-md">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-stack-lg text-center text-3xl font-bold text-primary">Global Presence</h2>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {aboutPage.presence.map((location) => (
              <Card className="relative overflow-hidden border-border-cool bg-surface-container-lowest p-0" key={location.title}>
                <KuroshioIcon className="absolute right-5 top-5 size-16 text-outline opacity-15" name={location.icon as IconKey} />
                <CardContent className="relative z-10 p-stack-lg">
                  <h3 className="mb-stack-sm text-2xl font-bold text-primary">{location.title}</h3>
                  <span className="mb-stack-md inline-block rounded-full bg-surface-teal px-3 py-1 text-sm font-semibold text-secondary">
                    {location.badge}
                  </span>
                  <p className="text-base leading-7 text-on-surface-variant">{location.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
