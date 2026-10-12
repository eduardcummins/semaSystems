# Sema Systems website: standing rules

Read SCOPE.md before doing anything. This file holds decisions that must not be forgotten or reversed.

## Business
- Brand and trading name: Sema Systems. Legal entity: Innovation Partners Ltd, company no. 04369538, registered office 3 Athenaeum Road, London, England, N20 9AA. Show these in the footer and privacy policy.
- Sema Systems builds bespoke AI solutions for businesses, mainly small businesses, plus insurance.
- Solutions are bespoke, built in our own software. They are not built on n8n, Zapier or any similar tool. They are presented to clients as a visual workflow graph so the client can see and understand every step.
- Tone: confident, plain, high-growth startup. Speak as the company. Do not claim a team size, clients, testimonials or logos we do not have.
- Contact email for now: eduardcummins@gmail.com (show it as selectable text, and send form submissions there).

## Content rules
- Hero headline: "Building bespoke AI solutions for businesses", with a subline naming small businesses.
- No pricing anywhere on the site.
- Do not mention presenting work to insurers in the About copy.
- The three lead workflows are undecided. Build three clearly marked placeholder workflow files; each is one file under src/content/workflows/.
- Write the privacy policy yourself (UK company, contact form data, no analytics beyond basic visit counts). Flag at the top of the file that it needs a legal read before launch.

## Languages
- English and Spanish from day one, under /en and /es. All copy lives in src/content/en.json and es.json.
- First visit follows the browser language. The switch keeps the visitor on the same page.
- Spanish uses formal "usted". Write natural Spanish, not word-for-word translation. Ed (fluent) reviews it before launch.

## Design
- Logo: black S made of three wavy horizontal ribbons on off-white. Redraw public/logo-reference.jpeg as a clean SVG at public/logo.svg. Do not use the JPEG on the site.
- Palette: black and off-white base, at most one accent colour. Both light and dark themes.
- Header: full width and flat at the top; after about 40px of scroll it becomes a floating rounded bar with margin, soft shadow and slight blur. Links: Home, Workflows, About, Contact, then the EN / ES switch.
- Intro: on first visit the logo sits large and centred, then shrinks and moves into the header's left corner as the page appears. Once per visit, skipped for prefers-reduced-motion, and page content is present underneath so nothing depends on the animation finishing. Ed may supply public/logo-intro.mp4 (a logo assembly animation); if it is missing, animate the SVG instead.
- Animation: restrained and well timed (Motion library). A few good effects beat many. References: rive.app, epic.net, eszterbial.com. Avoid heavy 3D.
- Must work well at phone width. Respect prefers-reduced-motion. Keep it fast.

## Build
- Next.js (App Router, TypeScript) in this repo, deployed to the existing Vercel project.
- Contact form posts to src/app/api/contact/route.ts, which emails the request to the contact address. Keep keys in .env.local and never commit it.
- Out of scope for v1: logins, dashboards, live demos, chatbot, blog, case studies, pricing, advanced analytics.

## Working style
- Build in stages and show progress: scaffold, header and intro, front page, workflow pages, Spanish, contact form, privacy policy.
- Ask before adding dependencies beyond Next.js, React, Motion and an email service.
