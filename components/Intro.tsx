"use client";

import { useEffect } from "react";

const TOTAL_MS = 2900;

/**
 * The load intro is a CSS timeline that runs while <html data-intro> is set (see the script in layout.tsx and
 * the "Intro" block in globals.css). This only ends it: on any click, scroll or key press, or once it has played.
 */
export function Intro() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-intro")) return;
    const events = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
    const end = () => {
      root.removeAttribute("data-intro");
      events.forEach((e) => window.removeEventListener(e, end));
      clearTimeout(timer);
    };
    const timer = setTimeout(end, TOTAL_MS);
    events.forEach((e) => window.addEventListener(e, end, { passive: true }));
    return end;
  }, []);
  return null;
}
