import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

import { C, F } from "./theme";
import { useRise } from "./timing";

/* ---------------------------------------------------------------- motion */

export function Rise({ delay = 0, y = 22, children, style, damping = 200 }) {
  const p = useRise(delay, damping);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- typography */

/* Small labels: sentence case in the text face. Call sites' tracking is ignored on purpose. */
export function Mono({ children, color = C.inkFaint, size = 14, style }) {
  const text = typeof children === "string" ? children[0].toUpperCase() + children.slice(1) : children;
  return (
    <span style={{ fontSize: size, color, ...style, fontFamily: F.sans, fontWeight: 500, letterSpacing: 0, textTransform: "none" }}>
      {text}
    </span>
  );
}

export function Headline({ children, size = 62, color = C.ink, style }) {
  return (
    <h2
      style={{
        fontFamily: F.display,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: "-0.025em",
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function Body({ children, size = 22, color = C.inkDim, style }) {
  return (
    <p
      style={{
        fontFamily: F.sans,
        fontSize: size,
        lineHeight: 1.55,
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Readout({ children, size = 34, color = C.ink, style }) {
  return (
    <span
      style={{
        fontFamily: F.sans,
        fontWeight: 600,
        fontSize: size,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.02em",
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- chrome */

export function Panel({ children, title, meta, compact = false, style, bodyStyle, accent = C.hairline }) {
  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${accent}`,
        background: C.panel,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {title ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: `1px solid ${C.hairline}`,
          }}
        >
          <Mono size={compact ? 21 : 15} color={C.inkDim} style={{ letterSpacing: "0.1em" }}>
            {title}
          </Mono>
          {meta ? <Mono size={compact ? 19 : 13} style={{ letterSpacing: "0.08em" }}>{meta}</Mono> : null}
        </div>
      ) : null}
      <div style={{ padding: 18, flex: 1, ...bodyStyle }}>{children}</div>
    </div>
  );
}

export function AssetPanel({ compact = false, status, statusTone = "#a7e8c3", metric, children, style }) {
  const frame = useCurrentFrame();
  const imageScale = interpolate(frame, [0, 240], [1.04, 1.09], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imageX = interpolate(frame, [0, 240], [0, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        minHeight: 0,
        overflow: "hidden",
        background: "#101923",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "#f4f7fb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: compact ? 20 : 22,
        ...style,
      }}
    >
      <Img
        src={staticFile("kuroshio/plastics-polymers.jpg")}
        style={{
          position: "absolute",
          inset: -12,
          width: "calc(100% + 24px)",
          height: "calc(100% + 24px)",
          objectFit: "cover",
          objectPosition: "42% center",
          scale: imageScale,
          translate: `${imageX}px 0px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(8,16,25,0.74) 0%, rgba(8,16,25,0.20) 42%, rgba(8,16,25,0.92) 100%)",
        }}
      />
      <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", alignItems: "flex-start", gap: 12 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: `1px solid ${statusTone}88`,
            background: "rgba(8,16,25,0.56)",
            color: statusTone,
            padding: "5px 8px",
            fontFamily: F.sans,
            fontWeight: 600,
            fontSize: compact ? 16 : 14,
            whiteSpace: "nowrap",
          }}
        >
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: statusTone }} />
          {status[0].toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: compact ? 17 : 15, fontWeight: 500, color: "rgba(244,247,251,0.72)" }}>
            Unit 4 · Polymer extrusion
          </div>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: compact ? 36 : 34, lineHeight: 0.98, letterSpacing: "-0.04em", marginTop: 6 }}>
            Extrusion Line 02
          </div>
        </div>
        {metric ? (
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <div style={{ fontSize: compact ? 16 : 14, fontWeight: 500, color: "rgba(244,247,251,0.72)" }}>{metric.label[0].toUpperCase() + metric.label.slice(1)}</div>
            <div style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums", fontSize: compact ? 32 : 30, lineHeight: 1.05, color: "#f4f7fb", marginTop: 5 }}>{metric.value}</div>
          </div>
        ) : null}
      </div>
      {children ? <div style={{ position: "relative" }}>{children}</div> : null}
    </div>
  );
}

export function Chip({ children, tone = "brand", delay = 0 }) {
  const tones = {
    brand: { fg: C.brand, bg: C.brandSoft, bd: C.brandLine },
    flare: { fg: C.flare, bg: C.flareSoft, bd: "#e0cd97" },
    quiet: { fg: C.inkDim, bg: C.canvasSunk, bd: C.hairline },
  };
  const t = tones[tone] ?? tones.quiet;
  return (
    <Rise delay={delay} y={10}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px",
          border: `1px solid ${t.bd}`,
          background: t.bg,
          color: t.fg,
          fontFamily: F.sans,
          fontWeight: 600,
          fontSize: 14,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </Rise>
  );
}
