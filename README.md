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
- `BOOKING_URL`: Calendly or Cal.com link. Without it, "Book a free call" scrolls to the contact form.
- `RESEND_API_KEY` (and `CONTACT_FROM_EMAIL`): sends contact-form messages by email. Without it, they are only printed in the server log.
- `CONTACT_EMAIL`: where messages go and the address shown on the site (default eduardcummins@gmail.com).
- `SITE_URL`: public address, used for canonical links, the sitemap and the share image.

## Where things are
- Copy: `content/en.ts`, `content/es.ts`
- Page: `app/[lang]/page.tsx`; styles: `app/globals.css`
- Sections: `components/` (HeroVisual, HowItWorks, Examples, ContactForm, …)
- Contact form handler: `app/api/contact/route.ts`
