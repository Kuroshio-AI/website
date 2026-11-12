import { useGSAP } from "@gsap/react";
import { type RefObject, useMemo, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/lib/motion";

interface Scene {
  readonly id: string;
  readonly build: (root: HTMLElement) => gsap.core.Timeline;
  readonly start: number;
  readonly duration: number;
}

interface SceneLoopProps {
  readonly css: string;
  readonly markup: string;
  readonly scenes: readonly Scene[];
  readonly width: number;
  readonly height: number;
  /** Where the loop rests when motion is reduced, in seconds. */
  readonly stillAt: number;
  readonly label: string;
  /** Called with the scene's index each time one starts. */
  readonly onScene?: (index: number) => void;
  /** Filled with a function that jumps the loop to a scene. */
  readonly jumpRef?: RefObject<((index: number) => void) | null>;
}

/** A ported HyperFrames loop: scenes back to back, scaled to the panel, playing only while on screen. */
export function SceneLoop({ css, markup, scenes, width, height, stillAt, label, onScene, jumpRef }: SceneLoopProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // React 19 rewrites innerHTML whenever this object changes, which would wipe GSAP's styles on re-render.
  const html = useMemo(() => ({ __html: markup }), [markup]);

  useGSAP(
    () => {
      const box = boxRef.current!;
      const stage = stageRef.current!;

      const fit = new ResizeObserver(() => {
        stage.style.transform = `scale(${box.clientWidth / width})`;
      });
      fit.observe(box);

      const master = gsap.timeline({ paused: true, repeat: -1 });
      scenes.forEach(({ id, build, start, duration }, index) => {
        const el = stage.querySelector<HTMLElement>(`#${id}`)!;
        gsap.set(el, { autoAlpha: 0 });
        // The context scopes any selector strings the scene passes straight to GSAP.
        let tl!: gsap.core.Timeline;
        gsap.context(() => {
          tl = build(el);
        }, el);
        master.add(tl.paused(false), start);
        master.set(el, { autoAlpha: 1 }, start).set(el, { autoAlpha: 0 }, start + duration);
        if (onScene) master.call(onScene, [index], start);
      });

      const reduced = prefersReducedMotion();
      if (jumpRef) {
        jumpRef.current = (index) => {
          const { start, duration } = scenes[index];
          // Moving: replay the scene from its entrance. Still: rest where the scene has settled.
          master.seek(reduced ? start + duration * 0.75 : start + 0.01, false);
          onScene?.(index);
        };
      }

      if (reduced) {
        master.seek(stillAt, false); // false: run onUpdate so counters land
        return () => fit.disconnect();
      }

      const seen = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) master.play();
        else master.pause();
      });
      seen.observe(box);
      return () => {
        fit.disconnect();
        seen.disconnect();
      };
    },
    { scope: boxRef }
  );

  return (
    <div
      aria-label={label}
      className="relative w-full overflow-hidden bg-[#26251F]"
      ref={boxRef}
      role="img"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <style>{css}</style>
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 origin-top-left"
        dangerouslySetInnerHTML={html}
        ref={stageRef}
        style={{ width, height, fontSize: 16, lineHeight: "normal", letterSpacing: "normal" }}
      />
    </div>
  );
}
