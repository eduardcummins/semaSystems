import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { config } from "@/lib/config";
import { isLocale } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${dictionaries[lang].privacy.title} | Sema Systems`,
    alternates: { canonical: `/${lang}/privacy`, languages: { en: "/en/privacy", es: "/es/privacy", "x-default": "/en/privacy" } },
  };
}

// "{email}" in the policy text becomes a link to the contact address.
function withEmail(text: string) {
  return text.split("{email}").map((part, i) => (
    <span key={i}>
      {i > 0 && <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>}
      {part}
    </span>
  ));
}

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = dictionaries[lang];
  const p = d.privacy;
  return (
    <>
      <Header lang={lang} nav={d.nav} />
      <main className="wrap narrow page">
        <h1 className="display h2">{p.title}</h1>
        <p className="updated">{p.updated}</p>
        <div className="prose">
          {p.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i}>
                    {b.map((item) => (
                      <li key={item}>{withEmail(item)}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{withEmail(b)}</p>
                ),
              )}
            </section>
          ))}
        </div>
        <Link href={`/${lang}`} className="text-link">
          <span aria-hidden="true">←</span> {p.back}
        </Link>
      </main>
      <Footer lang={lang} d={d.footer} nav={d.nav} />
    </>
  );
}
