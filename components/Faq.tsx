"use client";

import { useState } from "react";

/** All answers are always in the DOM; CSS hides the closed ones. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq">
      <noscript>
        <style>{`.faq-a{visibility:visible!important;grid-template-rows:1fr!important}`}</style>
      </noscript>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item ${isOpen ? "open" : ""}`} key={f.q}>
            <h3>
              <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                {f.q}
              </button>
            </h3>
            <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
