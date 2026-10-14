import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { isLocale } from "@/lib/i18n";
import { bookHref } from "@/lib/config";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${dictionaries[lang].placeholder.privacyTitle} | Sema Systems`,
    alternates: { canonical: `/${lang}/privacy`, languages: { en: "/en/privacy", es: "/es/privacy", "x-default": "/en/privacy" } },
  };
}

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = dictionaries[lang];
  return (
    <>
      <Header lang={lang} nav={d.nav} book={bookHref(lang)} />
      <main className="wrap narrow page">
        <h1 className="display h2">{d.placeholder.privacyTitle}</h1>
        <p className="lead">{d.placeholder.text}</p>
        <Link href={`/${lang}`} className="text-link">
          <span aria-hidden="true">←</span> {d.placeholder.back}
        </Link>
      </main>
      <Footer lang={lang} d={d.footer} nav={d.nav} />
    </>
  );
}
