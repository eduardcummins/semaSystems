import { insurance } from "./insurance";
import { accountancy } from "./accountancy";
import { communications } from "./communications";
import type { Workflow } from "./types";
import type { Locale } from "@/lib/i18n";

// To add a workflow: create one file in this folder and add it to this list.
const all = [insurance, accountancy, communications];

export const workflows = (lang: Locale): Workflow[] => all.map((w) => w[lang]);
export const workflow = (lang: Locale, slug: string) => workflows(lang).find((w) => w.slug === slug);
export const workflowSlugs = () => all.map((w) => w.en.slug);
