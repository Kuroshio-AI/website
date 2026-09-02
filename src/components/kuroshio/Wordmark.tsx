import { cn } from "@/lib/utils";

/**
 * The mark: three stacked current lines that bend around a fixed point —
 * the Kuroshio flowing past a plant.
 */
export function CurrentMark({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M2 9c6.5 0 6.5 6 13 6s6.5-6 13-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        opacity="0.45"
      />
      <path
        d="M2 16c6.5 0 6.5 6 13 6s6.5-6 13-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        opacity="0.75"
      />
      <path
        d="M2 23c6.5 0 6.5 6 13 6s6.5-6 13-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        opacity="0.3"
      />
      <circle cx="15" cy="15" fill="currentColor" r="2.4" />
    </svg>
  );
}

export function Wordmark({ className }: Readonly<{ className?: string }>) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <CurrentMark className="text-brand" />
      <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.05em] text-ink">
        Kuroshio<span className="text-brand">AI</span>
      </span>
    </span>
  );
}
