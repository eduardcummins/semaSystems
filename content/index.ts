import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { es } from "./es";
import type { Dict } from "./types";

export const dictionaries: Record<Locale, Dict> = { en, es };
export type { Dict };
