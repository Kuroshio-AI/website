export const VIDEO = {
  width: 1600,
  height: 900,
  fps: 30,
  durationInFrames: 1050,
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
  display: '"Bricolage Grotesque Variable", "Archivo Variable", sans-serif',
  sans: '"Instrument Sans Variable", system-ui, sans-serif',
  mono: '"Geist Mono Variable", ui-monospace, monospace',
};

/**
 * Chapter map — shared by the composition and the player's chapter rail so
 * the two can never drift apart.
 */
export const CHAPTERS = [
  { id: "blind", index: "01", label: "Running blind", from: 0, duration: 110 },
  { id: "install", index: "02", label: "Install in hours", from: 110, duration: 180 },
  { id: "energy", index: "03", label: "EnergyIQ", from: 290, duration: 210 },
  { id: "predict", index: "04", label: "Predictive maintenance", from: 500, duration: 210 },
  { id: "handoff", index: "05", label: "Alert to logbook", from: 710, duration: 180 },
  { id: "proof", index: "06", label: "Proof on paper", from: 890, duration: 160 },
];
