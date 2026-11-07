"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui";

const MagneticButton = dynamic(() => import("@/components/animation/MagneticButton"), { ssr: false });

export default function WhyCtaCard({ title, sub, href, cta, footnote }) {
  return (
    <div
      className="flex h-full flex-col justify-center rounded-2xl p-7 text-white relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#101114 0%,#1B1714 60%,#2A160D 100%)" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,.08) 50%,transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "marquee-scroll 3s linear infinite",
        }}
      />
      <p className="text-xl font-bold leading-tight relative z-10" style={{ whiteSpace: "pre-line" }}>{title}</p>
      <p className="mt-2 text-sm text-white/80 relative z-10">{sub}</p>
      <div className="mt-5 w-fit relative z-10">
        <MagneticButton>
          <Button href={href} variant="light">{cta}</Button>
        </MagneticButton>
      </div>
      <p className="mt-3 text-xs text-white/60 relative z-10">{footnote}</p>
    </div>
  );
}
