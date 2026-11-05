"use client";
/**
 * TiltCard — 3D tilt + glare + spotlight on any card.
 * Library: Framer Motion (spring motion values).
 * Usage: <TiltCard className="..."><YourCard /></TiltCard>
 */
import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MOTION } from "@/lib/motion-config";

export default function TiltCard({
  children,
  className = "",
  style = {},
  maxDeg = MOTION.tilt.maxDeg,
  glareOpacity = MOTION.tilt.glareOpacity,
  scaleOnHover = MOTION.tilt.scale,
  disabled = false,
  as = "div",
}) {
  const ref   = useRef(null);
  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const { tilt: ts } = MOTION.spring;

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [maxDeg, -maxDeg]), ts);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-maxDeg, maxDeg]), ts);
  const glareX  = useTransform(rawX, [-0.5, 0.5], ["0%",  "100%"]);
  const glareY  = useTransform(rawY, [-0.5, 0.5], ["0%",  "100%"]);
  const scale   = useSpring(1, { stiffness: 200, damping: 25 });

  const onMove = useCallback((e) => {
    if (disabled) return;
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [disabled, rawX, rawY]);

  const onEnter = () => { if (!disabled) scale.set(scaleOnHover); };
  const onLeave = () => {
    rawX.set(0); rawY.set(0); scale.set(1);
  };

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      className={`spotlight-card ${className}`}
      style={{
        perspective:    `${MOTION.tilt.perspective}px`,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        willChange:     "transform",
        ...style,
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-card=""
    >
      {/* Glare overlay */}
      {!disabled && (
        <motion.div
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            borderRadius:  "inherit",
            pointerEvents: "none",
            zIndex:        2,
            background:    `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </Tag>
  );
}
