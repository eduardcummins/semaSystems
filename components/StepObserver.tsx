"use client";

import { useEffect } from "react";

/** Marks which "How it works" step is in view (data-active on #how), so its plate can brighten. */
export function StepObserver() {
  useEffect(() => {
    const section = document.getElementById("how");
    const steps = section?.querySelectorAll<HTMLElement>("[data-step]");
    if (!section || !steps?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) section.dataset.active = e.target.getAttribute("data-step")!;
      },
      { rootMargin: "-45% 0px -45% 0px" }, // a thin band across the middle of the screen
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}
