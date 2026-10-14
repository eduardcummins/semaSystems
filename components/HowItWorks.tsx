"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content";
import { Plate } from "./Plate";

/**
 * Pinned while you scroll through it: each stretch of scroll adds the next plate to the stack and swaps in
 * that step's text. With reduced motion, on short screens or without JavaScript, it is a plain list (see globals.css).
 */
export function HowItWorks({ d }: { d: Dict["how"] }) {
  const n = d.steps.length;
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? -r.top / travel : 0;
      setActive(Math.max(0, Math.min(n - 1, Math.floor(p * n))));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    queue();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [n]);

  const state = (i: number) => (i < active ? "past" : i === active ? "current" : "next");

  return (
    <section className="how-scroll" id="how" aria-labelledby="how-title" ref={ref} style={{ "--n": n } as React.CSSProperties}>
      <div className="how-pin wrap">
        <h2 className="display h2 center" id="how-title">
          {d.heading}
        </h2>
        <div className="how">
          <div className="how-plates" aria-hidden="true">
            {d.steps.map((_, i) => (
              <div key={i} className="how-plate" data-state={state(i)}>
                <Plate n={i + 1} />
              </div>
            ))}
          </div>
          <div className="how-text">
            <div className="how-progress" aria-hidden="true">
              {d.steps.map((_, i) => (
                <span key={i} data-on={i <= active ? "" : undefined} />
              ))}
            </div>
            <ol className="how-steps">
              {d.steps.map((s, i) => (
                <li key={s.title} className="how-step" data-state={state(i)}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.points && (
                    <ul className="points">
                      {s.points.map((p) => (
                        <li key={p.lead}>
                          <b>{p.lead}</b> {p.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
