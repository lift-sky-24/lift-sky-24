"use client";
/**
 * SmoothScrollProvider
 * - Lenis smooth scroll on fine-pointer (mouse) desktop only
 * - Syncs with GSAP ScrollTrigger
 * - On route change: scroll to top only — does NOT refresh AOS
 *   (AOS is init-once; refreshing it would re-animate all elements = flicker)
 * - Proper async cleanup to prevent leaked ScrollTriggers
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScrollProvider({ children }) {
  const lenisRef   = useRef(null);
  const cleanupRef = useRef(null);
  const pathname   = usePathname();

  // ── Init Lenis + GSAP sync once on mount ────────────────────────
  useEffect(() => {
    const isMouse   = window.matchMedia("(pointer:fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    if (!isMouse || isReduced) return;

    let cancelled = false;

    async function init() {
      try {
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
          lerp:            0.1,
          smoothWheel:     true,
          wheelMultiplier: 0.85,
          infinite:        false,
        });

        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger on window resize only
        const onResize = () => { ScrollTrigger.refresh(); };
        window.addEventListener("resize", onResize, { passive: true });

        cleanupRef.current = () => {
          window.removeEventListener("resize", onResize);
          gsap.ticker.remove(tick);
          lenis.destroy();
          lenisRef.current = null;
        };
      } catch (e) {
        console.warn("[SmoothScroll] init failed:", e);
      }
    }

    init();

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  // ── Route change: scroll to top only ───────────────────────────
  // Do NOT call AOS.refresh() here — it re-animates all [data-aos] elements
  // Do NOT call ScrollTrigger.refresh() here — it restarts GSAP animations
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children;
}
