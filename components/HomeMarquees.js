"use client";
import dynamic from "next/dynamic";

const MarqueeRow = dynamic(() => import("@/components/animation/MarqueeRow"), { ssr: false });

export function TechMarquee({ items }) {
  return (
    <div className="overflow-hidden">
      <MarqueeRow items={items} duration={28} />
    </div>
  );
}

export function ServicesMarquee({ items }) {
  return (
    <div className="overflow-hidden">
      <MarqueeRow items={items} duration={22} reverse />
    </div>
  );
}
