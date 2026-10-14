"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content";
import { PersonIcon, CheckIcon } from "./icons";

// How long each step is shown: the three agent steps, then "You approve" waiting, then a short reset.
const HOLD = [1300, 1300, 1300, 2800];
const RESET = 700;

/**
 * A client's view of one agent. Steps tick through in order on a slow loop.
 * Rendered in its finished state (three steps done, the last waiting for you), which is also what
 * reduced-motion visitors and visitors without JavaScript see.
 */
export function HeroVisual({ v }: { v: Dict["hero"]["visual"] }) {
  const last = v.steps.length - 1;
  const [step, setStep] = useState(last); // -1 = reset, all idle
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Run only while on screen, and never under reduced motion.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.3 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setStep((s) => (s === last ? -1 : s + 1)), step === -1 ? RESET : HOLD[step]);
    return () => clearTimeout(t);
  }, [running, step, last]);

  return (
    <div className="app" ref={ref} role="img" aria-label={v.label}>
      <div className="app-bar">
        <span className="app-dots" />
        <span className="app-name">{v.agent}</span>
        <span className="app-status">{v.status}</span>
      </div>
      <ol className="app-steps">
        {v.steps.map((s, i) => {
          const human = i === last;
          const state = i < step ? "done" : i === step ? (human ? "waiting" : "active") : "idle";
          return (
            <li key={s} className={`app-step${human ? " human" : ""}`} data-state={state}>
              <span className="app-icon">{human ? <PersonIcon /> : state === "done" ? <CheckIcon /> : i + 1}</span>
              {s}
            </li>
          );
        })}
      </ol>
      <p className="app-log">{v.log}</p>
    </div>
  );
}
