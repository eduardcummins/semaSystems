import Link from "next/link";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/i18n";
import { config } from "@/lib/config";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";

export function Footer({ lang, d, nav }: { lang: Locale; d: Dict["footer"]; nav: Dict["nav"] }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <Link href={`/${lang}`} className="brand" aria-label={nav.home}>
            <Logo size={30} />
          </Link>
          <nav aria-label={d.label} className="footer-links">
            <Link href={`/${lang}#how`}>{nav.how}</Link>
            <Link href={`/${lang}#examples`}>{nav.examples}</Link>
            <Link href={`/${lang}#faq`}>{nav.faq}</Link>
            <Link href={`/${lang}/privacy`}>{d.privacy}</Link>
          </nav>
          <div className="footer-end">
            <a href={`mailto:${config.contactEmail}`} className="email">
              {config.contactEmail}
            </a>
            <LangSwitch lang={lang} name={nav.language} />
          </div>
        </div>
        <p className="legal">{d.legalLine}</p>
        <p className="legal">
          © {new Date().getFullYear()} {d.rights}
        </p>
      </div>
    </footer>
  );
}
