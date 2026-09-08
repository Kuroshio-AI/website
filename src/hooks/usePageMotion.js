import { useGSAP } from "@gsap/react";

import { ScrollTrigger, revealAll } from "@/lib/motion";

/**
 * Wires the shared [data-reveal] scroll choreography for a page, plus any
 * page-specific timeline passed as `setup`. All tweens are scoped to the
 * page root so hash navigation cleans them up.
 */
export function usePageMotion(scopeRef, setup) {
  useGSAP(
    () => {
      revealAll(scopeRef.current);
      setup?.(scopeRef.current);
      ScrollTrigger.refresh();

      // Lazy content and webfonts can move triggers after the initial measurement.
      const observer = new ResizeObserver(() => ScrollTrigger.refresh(true));
      observer.observe(scopeRef.current);
      return () => observer.disconnect();
    },
    { scope: scopeRef }
  );
}
