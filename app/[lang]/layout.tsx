import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { config } from "@/lib/config";
import { isLocale, locales } from "@/lib/i18n";
import { Inter, Instrument_Serif } from "next/font/google";
import "../globals.css";

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" };

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

// Self-hosted at build time by next/font, with size-adjusted fallbacks so the swap causes no layout shift.
const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-serif" });

// data-js tells the CSS that scripts run (some sections fall back to a plain layout without them).
// The home-page intro plays once per session, only on a fresh visit to /en or /es, never under reduced motion.
// It only hides content with opacity, so the page is complete in the HTML and nothing shifts (see Intro.tsx).
const introScript = `document.documentElement.setAttribute("data-js","");try{if(/^\\/(en|es)\\/?$/.test(location.pathname)&&!location.hash&&!sessionStorage.getItem("sema-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("sema-intro","1");document.documentElement.setAttribute("data-intro","")}}catch(e){}`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
