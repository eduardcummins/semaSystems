"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";

export function Header({ lang, t }: { lang: Locale; t: Dict["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const other: Locale = lang === "en" ? "es" : "en";
  const switchHref = path.replace(/^\/(en|es)/, `/${other}`);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const home = `/${lang}`;
  return (
    <header className={`site-header${scrolled ? " floating" : ""}`}>
      <div className="bar">
        <Link href={home} id="header-logo" aria-label="Sema Systems" className="brand"><Logo size={40} /></Link>
        <nav>
          <Link href={home}>{t.home}</Link>
          <Link href={`${home}#workflows`}>{t.workflows}</Link>
          <Link href={`${home}#about`}>{t.about}</Link>
          <Link href={`${home}#contact`}>{t.contact}</Link>
          <Link
            href={switchHref}
            className="lang"
            hrefLang={other}
            onClick={() => { document.cookie = `lang=${other};path=/;max-age=31536000`; }}
          >
            <b>{lang.toUpperCase()}</b> / {other.toUpperCase()}
          </Link>
        </nav>
      </div>
    </header>
  );
}
