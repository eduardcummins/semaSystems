"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/i18n";
import { BookLink } from "./BookLink";
import { Logo } from "./Logo";

export function Header({ lang, nav, book }: { lang: Locale; nav: Dict["nav"]; book: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const other: Locale = lang === "en" ? "es" : "en";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links: [string, string][] = [
    ["how", nav.how],
    ["examples", nav.examples],
    ["faq", nav.faq],
  ];
  const href = (id: string) => `/${lang}#${id}`;
  const switchHref = pathname.replace(/^\/(en|es)/, `/${other}`);
  // Keep the visitor on the same page and section: the hash is only known in the browser, so add it on hover/focus/click.
  const withHash = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = switchHref + window.location.hash;
  };
  const onSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    document.cookie = `lang=${other};path=/;max-age=31536000`;
    withHash(e);
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="bar wrap">
        <Link href={`/${lang}`} className="brand" aria-label={nav.home} id="header-logo">
          <Logo size={44} />
        </Link>
        <nav className="links" aria-label="Main">
          {links.map(([id, label]) => (
            <Link key={id} href={href(id)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="bar-right">
          <a href={switchHref} onClick={onSwitch} onMouseEnter={withHash} onFocus={withHash} className="lang" lang={other} hrefLang={other} aria-label={other === "es" ? "Español" : "English"}>
            <b>{lang.toUpperCase()}</b> / {other.toUpperCase()}
          </a>
          <BookLink href={book} location="nav" className="btn btn-sm">
            {nav.book}
          </BookLink>
          <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)} aria-label={open ? nav.close : nav.menu}>
            <span className={open ? "x" : ""} />
          </button>
        </div>
        {open && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" onClick={() => setOpen(false)}>
            {links.map(([id, label]) => (
              <Link key={id} href={href(id)}>
                {label}
              </Link>
            ))}
            <BookLink href={book} location="nav-mobile" className="btn">
              {nav.book}
            </BookLink>
          </nav>
        )}
      </div>
    </header>
  );
}
