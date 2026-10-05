import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { dict } from "@/content";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: dict(lang).meta.title,
    description: dict(lang).meta.description,
    alternates: { languages: { en: "/en", es: "/es" } },
  };
}

const introScript = `try{if(!sessionStorage.getItem("intro-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="on"}catch(e){}`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: introScript }} /></head>
      <body>
        <Intro />
        <Header lang={lang} t={t.nav} />
        {children}
      </body>
    </html>
  );
}
