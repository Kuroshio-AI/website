export const VIDEO = {
  width: 1600,
  height: 900,
  fps: 30,
  durationInFrames: 1050,
};

export const C = {
  abyss: "#04101a",
  abyssDeep: "#010810",
  trench: "#071a26",
  panel: "#0a2331",
  panelRaised: "#0e2c3c",
  signal: "#3fe0c5",
  signalDeep: "#12a08c",
  flare: "#ff9448",
  flareDeep: "#c96a22",
  fault: "#ff5f56",
  bone: "#eaf2f0",
  boneDim: "#93aaaf",
  boneFaint: "#6e858b",
  hairline: "rgba(147, 202, 205, 0.16)",
  hairlineStrong: "rgba(147, 202, 205, 0.34)",
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
