"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

/** EN / ES switch. Keeps the visitor on the same page and section, and remembers the choice for the next visit. */
export function LangSwitch({ lang, name, className = "lang" }: { lang: Locale; name: string; className?: string }) {
  const pathname = usePathname();
  const other: Locale = lang === "en" ? "es" : "en";
  const href = pathname.replace(/^\/(en|es)/, `/${other}`);
  // The hash is only known in the browser, so add it on hover, focus and click.
  const withHash = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = href + window.location.hash;
  };
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    document.cookie = `lang=${other};path=/;max-age=31536000;samesite=lax`;
    withHash(e);
  };

  return (
    <a href={href} onClick={onClick} onMouseEnter={withHash} onFocus={withHash} className={className} lang={other} hrefLang={other}>
      <span aria-hidden="true">
        <b>{lang.toUpperCase()}</b> / {other.toUpperCase()}
      </span>
      <span className="sr-only">{name}</span>
    </a>
  );
}
