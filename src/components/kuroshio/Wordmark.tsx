import { cn } from "@/lib/utils";

export function Wordmark({ className }: Readonly<{ className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.05em] text-ink",
        className
      )}
    >
      <img alt="" aria-hidden="true" className="size-9 shrink-0 object-contain" src="/kuroshio/logo-cropped.png" />
      <span>
        Kuroshio<span className="text-brand">AI</span>
      </span>
    </span>
  );
}
