import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { config } from "@/lib/config";
import { Analytics } from "@/components/Analytics";
import { isLocale, locales } from "@/lib/i18n";
import { Inter, JetBrains_Mono } from "next/font/google";
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

// Self-hosted at build time by next/font, with automatic size-adjusted fallbacks to avoid layout shift.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains", weight: ["400", "600"] });

// Applies a saved light/dark choice before first paint; with no choice the CSS follows the system setting.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
