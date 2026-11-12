export const VIDEO = {
  width: 1600,
  height: 900,
  fps: 30,
  durationInFrames: 720,
};

/* Mirrors the product dashboard's tokens so the walkthrough reads as a
   recording of the real Plant Operations Platform, not an illustration. */
export const C = {
  canvas: "#fafafa",
  canvasDeep: "#eef1f6",
  canvasSunk: "#f4f5f8",
  panel: "#ffffff",
  panelSunk: "#f7f8fa",
  brand: "#094cb2",
  brandDeep: "#133976",
  brandSoft: "#f0f5ff",
  brandLine: "#dee8ff",
  flare: "#8a5a00",
  flareSoft: "#fdf8e8",
  flareDeep: "#6d4700",
  fault: "#a5241c",
  faultSoft: "#fdeceb",
  ok: "#1a6b47",
  okSoft: "#eefaf3",
  ink: "#27272a",
  inkDim: "#52525b",
  inkFaint: "#71717a",
  hairline: "rgba(39, 39, 42, 0.11)",
  hairlineStrong: "rgba(39, 39, 42, 0.22)",
};

export const F = {
  display: 'var(--font-display, "League Spartan Variable"), "League Spartan Variable", sans-serif',
  sans: 'var(--font-sans, "DM Sans Variable"), "DM Sans Variable", system-ui, sans-serif',
  mono: 'var(--font-mono, "Geist Mono Variable"), "Geist Mono Variable", ui-monospace, monospace',
};

/**
 * Chapter map — shared by the composition and the player's chapter rail so
 * the two can never drift apart.
 */
export const CHAPTERS = [
  {
    id: "energy",
    index: "01",
    label: "Energy costs",
    summary: "See the idle cost of Extrusion Line 02 at a glance.",
    from: 0,
    duration: 240,
  },
  {
    id: "predict",
    index: "02",
    label: "Failure warnings",
    summary: "Catch a bearing risk early and know when to act.",
    from: 240,
    duration: 240,
  },
  {
    id: "handoff",
    index: "03",
    label: "Maintenance history",
    summary: "Digitise the repair sheet and save a linked maintenance record.",
    from: 480,
    duration: 240,
  },
];
