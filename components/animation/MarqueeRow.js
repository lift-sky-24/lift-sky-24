"use client";

export default function MarqueeRow({ items = [], duration = 28, reverse = false, className = "" }) {
  // Doubled so the seamless loop never shows a gap
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ background: "#101019" }}
      aria-hidden="true"
    >
      <div
        className="marquee-track running"
        style={{
          "--marquee-dur": `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          padding: "14px 0",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4"
            style={{ userSelect: "none", flexShrink: 0 }}
          >
            <span style={{ color: "#FC6E04", fontSize: 16, lineHeight: 1, display: "inline-block" }}>✦</span>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase", color: "#fff" }}>
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
