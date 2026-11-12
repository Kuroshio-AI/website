import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadProps {
  readonly index?: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly body?: ReactNode;
  readonly className?: string;
}

// `index` and `eyebrow` are accepted but no longer drawn: the heading carries
// the section on its own.
export function SectionHead({ title, body, className }: Readonly<SectionHeadProps>) {
  return (
    <header className={cn("flex flex-col gap-6", className)}>
      <h2 className="display-lg max-w-4xl" data-reveal="up">
        {title}
      </h2>
      {body ? (
        <p className="lede max-w-2xl" data-reveal="up" data-reveal-delay="0.08">
          {body}
        </p>
      ) : null}
    </header>
  );
}

export function Band({
  children,
  className,
  id,
  tone = "canvas",
}: Readonly<{
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "canvas" | "canvas-sunk";
}>) {
  return (
    <section
      className={cn(
        "band",
        tone === "canvas-sunk" ? "bg-canvas-sunk" : "bg-canvas",
        className
      )}
      id={id}
    >
      {children}
    </section>
  );
}

export function Stat({
  value,
  label,
  helper,
}: Readonly<{ value: ReactNode; label: string; helper?: string }>) {
  return (
    <div className="flex flex-col gap-2">
      <span className="readout text-3xl leading-none text-brand md:text-4xl">{value}</span>
      <span className="text-sm font-medium tracking-tight text-ink">{label}</span>
      {helper ? <span className="text-[0.8125rem] leading-snug text-ink-faint">{helper}</span> : null}
    </div>
  );
}
