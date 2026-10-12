import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { config } from "@/lib/config";
import { isLocale, locales } from "@/lib/i18n";
import { Intro } from "@/components/Intro";
import "../globals.css";

export const viewport: Viewport = { themeColor: "#f6f4ef" };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = dictionaries[lang].meta;
  return {
    metadataBase: new URL(config.siteUrl),
    title: d.title,
    description: d.description,
    alternates: { canonical: `/${lang}`, languages: { en: "/en", es: "/es", "x-default": "/en" } },
    openGraph: {
      type: "website",
      siteName: "Sema Systems",
      title: d.title,
      description: d.description,
      url: `/${lang}`,
      locale: d.ogLocale,
      alternateLocale: [dictionaries[lang === "en" ? "es" : "en"].meta.ogLocale],
    },
    twitter: { card: "summary_large_image", title: d.title, description: d.description },
  };
}

// Decides before first paint whether the logo intro plays (once per visit, never with reduced motion).
const introScript = `try{var h=document.documentElement;h.dataset.intro=(sessionStorage.getItem("introSeen")||matchMedia("(prefers-reduced-motion: reduce)").matches)?"skip":"run"}catch(e){document.documentElement.dataset.intro="skip"}`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body suppressHydrationWarning>
        <Intro />
        {children}
      </body>
    </html>
  );
}
