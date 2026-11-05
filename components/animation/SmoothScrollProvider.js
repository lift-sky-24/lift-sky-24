"use client";
/**
 * SmoothScrollProvider
 * - Initialises Lenis smooth scroll on client
 * - Syncs Lenis with GSAP ticker + ScrollTrigger
 * - Refreshes AOS on resize
 * - Resets scroll on route change
 * - Full cleanup on unmount
 * Library: Lenis + GSAP (never Framer Motion)
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MOTION } from "@/lib/motion-config";

export default function SmoothScrollProvider({ children }) {
  const lenisRef   = useRef(null);
  const rafRef     = useRef(null);
  const pathname   = usePathname();

  useEffect(() => {
    // Bail on touch/low-power devices — use native scroll
    const isFinePointer = window.matchMedia("(pointer:fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    let lenis = null;
    let gsap  = null;
    let ScrollTrigger = null;

    async function init() {
      const [gsapMod, STMod, LenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      gsap         = gsapMod.gsap;
      ScrollTrigger = STMod.ScrollTrigger;
      const Lenis  = LenisMod.default;

      gsap.registerPlugin(ScrollTrigger);

      // Lenis options — reduce smoothing on touch/reduced-motion
      const lerp = prefersReduced ? 1 : (!isFinePointer ? 0.12 : MOTION.lenis.lerp);

      lenis = new Lenis({
        lerp,
        smoothWheel:     MOTION.lenis.smoothWheel,
        wheelMultiplier: MOTION.lenis.wheelMultiplier,
        touchMultiplier: isFinePointer ? 1 : MOTION.lenis.touchMultiplier,
        infinite:        false,
      });

      lenisRef.current = lenis;

      // Sync with ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // GSAP ticker drives Lenis
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);

      // AOS refresh on resize
      const onResize = () => {
        ScrollTrigger.refresh();
        import("aos").then(({ default: AOS }) => AOS.refresh());
      };
      window.addEventListener("resize", onResize, { passive: true });

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    const cleanupFn = { current: null };
    init().then((fn) => { cleanupFn.current = fn; });

    return () => {
      if (cleanupFn.current) cleanupFn.current();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      // Remove GSAP ticker entries
      import("gsap").then(({ gsap: g }) => {
        g.ticker.remove(() => {});
      });
    };
  }, []);

  // Scroll to top and refresh ScrollTrigger on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
    import("aos").then(({ default: AOS }) => AOS.refresh());
  }, [pathname]);

  return children;
}
