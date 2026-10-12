import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { locales } from "@/lib/i18n";

const pages = ["", "/privacy", "/legal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${config.siteUrl}/${lang}${page}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${config.siteUrl}/${l}${page}`])) },
    })),
  );
}
