import {
  Activity,
  AlertTriangle,
  Factory,
  Radio,
  Settings2,
  ShieldCheck,
  Zap,
} from "lucide-react";

const readings = [
  { label: "Current RMS", value: "42.8 A", delta: "+3.1%" },
  { label: "Energy today", value: "318 kWh", delta: "-8.4%" },
  { label: "Power factor", value: "0.92", delta: "stable" },
];

const activity = [
  "Bearing vibration rose above baseline for 11 minutes.",
  "Idle draw dropped after compressor sequencing change.",
  "Maintenance note linked to Motor Line A.",
];

function polarPoint(centerX, centerY, radius, angleDeg) {
  const angle = ((angleDeg - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

function notchPath(centerX, centerY, outerRadius, innerRadius, angle, widthDeg) {
  const outerStart = polarPoint(centerX, centerY, outerRadius, angle - widthDeg / 2);
  const outerEnd = polarPoint(centerX, centerY, outerRadius, angle + widthDeg / 2);
  const innerEnd = polarPoint(centerX, centerY, innerRadius, angle + widthDeg / 2);
  const innerStart = polarPoint(centerX, centerY, innerRadius, angle - widthDeg / 2);

  return `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)} L ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)} L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)} L ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)} Z`;
}

function NotchedGauge({ value = 86, label = "Health" }) {
  const totalNotches = 42;
  const activeNotches = Math.round((value / 100) * totalNotches);
  const startAngle = 220;
  const endAngle = 500;
  const sweep = endAngle - startAngle;
  const gap = 2.2;
  const width = sweep / totalNotches - gap;

  return (
    <div
      aria-label={`${label} score ${value} out of 100`}
      className="relative mx-auto size-[170px]"
      role="img"
    >
      <svg aria-hidden="true" className="size-full overflow-visible" viewBox="0 0 180 180">
        {Array.from({ length: totalNotches }).map((_, index) => {
          const angle = startAngle + index * (sweep / (totalNotches - 1));
          const isActive = index < activeNotches;

          return (
            <path
              d={notchPath(90, 90, 78, 59, angle, width)}
              fill={isActive ? "var(--dashboard-accent)" : "var(--dashboard-track)"}
              fillOpacity={isActive ? 0.96 : 0.72}
              key={index}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className="text-[0.65rem] uppercase tracking-[0.16em] text-white/42">{label}</span>
        <span className="text-5xl font-semibold leading-none tabular-nums text-white">{value}</span>
        <span className="mt-1 text-xs text-white/44">Normal</span>
      </div>
    </div>
  );
}

function Sparkline() {
  return (
    <svg aria-hidden="true" className="h-24 w-full" preserveAspectRatio="none" viewBox="0 0 360 110">
      <defs>
        <linearGradient id="spark-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--dashboard-accent)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="var(--dashboard-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 90 C 32 76 46 82 70 60 C 98 34 126 48 154 44 C 188 40 204 72 232 58 C 262 42 280 22 306 32 C 329 40 344 35 360 24 L 360 110 L 0 110 Z"
        fill="url(#spark-area)"
      />
      <path
        className="k-live-line"
        d="M 0 90 C 32 76 46 82 70 60 C 98 34 126 48 154 44 C 188 40 204 72 232 58 C 262 42 280 22 306 32 C 329 40 344 35 360 24"
        fill="none"
        stroke="var(--dashboard-accent)"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <g stroke="rgba(255,255,255,.08)" strokeWidth="1">
        <path d="M0 30H360" />
        <path d="M0 60H360" />
        <path d="M0 90H360" />
      </g>
    </svg>
  );
}

export default function DashboardPreview() {
  return (
    <div className="axis-preview-frame">
      <img
        alt=""
        aria-hidden="true"
        className="axis-preview-bg"
        src="/homepage.webp"
      />
      <div className="axis-preview-warmth" />

      <section aria-label="Kuroshio AI dashboard preview" className="axis-dashboard">
        <aside className="axis-dashboard-rail" aria-hidden="true">
          <span className="rail-logo">K</span>
          <Factory />
          <Activity />
          <Settings2 />
        </aside>

        <div className="axis-dashboard-main">
          <header className="axis-dashboard-header">
            <div>
              <p>Machines &gt; Motor Line A</p>
              <h2>Extruder Motor A-07</h2>
            </div>
            <span className="live-pill">
              <span />
              Live
            </span>
          </header>

          <div className="axis-dashboard-grid">
            <section className="machine-card">
              <div className="machine-heading">
                <span className="machine-icon">
                  <Zap aria-hidden="true" />
                </span>
                <div>
                  <h3>Machine health</h3>
                  <p>Predictive score from current, vibration, and temperature.</p>
                </div>
              </div>
              <NotchedGauge value={86} />
              <div className="machine-tags">
                <span>Normal</span>
                <span>Trend flat</span>
                <span>60s refresh</span>
              </div>
            </section>

            <section className="telemetry-card">
              <div className="note-box">
                <span>Add a maintenance note</span>
                <button type="button">Submit</button>
              </div>

              <div className="reading-grid">
                {readings.map((reading) => (
                  <div className="reading-tile" key={reading.label}>
                    <span>{reading.label}</span>
                    <strong>{reading.value}</strong>
                    <small>{reading.delta}</small>
                  </div>
                ))}
              </div>

              <div className="trend-card">
                <div className="trend-header">
                  <div>
                    <span>Current draw</span>
                    <strong>Last 24 hours</strong>
                  </div>
                  <Radio aria-hidden="true" />
                </div>
                <Sparkline />
              </div>

              <div className="activity-list">
                {activity.map((item, index) => (
                  <div className="activity-item" key={item}>
                    <span className={index === 0 ? "activity-alert" : ""}>
                      {index === 0 ? <AlertTriangle aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}
                    </span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
