"use client";
/**
 * MarqueeRow — infinite horizontal scroll marquee.
 * Black background (#101019) with orange star separators (logo orange #FF6B01).
 */
import { useRef } from "react";

export default function MarqueeRow({ items = [], duration = 32, reverse = false, className = "" }) {
  const trackRef = useRef(null);
  const doubled  = [...items, ...items];

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ background: "#101019" }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="marquee-track running"
        style={{
          "--marquee-dur":  `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          padding: "16px 0",
        }}
        onMouseEnter={() => trackRef.current?.classList.replace("running", "paused")}
        onMouseLeave={() => trackRef.current?.classList.replace("paused",  "running")}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4"
            style={{ userSelect: "none" }}
          >
            {/* Orange star separator — logo orange color */}
            <span style={{
              color: "#FF6B01",
              fontSize: 18,
              lineHeight: 1,
              display: "inline-block",
              verticalAlign: "middle",
            }}>✦</span>
            <span style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#fff",
            }}>
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
