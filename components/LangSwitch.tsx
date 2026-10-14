"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

// Space taken by the fixed header; positions are measured from just below it.
const HEADER = 80;

/**
 * EN / ES switch. Keeps the visitor on the same page and at the same point in it (restored by the script in
 * layout.tsx), and remembers the choice for the next visit.
 */
export function LangSwitch({ lang, name, className = "lang" }: { lang: Locale; name: string; className?: string }) {
  const pathname = usePathname();
  const other: Locale = lang === "en" ? "es" : "en";
  const href = pathname.replace(/^\/(en|es)/, `/${other}`);

  const onClick = () => {
    document.cookie = `lang=${other};path=/;max-age=31536000;samesite=lax`;
    // Remember the section at the top of the screen and how far into it we are. Section heights differ a little
    // between languages, so this lands more accurately than a raw scroll position (or a stale #hash).
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const current = sections.filter((s) => s.getBoundingClientRect().top <= HEADER).pop();
    const at = current
      ? { id: current.id, ratio: (HEADER - current.getBoundingClientRect().top) / current.offsetHeight }
      : { id: "", ratio: window.scrollY / document.documentElement.scrollHeight };
    try {
      sessionStorage.setItem("sema-restore", JSON.stringify(at));
    } catch {}
  };

  return (
    <a href={href} onClick={onClick} className={className} lang={other} hrefLang={other}>
      <span aria-hidden="true">
        <b>{lang.toUpperCase()}</b> / {other.toUpperCase()}
      </span>
      <span className="sr-only">{name}</span>
    </a>
  );
}
