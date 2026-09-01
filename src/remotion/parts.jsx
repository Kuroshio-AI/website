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

export function Mono({ children, color = C.boneFaint, size = 14, style }) {
  return (
    <span
      style={{
        fontFamily: F.mono,
        fontSize: size,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Headline({ children, size = 62, color = C.bone, style }) {
  return (
    <h2
      style={{
        fontFamily: F.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 0.94,
        letterSpacing: "-0.04em",
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function Body({ children, size = 22, color = C.boneDim, style }) {
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

export function Readout({ children, size = 34, color = C.bone, style }) {
  return (
    <span
      style={{
        fontFamily: F.mono,
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

export function Marks({ color = C.hairlineStrong, size = 12 }) {
  const corner = (extra) => ({
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
    ...extra,
  });
  return (
    <>
      <div style={corner({ top: -1, left: -1, borderWidth: "1px 0 0 1px" })} />
      <div style={corner({ top: -1, right: -1, borderWidth: "1px 1px 0 0" })} />
      <div style={corner({ bottom: -1, left: -1, borderWidth: "0 0 1px 1px" })} />
      <div style={corner({ bottom: -1, right: -1, borderWidth: "0 1px 1px 0" })} />
    </>
  );
}

export function Panel({ children, title, meta, style, bodyStyle, accent = C.hairline }) {
  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${accent}`,
        background: "rgba(10,35,49,0.66)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <Marks />
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
          <Mono size={12} color={C.boneDim}>
            {title}
          </Mono>
          {meta ? <Mono size={12}>{meta}</Mono> : null}
        </div>
      ) : null}
      <div style={{ padding: 18, flex: 1, ...bodyStyle }}>{children}</div>
    </div>
  );
}

export function Chip({ children, tone = "signal", delay = 0 }) {
  const tones = {
    signal: { fg: C.signal, bg: "rgba(63,224,197,0.10)", bd: "rgba(63,224,197,0.42)" },
    flare: { fg: C.flare, bg: "rgba(255,148,72,0.10)", bd: "rgba(255,148,72,0.44)" },
    quiet: { fg: C.boneDim, bg: "rgba(147,202,205,0.06)", bd: C.hairline },
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
          fontFamily: F.mono,
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </Rise>
  );
}

/* --------------------------------------------------------------- graphics */

export function GridBackdrop({ opacity = 1 }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(120% 90% at 50% 40%, #000 25%, transparent 88%)",
      }}
    />
  );
}
