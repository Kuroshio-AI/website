import { cn } from "@/lib/utils";

export function Wordmark({ className }: Readonly<{ className?: string }>) {
  return (
    <span
      className={cn(
        "font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.05em] text-ink",
        className
      )}
    >
      Kuroshio<span className="text-brand">AI</span>
    </span>
  );
}
