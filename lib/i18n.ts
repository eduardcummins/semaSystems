export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";
