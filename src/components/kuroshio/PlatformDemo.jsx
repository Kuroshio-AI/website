import { Player } from "@remotion/player";
import { Maximize2, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DemoPoster } from "@/components/kuroshio/DemoPoster";
import { KuroshioDemo } from "@/remotion/KuroshioDemo";
import { CHAPTERS, VIDEO } from "@/remotion/theme";
import { cn } from "@/lib/utils";

const PLAYER_STYLE = {
  width: "100%",
  aspectRatio: `${VIDEO.width} / ${VIDEO.height}`,
};

function formatTime(frame) {
  const seconds = frame / VIDEO.fps;
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    Math.floor(seconds % 60)
  ).padStart(2, "0")}`;
}

export function PlatformDemo() {
  const playerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);

  const activeIndex = CHAPTERS.reduce(
    (acc, chapter, index) => (frame >= chapter.from ? index : acc),
    0
  );
  const active = CHAPTERS[activeIndex];

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return undefined;

    const onFrame = (event) => setFrame(event.detail.frame);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    player.addEventListener("frameupdate", onFrame);
    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);

    return () => {
      player.removeEventListener("frameupdate", onFrame);
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
    };
  }, []);

  // Autoplay once when the demo scrolls into view; pause whenever it leaves.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return undefined;
    // Don't spend a mobile visitor's battery on an unrequested render loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (!window.matchMedia("(min-width: 768px)").matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current;
        if (!player) return;
        if (entry.isIntersecting) {
          if (!hasAutoStarted) {
            player.play();
            setHasAutoStarted(true);
          }
        } else if (player.isPlaying()) {
          player.pause();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAutoStarted]);

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    setHasAutoStarted(true);
    if (player.isPlaying()) player.pause();
    else player.play();
  }, []);

  const seekChapter = useCallback((chapter) => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(chapter.from);
    setFrame(chapter.from);
    setHasAutoStarted(true);
    player.play();
  }, []);

  const restart = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(0);
    setFrame(0);
    player.play();
  }, []);

  const fullscreen = useCallback(() => {
    playerRef.current?.requestFullscreen();
  }, []);

  const player = useMemo(
    () => (
      <Player
        className="!w-full"
        component={KuroshioDemo}
        compositionHeight={VIDEO.height}
        compositionWidth={VIDEO.width}
        controls={false}
        durationInFrames={VIDEO.durationInFrames}
        fps={VIDEO.fps}
        loop
        ref={playerRef}
        renderLoading={() => <DemoPoster />}
        spaceKeyToPlayOrPause={false}
        style={PLAYER_STYLE}
      />
    ),
    []
  );

  return (
    <figure className="m-0" ref={wrapperRef}>
      <div className="panel corner-marks overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
            <span className="tag text-ink-dim">Interactive walkthrough</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="readout text-xs text-ink-faint">
              {formatTime(frame)} / {formatTime(VIDEO.durationInFrames)}
            </span>
            <button
              className="tag transition-colors hover:text-brand"
              onClick={fullscreen}
              type="button"
            >
              <Maximize2 aria-hidden="true" className="size-4" />
              <span className="sr-only">Play the walkthrough full screen</span>
            </button>
          </div>
        </div>

        {player}

        <div className="flex items-center gap-4 border-t border-hairline px-4 py-3">
          <button
            aria-label={playing ? "Pause the walkthrough" : "Play the walkthrough"}
            className="flex size-10 items-center justify-center border border-hairline-strong text-brand transition-colors hover:border-brand hover:bg-brand/10"
            onClick={toggle}
            type="button"
          >
            {playing ? (
              <Pause aria-hidden="true" className="size-4" fill="currentColor" />
            ) : (
              <Play aria-hidden="true" className="size-4" fill="currentColor" />
            )}
          </button>
          <button
            aria-label="Restart the walkthrough"
            className="flex size-10 items-center justify-center border border-hairline text-ink-dim transition-colors hover:border-brand hover:text-brand"
            onClick={restart}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="tag truncate text-ink-faint">
              Now playing · {active.index} {active.label}
            </p>
          </div>
          <button
            className="tag shrink-0 border border-hairline px-3 py-2 text-ink-dim transition-colors hover:border-brand hover:text-brand sm:hidden"
            onClick={fullscreen}
            type="button"
          >
            Full screen
          </button>
        </div>
      </div>

      <nav aria-label="Walkthrough chapters" className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
        {CHAPTERS.map((chapter, index) => {
          const isActive = index === activeIndex;
          const progress = isActive
            ? Math.min(1, Math.max(0, (frame - chapter.from) / chapter.duration))
            : frame > chapter.from
              ? 1
              : 0;

          return (
            <button
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "group relative overflow-hidden border px-3 py-3 text-left transition-colors",
                isActive
                  ? "border-brand/60 bg-brand/8"
                  : "border-hairline hover:border-hairline-strong"
              )}
              key={chapter.id}
              onClick={() => seekChapter(chapter)}
              type="button"
            >
              <span className={cn("tag block", isActive && "text-brand")}>{chapter.index}</span>
              <span
                className={cn(
                  "mt-1 block text-sm leading-tight font-medium tracking-tight transition-colors",
                  isActive ? "text-ink" : "text-ink-dim group-hover:text-ink"
                )}
              >
                {chapter.label}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand transition-transform duration-150"
                style={{ transform: `scaleX(${progress})` }}
              />
            </button>
          );
        })}
      </nav>

      <figcaption className="mt-3 text-xs text-ink-faint">
        Rendered live with Remotion. Figures are illustrative of a typical
        single-line deployment, not a specific customer.
      </figcaption>
    </figure>
  );
}
