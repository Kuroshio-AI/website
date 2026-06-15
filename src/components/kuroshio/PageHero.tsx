import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import type { PageId } from "@/data/mockData";

export interface PageHeroProps {
  readonly title: string;
  readonly description: string;
  readonly align?: "left" | "center";
  readonly image?: string;
  readonly imageAlt?: string;
  readonly action?: string;
  readonly onAction?: () => void;
  readonly secondaryAction?: string;
  readonly onSecondaryAction?: () => void;
  readonly children?: ReactNode;
  readonly targetPage?: PageId;
}

export function PageHero({
  title,
  description,
  align = "left",
  image,
  imageAlt = "",
  action,
  onAction,
  secondaryAction,
  onSecondaryAction,
  children,
}: Readonly<PageHeroProps>) {
  const centered = align === "center";

  return (
    <section className="relative overflow-hidden bg-hero-navy px-gutter py-section-gap-md text-surface-container-lowest">
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <svg className="size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,48 Q25,32 50,48 T100,48" fill="none" stroke="currentColor" strokeWidth="0.45" />
          <path d="M0,62 Q25,46 50,62 T100,62" fill="none" stroke="currentColor" strokeWidth="0.45" />
          <path d="M0,76 Q25,60 50,76 T100,76" fill="none" stroke="currentColor" strokeWidth="0.45" />
        </svg>
      </div>

      <div
        className={
          centered
            ? "relative z-10 mx-auto flex max-w-[1280px] flex-col items-center text-center"
            : "relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-section-gap-md lg:grid-cols-2"
        }
      >
        <div className={centered ? "max-w-4xl" : "max-w-2xl"}>
          <h1 className="text-4xl font-bold leading-tight text-surface-container-lowest md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-stack-md text-lg leading-8 text-primary-fixed-dim md:text-xl">{description}</p>
          {(action || secondaryAction) && (
            <div className="mt-stack-lg flex flex-wrap gap-stack-md">
              {action && (
                <Button
                  className="h-12 rounded-lg bg-secondary px-6 text-on-secondary hover:bg-secondary/90"
                  onClick={onAction}
                  type="button"
                >
                  {action}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  className="h-12 rounded-lg border-surface-container-lowest bg-transparent px-6 text-surface-container-lowest hover:bg-surface-container-lowest hover:text-hero-navy"
                  onClick={onSecondaryAction}
                  type="button"
                  variant="outline"
                >
                  {secondaryAction}
                </Button>
              )}
            </div>
          )}
          {children}
        </div>

        {image && (
          <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-primary-fixed-dim/30 bg-primary-container p-2 shadow-2xl md:min-h-[400px]">
            <img alt={imageAlt} className="size-full rounded-lg object-cover opacity-75 mix-blend-luminosity" src={image} />
            <div className="absolute inset-0 bg-gradient-to-t from-hero-navy/85 via-hero-navy/25 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-secondary-fixed/50 bg-hero-navy/40 p-5 text-secondary-fixed shadow-2xl">
                <KuroshioIcon className="size-14" name="network" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
