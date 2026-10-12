import Link from "next/link";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/i18n";
import { config } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer({ lang, d }: { lang: Locale; d: Dict["footer"] }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo size={40} />
            <p>{d.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <Link href={`/${lang}/privacy`}>{d.privacy}</Link>
            <Link href={`/${lang}/legal`}>{d.legal}</Link>
            <a href={config.linkedin} target="_blank" rel="noopener noreferrer">
              {d.linkedin}
            </a>
          </nav>
        </div>
        <p className="legal-line">{d.legalLine}</p>
      </div>
    </footer>
  );
}
