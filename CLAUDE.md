# Sema Systems website: standing rules

Decisions that must not be forgotten or reversed. The site is a single home page plus a privacy page, in English and Spanish.

## Business
- Brand and trading name: Sema Systems. Legal entity: Innovation Partners Ltd, company no. 04369538, registered office 3 Athenaeum Road, London, N20 9AA. The legal line is in the footer.
- Sema Systems builds bespoke AI agents for businesses, mainly small teams, accountancy firms and insurers. Each agent is built in our own software (not n8n, Zapier or similar) and handed over as a visual workflow the client's team can read and run. Make that visual workflow obvious wherever it fits.
- Tone: plain, short UK English, confident, no hype. No jargon, library or model names on marketing pages. Do not claim a team size, clients, testimonials or logos we do not have.
- No pricing anywhere on the site.
- Contact email: hello@semasys.xyz, forwarded to eduardcummins@gmail.com by ImprovMX (DNS in Vercel). The form sends from website@semasys.xyz to hello@semasys.xyz via Resend (lib/config.ts: CONTACT_EMAIL, CONTACT_FORM_TO).
- Live at https://www.semasys.xyz (Vercel, free Hobby plan for now).

## Page
- Order: Hero → How it works → Example workflows → FAQ → "Get in touch" with the contact form → Footer.
- Hero headline: "Building bespoke, interactive AI agents." The hero visual is the "Invoice intake" agent shown as a workflow.
- How it works is pinned while you scroll through it; each step adds an isometric plate and swaps in its text.
- Examples: six illustrative workflows. The step a person does is dashed, in the accent colour, labelled "You check this".
- The design is original. Do not copy text, assets or recognisable details from other companies' sites.

## Languages
- English and Spanish under /en and /es. All copy lives in content/en.ts and content/es.ts (typed by content/types.ts); nothing is hard-coded in one language.
- First visit follows the browser language. The switch keeps the visitor on the same page and section.
- Spanish uses formal "usted" and should read naturally, not as a translation. Ed reviews it before launch.

## Design
- Near-black (#050505), monochrome, one accent colour (--accent in app/globals.css) used only for the human step.
- Headings in Instrument Serif, body in Inter (next/font). White pill for the primary CTA. Hairline dividers.
- Logo: the black S of three wavy ribbons, drawn as SVG in components/Logo.tsx and app/icon.svg.
- Load intro: plays once per session, skippable, off under reduced motion, no layout shift.
- Must work down to 360px with no horizontal scroll. Respect prefers-reduced-motion. Keep it fast.

## Build and hosting
- Next.js (App Router, TypeScript). Run locally for now (see README.md). Do not push, open PRs or deploy unless Ed asks.
- The privacy policy (content/en.ts and es.ts, `privacy`) was written in-house and needs a legal read.
- The contact form posts to app/api/contact/route.ts, which emails the request via Resend when RESEND_API_KEY is set. Keys go in .env.local, never committed.
- `npm run build` and `npm run lint` must pass.
- Page views are counted with Vercel Web Analytics (@vercel/analytics, cookie-free). The /_vercel path is excluded from the language redirect in proxy.ts so it keeps working.
- Ask before adding dependencies beyond Next.js, React, Vercel Analytics and an email service.
