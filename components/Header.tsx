"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";

/** Full width and flat at the top; after 40px of scroll it becomes a floating rounded bar. */
export function Header({ lang, nav }: { lang: Locale; nav: Dict["nav"] }) {
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setFloating(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Section links are plain anchors: the browser scrolls to the section every time, even when the address
  // already ends in that #section (a Next.js Link treats that as "already here" and does nothing).
  const links: [string, string][] = [
    ["how", nav.how],
    ["examples", nav.examples],
    ["faq", nav.faq],
  ];

  return (
    <header className="header" data-floating={floating || open ? "" : undefined}>
      <div className="bar">
        <Link href={`/${lang}`} className="brand" aria-label={nav.home}>
          <Logo size={30} />
        </Link>
        <nav className="links" aria-label={nav.label}>
          {links.map(([id, label]) => (
            <a key={id} href={`/${lang}#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="bar-end">
          <LangSwitch lang={lang} name={nav.language} />
          <a href={`/${lang}#contact`} className="pill pill-sm">
            {nav.contact}
          </a>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <span className="sr-only">{open ? nav.close : nav.menu}</span>
            <span className="menu-icon" data-open={open ? "" : undefined} aria-hidden="true" />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label={nav.label} onClick={() => setOpen(false)}>
          {links.map(([id, label]) => (
            <a key={id} href={`/${lang}#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
