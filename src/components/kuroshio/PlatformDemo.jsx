import { Player } from "@remotion/player";
import { Maximize2, Minimize2, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DemoPoster } from "@/components/kuroshio/DemoPoster";
import { PageLink } from "@/components/kuroshio/PageLink";
import { KuroshioDemo } from "@/remotion/KuroshioDemo";
import { CHAPTERS, VIDEO } from "@/remotion/theme";
import { cn } from "@/lib/utils";

function PlayerFailure({ onFailure }) {
  // A composition can fail before the parent's player listeners are attached.
  useEffect(() => onFailure(true), [onFailure]);
  return null;
}

// The energy scene counts its idle cost from local frame 76 to 132 (SceneEnergy's useRamp).
const IDLE_COST = 16.5;
const idleCostAt = (frame) => (frame === 0 ? 1 : Math.min(1, Math.max(0, (frame - 76) / 56))) * IDLE_COST;
const clamp01 = (value) => Math.min(1, Math.max(0, value));

export function PlatformDemo({ heading }) {
  const playerRef = useRef(null);
  const wrapperRef = useRef(null);
  const manuallyPausedRef = useRef(false);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 1023px)").matches);
  const width = compact ? 720 : VIDEO.width;
  const height = compact ? VIDEO.height : VIDEO.height - 48;
  // Overlaid controls have to be paid for in composition padding, and a DOM
  // button's size in composition units grows as the stage shrinks — 60px at
  // 1000px wide, 136px at 320px. Reserving the worst case left a dead band
  // under every scene on wider phones, so compact docks them under the stage.
  const overlayControls = !compact || fullscreen;
  const ended = frame >= VIDEO.durationInFrames - 1 && !playing;
  const idle = !playing && !frame;
  const active = CHAPTERS.findLast((chapter) => frame >= chapter.from) ?? CHAPTERS[0];
  const label = ended ? "Replay demo" : playing ? "Pause demo" : frame ? "Resume demo" : "Play demo";
  const PlaybackIcon = ended ? RotateCcw : playing ? Pause : Play;

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return undefined;
    const onFrame = (event) => setFrame(event.detail.frame);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setFrame(VIDEO.durationInFrames - 1);
    };
    const onError = () => setFailed(true);
    player.addEventListener("frameupdate", onFrame);
    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);
    player.addEventListener("ended", onEnded);
    player.addEventListener("error", onError);
    return () => {
      player.removeEventListener("frameupdate", onFrame);
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
      player.removeEventListener("ended", onEnded);
      player.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visibleRatio = 0;
    const onResize = (event) => setCompact(event.matches);
    const onFullscreen = () => setFullscreen(document.fullscreenElement === wrapperRef.current);
    const syncPlayback = () => {
      const player = playerRef.current;
      if (!player) return;
      if (visibleRatio === 0 || document.hidden) player.pause();
      else if (visibleRatio >= 0.6 && !reducedMotion.matches && !manuallyPausedRef.current && player.getCurrentFrame() < VIDEO.durationInFrames - 1) {
        player.play();
      }
    };
    const onVisibility = () => {
      if (document.hidden || reducedMotion.matches) playerRef.current?.pause();
      else syncPlayback();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visibleRatio = entry.isIntersecting ? entry.intersectionRatio : 0;
      syncPlayback();
    }, { threshold: [0, 0.6], rootMargin: "-69px 0px 0px" });
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    media.addEventListener("change", onResize);
    reducedMotion.addEventListener("change", onVisibility);
    document.addEventListener("fullscreenchange", onFullscreen);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onResize);
      reducedMotion.removeEventListener("change", onVisibility);
      document.removeEventListener("fullscreenchange", onFullscreen);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  function toggle() {
    const player = playerRef.current;
    if (!player) return;
    manuallyPausedRef.current = player.isPlaying();
    if (manuallyPausedRef.current) player.pause();
    else {
      if (ended) player.seekTo(0);
      player.play();
    }
  }

  function seekChapter(chapter) {
    const player = playerRef.current;
    if (!player) return;
    manuallyPausedRef.current = false;
    // Clear Remotion's deferred seek-resume before starting the new chapter.
    player.pause();
    player.seekTo(chapter.from);
    setFrame(chapter.from);
    player.play();
  }

  async function toggleFullscreen() {
    setFullscreenError("");
    try {
      if (fullscreen) await document.exitFullscreen();
      else await wrapperRef.current?.requestFullscreen();
    } catch {
      setFullscreenError("Full screen isn't available. You can still watch the demo here.");
    }
  }

  if (failed) return <DemoPoster failed />;

  const playbackButton = (
    <button
      aria-label={label}
      className={cn("demo-control", overlayControls && "absolute top-3 right-3 lg:-translate-y-1/2")}
      data-idle={idle}
      onClick={toggle}
      /* Align with the desktop scene heading in composition coordinates. */
      style={compact ? undefined : { top: `${(62 / height) * 100}%`, right: `${(88 / width) * 100}%` }}
      type="button"
    >
      <PlaybackIcon aria-hidden="true" className="size-4" />
    </button>
  );

  const fullscreenButton = document.fullscreenEnabled && (
    <button
      aria-label={fullscreen ? "Exit full screen" : "Full screen"}
      className={cn("demo-control", overlayControls && "absolute right-3 bottom-3")}
      onClick={toggleFullscreen}
      style={compact || fullscreen ? undefined : { bottom: `calc(${(48 / height) * 100}% - 20px)` }}
      type="button"
    >
      {fullscreen ? <Minimize2 aria-hidden="true" className="size-4" /> : <Maximize2 aria-hidden="true" className="size-4" />}
    </button>
  );

  return (
    <figure className="demo-player m-0 lg:mx-auto" ref={wrapperRef} style={{ "--demo-ratio": width / height }}>
      <div className="demo-details mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        {heading}
        <p className="m-0 flex items-baseline gap-3">
          <span className="text-sm text-ink-dim">Idle running found today</span>
          <span className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none font-bold tracking-[-0.03em] text-flare tabular-nums">
            AED {idleCostAt(frame).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="demo-stage panel relative overflow-hidden" aria-label="Product demo">
        <div aria-hidden="true">
          <Player
            component={KuroshioDemo}
            compositionHeight={height}
            compositionWidth={width}
            controls={false}
            durationInFrames={VIDEO.durationInFrames}
            fps={VIDEO.fps}
            initiallyMuted
            moveToBeginningWhenEnded={false}
            ref={playerRef}
            renderLoading={() => <DemoPoster embedded />}
            errorFallback={() => <PlayerFailure onFailure={setFailed} />}
            spaceKeyToPlayOrPause={false}
            style={{ width: "100%", aspectRatio: width + " / " + height }}
          />
        </div>

        {ended && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-canvas/95 px-6 text-center">
            <h3 className="font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-none font-bold tracking-[-0.03em] text-ink">
              See this on your own machines.
            </h3>
            <p className="max-w-md text-base text-ink-dim">A four-week pilot on one line, read against your tariff and your shifts.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <PageLink className="btn-brand" page="contact">Start a pilot</PageLink>
              <button className="btn-ghost" onClick={toggle} type="button">Watch again</button>
            </div>
          </div>
        )}
        {overlayControls && !ended && playbackButton}
        {overlayControls && fullscreenButton}
      </div>

      {!overlayControls && (
        <div className="demo-details mt-2 flex items-center gap-2">
          {playbackButton}
          {fullscreenButton}
        </div>
      )}

      <nav aria-label="Demo chapters" className="demo-details mt-1 grid grid-cols-3 gap-1">
        {CHAPTERS.map((chapter) => (
          <button
            aria-current={chapter.id === active.id ? "step" : undefined}
            className={cn(
              "relative min-h-11 overflow-hidden bg-canvas px-2 pt-2 pb-3 text-center text-[0.8125rem] font-medium leading-snug transition-colors sm:text-sm",
              chapter.id === active.id ? "text-brand" : "text-ink-dim hover:text-ink"
            )}
            key={chapter.id}
            onClick={() => seekChapter(chapter)}
            type="button"
          >
            {chapter.label}
            {/* Each step fills as its part of the film plays; the poster frame counts as unstarted. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left bg-brand"
              style={{ transform: `scaleX(${frame ? clamp01((frame - chapter.from) / chapter.duration) : 0})` }}
            />
          </button>
        ))}
      </nav>
      <figcaption className="demo-details mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <p aria-live="polite" aria-atomic="true" className="m-0 text-ink-dim">{active.summary}</p>
        <p className="m-0 text-ink-faint">Illustrative data, not a specific customer.</p>
        {fullscreenError && <p role="status" className="text-sm text-ink-dim">{fullscreenError}</p>}
      </figcaption>
    </figure>
  );
}
