import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Single source of truth for the site's motion feel. */
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
};

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveal every [data-reveal] descendant as it scrolls into view.
 * data-reveal="up" | "fade" | "scale"  ·  data-reveal-delay="0.12"
 */
export function revealAll(scope) {
  // Elements can sit inside a nested motion scope as well as the page scope;
  // bind each one exactly once.
  const targets = gsap.utils
    .toArray("[data-reveal]", scope)
    .filter((el) => !el.dataset.revealBound);

  targets.forEach((el) => {
    el.dataset.revealBound = "1";
  });

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
    return;
  }

  targets.forEach((el) => {
    const kind = el.dataset.reveal || "up";
    const delay = Number(el.dataset.revealDelay || 0);

    const from = { opacity: 0 };
    const to = { opacity: 1, duration: 0.75, ease: EASE.out, delay };

    if (kind === "up") {
      from.y = 26;
      to.y = 0;
    }
    if (kind === "scale") {
      Object.assign(from, { scale: 0.965, y: 14 });
      Object.assign(to, { scale: 1, y: 0 });
    }
    if (kind === "left") {
      from.x = -24;
      to.x = 0;
    }

    gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

/**
 * Stagger the direct children of `el` when the container enters the viewport.
 */
export function revealStagger(el, options = {}) {
  if (!el) return;
  if (prefersReducedMotion()) {
    gsap.set(el.children, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(
    el.children,
    { opacity: 0, y: options.y ?? 22 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.62,
      stagger: options.stagger ?? 0.075,
      ease: EASE.out,
      scrollTrigger: { trigger: el, start: options.start ?? "top 86%", once: true },
    }
  );
}

/** Count a numeric readout up when it scrolls into view. */
export function countUp(el, to, options = {}) {
  if (!el) return;
  const decimals = options.decimals ?? 0;
  const suffix = options.suffix ?? "";
  const prefix = options.prefix ?? "";
  const box = { value: options.from ?? 0 };
  const render = (value) => {
    el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
  };

  if (prefersReducedMotion()) {
    render(to);
    return;
  }

  gsap.to(box, {
    value: to,
    duration: options.duration ?? 1.5,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
    onUpdate: () => render(box.value),
  });
}

export { gsap, ScrollTrigger, SplitText };
