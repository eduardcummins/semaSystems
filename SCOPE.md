# Sema Systems Website Scope

## Goal and audience
The site gets a business owner to book a call, and shows them what a Sema Systems solution would do inside their own workflow.

- **Primary action:** request a call (name, email, one line on their workflow).
- **Audience:** small businesses (accountancy firms, communications teams) and people in insurance.
- **First clients:** warm leads through family and contacts, plus consultancies in Spain reached via Accountex. They will check the site before the call, so it must look credible in under a minute.

## What Sema Systems sells
Bespoke AI solutions. A business explains a workflow, Sema proposes a solution, builds it in its own software, and shows it to the client as a visual workflow graph so they can see and understand every step. It is not built on n8n or similar tools. The site should feel like a high-growth startup.

## Pages
Version 1 is a single scrolling homepage plus one page per example workflow, a privacy page and a Spanish version of everything.

| Page | Purpose |
| --- | --- |
| Home | Explain the offer and drive the call request |
| Workflow page (x3, placeholders) | Make the offer concrete: the problem, the steps shown as a workflow graph, what the client gets back |
| Privacy | Required for the contact form |

## Front page, top to bottom
1. **Hero:** headline "Building bespoke AI solutions for businesses", a subline naming small businesses, and a Book a call button.
2. **Example workflows:** three cards linking to the workflow pages.
3. **How it works:** three steps. The client describes a workflow, Sema proposes a solution, Sema builds it and a person reviews the output.
4. **About:** the people behind Sema Systems and Ed's background, including the insurance contract automation work, without mentioning presenting to insurers. No testimonials or client logos.
5. **Contact:** call request form, visible email address, footer with legal details and the language switch.

## Header, intro and language
- **Intro:** on first visit the S logo sits large in the centre of an off-white screen, then shrinks into the header's left corner as the page appears. Once per visit, skipped for reduced motion.
- **Header at the top:** full width and flat. **After about 40px of scroll:** floating rounded bar with margin, soft shadow and slight blur.
- **Navigation:** Home, Workflows, About, Contact, then EN / ES. No dropdowns.
- **Spanish:** launched alongside English, formal "usted", natural copy, reviewed by Ed before launch. Pages under /en and /es, copy in two language files, the switch keeps the same page.

## Example workflows
The three lead workflows are undecided. Build three placeholder workflows, clearly marked, one file each, so real ones are a content change only. Likely candidates are insurance, accountancy and communications. Each workflow page shows its steps as a visual graph and states that a person reviews the output.

## Build and hosting
- Next.js in the semaSystems GitHub repo, deployed on the existing Vercel project.
- Logo supplied as public/logo-reference.jpeg, redrawn as SVG.
- Contact form posts to a server route that emails the request to Ed.
- Loads fast, works on a phone, light and dark themes.

## Out of scope for version 1
Client logins or dashboards, live demos or chatbot, blog, case studies, testimonials, pricing, analytics beyond basic visit counts.

## Still open
- Domain (launch on a Vercel address first if none).
- The three real workflows to lead with, and who can confirm them.
