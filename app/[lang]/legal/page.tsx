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
  return { title: `${dictionaries[lang].placeholder.legalTitle} | Sema Systems`, alternates: { canonical: `/${lang}/legal`, languages: { en: "/en/legal", es: "/es/legal", "x-default": "/en/legal" } } };
}

export default async function Placeholder({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = dictionaries[lang];
  return (
    <>
      <Header lang={lang} nav={d.nav} book={bookHref(lang)} />
      <main className="wrap section placeholder">
        <h1>{d.placeholder.legalTitle}</h1>
        <p className="lead">{d.placeholder.text}</p>
        <Link href={`/${lang}`} className="btn">
          {d.placeholder.back}
        </Link>
      </main>
      <Footer lang={lang} d={d.footer} />
    </>
  );
}
