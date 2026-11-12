import Lenis from "lenis";

import { ScrollTrigger, gsap } from "@/lib/motion";
import { getScrollBehavior } from "@/lib/utils";

/**
 * Eased wheel scrolling for the whole site.
 *
 * Lenis drives the real `scrollTop` rather than transforming a wrapper, which
 * is why it is used here instead of GSAP's ScrollSmoother: the site has three
 * `position: sticky` rails (the header, the home capability index, the
 * platform section nav) and sticky does not work inside a transformed
 * ancestor. Keeping native scroll also leaves find-in-page, scroll restoration
 * and IntersectionObserver behaving normally.
 */

let lenis = null;
let tick = null;
let cleanupDemoSnap = null;

function startDemoSnap(scroll) {
  let wheelDelta = 0;
  let lastWheelAt = 0;
  let gestureStartY = 0;
  let snapFrame = 0;
  const onWheel = ({ deltaY, event }) => {
    const now = performance.now();
    if (now - lastWheelAt > 120 || wheelDelta * deltaY <= 0) gestureStartY = scroll.actualScroll;
    cancel();
    wheelDelta = event.type === "wheel" && !event.ctrlKey && !event.lenisStopPropagation ? deltaY : 0;
    lastWheelAt = now;
  };
  const cancel = () => {
    wheelDelta = 0;
    cancelAnimationFrame(snapFrame);
    snapFrame = 0;
    if (scroll.userData.initiator === "demo-snap") {
      scroll.scrollTo(scroll.actualScroll, { immediate: true });
    }
  };
  const snapToDemo = () => {
    if (scroll.isStopped) return;
    const direction = wheelDelta;
    const demo = document.querySelector("figure.demo-player");
    if (!demo || window.innerWidth < 1024 || document.fullscreenElement) {
      return;
    }

    // Use the live layout: the lazy player and viewport can change its position.
    // Its scroll-margin clears the sticky header and section rail.
    const top = parseFloat(getComputedStyle(demo).scrollMarginTop) || 0;
    const rect = demo.getBoundingClientRect();
    const distance = rect.top - top;
    const target = scroll.actualScroll + distance;
    const captureDistance = Math.min(window.innerHeight * 0.55, 560);
    if (Math.abs(distance) > captureDistance) return;
    // Snap on every approach, but let gestures starting at the aligned position leave.
    const approachDistance = target - gestureStartY;
    if (rect.height > window.innerHeight - top - 16 || Math.abs(approachDistance) < 4 || approachDistance * direction <= 0) return;
    wheelDelta = 0;
    // Ease out from the glide's own momentum so the settle reads as one long, soft stop.
    scroll.scrollTo(target, {
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      userData: { initiator: "demo-snap" },
    });
  };
  const onScroll = () => {
    // Catch the approach after a brief input pause, before Lenis finishes gliding.
    if (!wheelDelta || performance.now() - lastWheelAt < 120 || snapFrame) return;
    // Start outside Lenis's current animation callback so it cannot reset the snap.
    snapFrame = requestAnimationFrame(() => {
      snapFrame = 0;
      snapToDemo();
    });
  };
  const onScrollEnd = () => {
    if (scroll.isScrolling === "smooth") return;
    snapToDemo();
    wheelDelta = 0;
  };
  const interruptions = ["keydown", "pointerdown", "touchstart", "hashchange", "resize", "fullscreenchange"];
  scroll.on("virtual-scroll", onWheel);
  scroll.on("scroll", onScroll);
  window.addEventListener("scrollend", onScrollEnd);
  interruptions.forEach((event) => window.addEventListener(event, cancel, { passive: true }));
  return () => {
    cancel();
    scroll.off("virtual-scroll", onWheel);
    scroll.off("scroll", onScroll);
    window.removeEventListener("scrollend", onScrollEnd);
    interruptions.forEach((event) => window.removeEventListener(event, cancel));
  };
}

function create() {
  if (lenis) return;

  lenis = new Lenis({
    // Long enough to read as a glide, short enough that a flick still lands
    // roughly where the reader aimed.
    duration: 1.05,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    // Only the wheel is eased. Touch keeps the platform's own physics, and
    // keyboard paging stays native so a PageDown still lands immediately.
    smoothWheel: true,
    syncTouch: false,
  });

  // Keep scroll-driven animations on the same frame as Lenis.
  lenis.on("scroll", ScrollTrigger.update);
  cleanupDemoSnap = startDemoSnap(lenis);
  tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function destroy() {
  if (!lenis) return;
  cleanupDemoSnap();
  cleanupDemoSnap = null;
  gsap.ticker.remove(tick);
  gsap.ticker.lagSmoothing(500, 33);
  lenis.destroy();
  lenis = null;
  tick = null;
}

/**
 * Start smooth scrolling, and keep following the reduced-motion setting for as
 * long as the page is open — toggling it mid-session hands scrolling straight
 * back to the browser. Returns a cleanup function.
 */
export function startSmoothScroll() {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sync = () => (media.matches ? destroy() : create());

  sync();
  media.addEventListener("change", sync);

  return () => {
    media.removeEventListener("change", sync);
    destroy();
  };
}

/** Programmatic scrolls go through Lenis so they never fight the glide. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: getScrollBehavior() });
}

export function scrollToSection(el) {
  if (!el) return;
  if (!lenis) {
    el.scrollIntoView({ behavior: getScrollBehavior() });
    return;
  }
  // Lenis reads the element's scroll-margin; an extra offset would double it.
  lenis.scrollTo(el);
}

/** Freeze the page behind a full-screen overlay such as the mobile menu. */
export function setScrollLocked(locked) {
  if (locked) lenis?.stop();
  else lenis?.start();
}
