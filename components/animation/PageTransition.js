"use client";
/**
 * PageTransition — NO key={pathname}, NO remount, NO flicker.
 *
 * The key={pathname} pattern was causing the entire page subtree to
 * unmount + remount on every route change, making ALL scroll animations
 * (Stagger, Reveal, whileInView, AOS) restart and flicker.
 *
 * This component now just renders children directly — Next.js App Router
 * already handles its own route transitions cleanly without a wrapper.
 */
export default function PageTransition({ children }) {
  return children;
}
