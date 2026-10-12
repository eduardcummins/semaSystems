"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** One delegated listener tracks every element marked data-cta="<location>". */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      if (el) track("cta_click", { location: el.dataset.cta ?? "", label: el.textContent?.trim() ?? "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
