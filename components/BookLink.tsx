import Link from "next/link";

/** Primary call-to-action: external booking page (BOOKING_URL) in a new tab, or the in-page #contact form. */
export function BookLink({ href, location, className = "btn", children }: { href: string; location: string; className?: string; children: React.ReactNode }) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={className} data-cta={location} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} data-cta={location}>
      {children}
    </Link>
  );
}
