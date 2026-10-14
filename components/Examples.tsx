"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content";
import { examples, type ExampleId } from "@/lib/examples";
import { PersonIcon } from "./icons";

/** Segmented control over the six examples. Steps light up once, in order, on first view and on every switch. */
export function Examples({ d }: { d: Dict["examples"] }) {
  const [id, setId] = useState<ExampleId>(examples[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const seen = useRef(false);

  // Steps are dimmed only once JavaScript is running (data-armed), so without it everything is visible.
  useEffect(() => {
    const el = panel.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.removeAttribute("data-play");
    el.setAttribute("data-armed", "");
    if (seen.current) {
      void el.offsetWidth; // restart the animation
      el.setAttribute("data-play", "");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        seen.current = true;
        el.setAttribute("data-play", "");
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  const select = (i: number) => {
    const next = examples[(i + examples.length) % examples.length];
    setId(next.id);
    tabs.current[examples.indexOf(next)]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const to = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: examples.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    select(to);
  };

  const cfg = examples.find((x) => x.id === id)!;
  const item = d.items[id];

  return (
    <div className="ex">
      <div className="seg" role="tablist" aria-label={d.tabsLabel}>
        {examples.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={x.id === id}
            aria-controls="ex-panel"
            tabIndex={x.id === id ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {d.items[x.id].tab}
          </button>
        ))}
      </div>

      <div className="ex-panel" id="ex-panel" role="tabpanel" aria-labelledby={`tab-${id}`} ref={panel}>
        <p className="label">{d.problem}</p>
        <p className="ex-problem">{item.problem}</p>

        <p className="label">{d.does}</p>
        <ol className="ex-steps">
          {item.steps.map((s, i) => (
            <li key={`${id}-${i}`} className={`ex-step${i === cfg.check ? " human" : ""}`} style={{ "--i": i } as React.CSSProperties}>
              {i === cfg.check && (
                <span className="ex-check">
                  <PersonIcon /> {d.check}
                </span>
              )}
              {s}
            </li>
          ))}
        </ol>

        <dl className="ex-compare">
          <div>
            <dt className="label">{d.before}</dt>
            <dd>{item.before}</dd>
          </div>
          <div>
            <dt className="label">{d.after}</dt>
            <dd>{item.after}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
