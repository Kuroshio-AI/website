import { KuroshioIcon } from "@/components/kuroshio/IconMap";
import type { IconKey, TrackId } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TrackOption {
  readonly id: TrackId;
  readonly label: string;
  readonly summary: string;
  readonly icon: IconKey;
}

interface TrackSwitchProps {
  readonly options: ReadonlyArray<TrackOption>;
  readonly value: TrackId;
  readonly onChange: (id: TrackId) => void;
  readonly className?: string;
}

/**
 * Mode selector for the two audience tracks.
 *
 * Built as a radiogroup rather than tabs: the two panels are the same page in
 * two states, not sibling documents, and arrow keys should move the selection
 * itself. Roving tabindex keeps the whole control one tab stop.
 */
export function TrackSwitch({ options, value, onChange, className }: Readonly<TrackSwitchProps>) {
  const move = (delta: number) => {
    const index = options.findIndex((option) => option.id === value);
    const next = options[(index + delta + options.length) % options.length];
    onChange(next.id);
    document.getElementById(`track-${next.id}`)?.focus();
  };

  return (
    <div
      aria-label="Choose the kind of site you run"
      className={cn(
        "grid gap-px border border-hairline bg-hairline sm:grid-cols-2",
        className
      )}
      onKeyDown={(event) => {
        const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
        if (!delta) return;
        event.preventDefault();
        move(delta);
      }}
      role="radiogroup"
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            aria-checked={active}
            className={cn(
              "group relative flex items-center gap-4 px-5 py-4 text-left transition-colors duration-300",
              "focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand",
              active ? "bg-panel" : "bg-canvas-sunk/60 hover:bg-panel"
            )}
            id={`track-${option.id}`}
            key={option.id}
            onClick={() => onChange(option.id)}
            role="radio"
            tabIndex={active ? 0 : -1}
            type="button"
          >
            {/* The same brand rule the hero stats draw on hover — here it marks
                which track is live, so the state reads without relying on fill. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 top-0 h-px origin-left bg-brand transition-transform duration-500 ease-out",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
            />
            <KuroshioIcon
              className={cn(
                "size-5 shrink-0 transition-colors duration-300",
                active ? "text-brand" : "text-ink-faint group-hover:text-ink-dim"
              )}
              name={option.icon}
              strokeWidth={1.5}
            />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span
                className={cn(
                  "text-sm font-semibold tracking-tight transition-colors duration-300",
                  active ? "text-ink" : "text-ink-dim"
                )}
              >
                {option.label}
              </span>
              <span className="truncate text-xs leading-snug text-ink-faint">
                {option.summary}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "readout ml-auto shrink-0 text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300",
                active ? "text-brand" : "text-transparent"
              )}
            >
              Live
            </span>
          </button>
        );
      })}
    </div>
  );
}
