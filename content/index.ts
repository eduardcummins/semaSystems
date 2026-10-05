import { en } from "./en";
import { es } from "./es";
import type { Locale } from "@/lib/i18n";

export const dict = (lang: Locale) => (lang === "es" ? es : en);
