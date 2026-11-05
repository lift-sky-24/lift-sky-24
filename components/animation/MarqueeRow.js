"use client";
/**
 * MarqueeRow — pure CSS infinite scroll marquee.
 * Constant speed — no scroll or mouse interaction.
 * Pauses on hover only.
 */
import { useRef } from "react";

export default function MarqueeRow({ items = [], duration = 32, reverse = false, className = "" }) {
  const trackRef = useRef(null);
  const doubled  = [...items, ...items];

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="marquee-track running"
        style={{
          "--marquee-dur":  `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        onMouseEnter={() => trackRef.current?.classList.replace("running", "paused")}
        onMouseLeave={() => trackRef.current?.classList.replace("paused",  "running")}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-semibold text-muted"
            style={{ userSelect: "none" }}
          >
            <span style={{ color: "var(--purple)", opacity: 0.4 }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
