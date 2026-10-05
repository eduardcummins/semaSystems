"use client";
import { useEffect, useRef } from "react";
import { Logo } from "./Logo";

const BIG = 160;

export function Intro() {
  const logo = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = logo.current;
    const bg = overlay.current;
    if (root.dataset.intro !== "on" || !el || !bg) return;
    try { sessionStorage.setItem("intro-seen", "1"); } catch {}
    const target = document.getElementById("header-logo")?.getBoundingClientRect();
    const place = (x: number, y: number, s: number) => (el.style.transform = `translate(${x}px, ${y}px) scale(${s})`);
    place((innerWidth - BIG) / 2, (innerHeight - BIG * 0.83) / 2, 1);
    const timers = [
      setTimeout(() => {
        el.style.transition = "transform 0.9s cubic-bezier(.7,0,.2,1)";
        bg.style.transition = "opacity 0.7s ease 0.2s";
        bg.style.opacity = "0";
        if (target) place(target.left, target.top, target.width / BIG);
      }, 700),
      setTimeout(() => { delete root.dataset.intro; }, 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="intro" aria-hidden="true">
      <div ref={overlay} className="intro-bg" />
      <div ref={logo} className="intro-logo"><Logo size={BIG} /></div>
    </div>
  );
}
