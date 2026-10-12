"use client";

import { useEffect, useRef } from "react";
import { Logo } from "./Logo";

/** Big centred logo that shrinks into the header logo, once per visit. */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    const m = mark.current;
    if (!el || !m) return;
    const finish = () => {
      html.dataset.intro = "done";
      try {
        sessionStorage.setItem("introSeen", "1");
      } catch {}
      el.remove();
    };
    if (html.dataset.intro !== "run") return finish();

    const target = document.getElementById("header-logo");
    if (!target) return finish();
    const from = m.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    // Switch from CSS centring to an explicit transform, then animate to the header slot.
    m.style.cssText = `left:0;top:0;width:${from.width}px;transform:translate(${from.left}px,${from.top}px) scale(1);transition:none`;
    void m.offsetWidth;
    const timer = window.setTimeout(() => {
      m.style.transition = "transform 800ms cubic-bezier(.65,0,.2,1)";
      m.style.transform = `translate(${t.left}px,${t.top}px) scale(${t.width / from.width})`;
      el.style.opacity = "0";
      window.setTimeout(finish, 900);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="intro" ref={root} aria-hidden>
      <div className="intro-mark" ref={mark}>
        <Logo size={150} />
      </div>
    </div>
  );
}
