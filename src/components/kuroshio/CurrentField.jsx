import { useEffect, useRef } from "react";

/*
 * CurrentField — the Kuroshio Current, made of data.
 *
 * A 2D flow field advects a few hundred particles left-to-right through
 * layered value noise, drawn as ink on paper: blue strokes are healthy
 * telemetry, the rare amber ones are anomalies in the same water.
 *
 * Paper needs far more weight than a glowing dark ground — white leaves much
 * less contrast headroom — so this runs fewer, heavier, longer-lived strokes
 * composited normally rather than additively.
 */

const INK = "9,76,178";
const ANOMALY = "185,88,10";

const HASH_SIZE = 256;

function buildNoise(seed) {
  const perm = new Uint8Array(HASH_SIZE * 2);
  const base = new Uint8Array(HASH_SIZE);
  for (let i = 0; i < HASH_SIZE; i += 1) base[i] = i;

  let state = seed;
  for (let i = HASH_SIZE - 1; i > 0; i -= 1) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const j = state % (i + 1);
    const tmp = base[i];
    base[i] = base[j];
    base[j] = tmp;
  }
  for (let i = 0; i < HASH_SIZE * 2; i += 1) perm[i] = base[i % HASH_SIZE];

  const grad = (hash, x, y) => {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;

  return function noise2d(x, y) {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[xi] + yi];
    const ab = perm[perm[xi] + yi + 1];
    const ba = perm[perm[xi + 1] + yi];
    const bb = perm[perm[xi + 1] + yi + 1];
    return lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v
    );
  };
}

export function CurrentField({ className = "", density = 1, opacity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noise = buildNoise(20260901);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let frame = 0;
    let rafId = 0;
    let visible = true;

    const seed = (particle, spread) => {
      particle.x = spread ? Math.random() * width : -Math.random() * width * 0.25;
      particle.y = Math.random() * height;
      particle.life = 60 + Math.random() * 260;
      particle.age = 0;
      particle.speed = 0.5 + Math.random() * 1.55;
      particle.weight = (0.4 + Math.random() * 1.6) * 1.5;
      particle.anomaly = Math.random() < 0.045;
      particle.px = particle.x;
      particle.py = particle.y;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const count = Math.round(
        Math.min(1000, Math.max(220, (width * height) / 1700)) * 0.55 * density
      );
      particles = Array.from({ length: count }, () => {
        const particle = {};
        seed(particle, true);
        return particle;
      });
    };

    const step = () => {
      frame += 1;
      const t = frame * 0.0016;

      // persistence wash — trails decay instead of hard-clearing
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0,0,0,0.014)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const angle =
          noise(p.x * 0.0021 + t, p.y * 0.0031 - t * 0.6) * Math.PI * 1.35 -
          Math.PI * 0.06;
        const drift = 0.55 + noise(p.x * 0.0009, p.y * 0.0009 + t * 0.4) * 0.35;

        p.px = p.x;
        p.py = p.y;
        p.x += (Math.cos(angle) * 0.55 + drift) * p.speed * 2.1;
        p.y += Math.sin(angle) * p.speed * 1.35;
        p.age += 1;

        const fadeIn = Math.min(1, p.age / 22);
        const fadeOut = Math.min(1, (p.life - p.age) / 40);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut)) * 0.95;

        context.beginPath();
        context.moveTo(p.px, p.py);
        context.lineTo(p.x, p.y);
        context.lineWidth = p.weight;
        context.strokeStyle = p.anomaly
          ? `rgba(${ANOMALY},${alpha})`
          : `rgba(${INK},${alpha})`;
        context.stroke();

        if (
          p.age > p.life ||
          p.x > width + 40 ||
          p.y < -40 ||
          p.y > height + 40
        ) {
          seed(p, false);
        }
      }

      if (reduced) {
        if (frame < 220) rafId = window.requestAnimationFrame(step);
        return;
      }
      if (visible) rafId = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(step);
    };
    const stop = () => {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    resize();
    start();

    const resizeObserver = new ResizeObserver(() => {
      stop();
      resize();
      frame = 0;
      start();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) start();
        else if (!visible) stop();
      },
      { threshold: 0 }
    );
    intersection.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible && !reduced) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      aria-hidden="true"
      className={className}
      ref={canvasRef}
      style={{ opacity }}
    />
  );
}
