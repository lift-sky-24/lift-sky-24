"use client";
/**
 * SmoothScrollProvider
 * - Lenis smooth scroll on fine-pointer (mouse) desktop only
 * - Syncs with GSAP ScrollTrigger
 * - On route change: uses ONLY lenis.scrollTo (not window.scrollTo) to avoid jump
 * - Proper async cleanup to prevent leaked ScrollTriggers
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScrollProvider({ children }) {
  const lenisRef   = useRef(null);
  const cleanupRef = useRef(null);
  const pathname   = usePathname();

  useEffect(() => {
    const isMouse   = window.matchMedia("(pointer:fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    // Mobile/touch/reduced-motion → native scroll (no Lenis)
    if (!isMouse || isReduced) return;

    let cancelled = false;

    async function init() {
      try {
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

        if (cancelled) return; // component unmounted before init completed

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

        const onResize = () => {
          ScrollTrigger.refresh();
          import("aos").then(({ default: AOS }) => AOS.refresh()).catch(() => {});
        };
        window.addEventListener("resize", onResize, { passive: true });

        // Store cleanup
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
  }, []); // runs once on mount

  // Route change: scroll to top using ONLY Lenis (not native window.scrollTo)
  // Using Lenis prevents the jump caused by calling both
  useEffect(() => {
    if (lenisRef.current) {
      // immediate=true skips Lenis lerp so it's instant like native scroll
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      // Mobile (no Lenis) — native instant scroll
      window.scrollTo(0, 0);
    }
    // Refresh ScrollTrigger after a short delay so new page content has rendered
    const t = setTimeout(() => {
      import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => ScrollTrigger.refresh())
        .catch(() => {});
      import("aos")
        .then(({ default: AOS }) => AOS.refresh())
        .catch(() => {});
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return children;
}
