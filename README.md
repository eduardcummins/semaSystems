# Sema Systems website

Home page and privacy page, in English (/en) and Spanish (/es). See CLAUDE.md for the standing rules.

## Run locally
```
npm install
npm run dev          # http://localhost:3000, reloads on change
npm run build && npm start   # production build on http://localhost:3000
npm run lint
```

## Settings
Copy `.env.example` to `.env.local` and fill in what you need. Every setting is optional:
- `RESEND_API_KEY`: sends contact-form messages by email through Resend, from `website@semasys.xyz` (override with `CONTACT_FROM_EMAIL`). Without it the live form shows an error; locally, messages are printed in the terminal.
- `CONTACT_EMAIL`: the address shown on the site (default hello@semasys.xyz, which forwards to Gmail through ImprovMX).
- `CONTACT_FORM_TO`: the inbox that receives contact-form messages (default hello@semasys.xyz).
- `SITE_URL`: public address, used for canonical links, the sitemap and the share image (defaults to the Vercel production domain).

## Where things are
- Copy: `content/en.ts`, `content/es.ts`
- Page: `app/[lang]/page.tsx`; styles: `app/globals.css`
- Sections: `components/` (HeroVisual, HowItWorks, Examples, ContactForm, …)
- Contact form handler: `app/api/contact/route.ts`
