import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { locales } from "@/lib/i18n";

const pages = ["", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${config.siteUrl}/${lang}${page}`,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${config.siteUrl}/${l}${page}`])),
          // The bare address redirects to the visitor's language, so it is the x-default (see layout.tsx).
          "x-default": `${config.siteUrl}${page || "/"}`,
        },
      },
    })),
  );
}
