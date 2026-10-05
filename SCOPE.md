# Sema Systems Website Scope

Date: 2026-10-05

## Goal and audience

The site gets a business owner to book a call, and shows them what a Sema Systems agent would do inside their own workflow.

- **Primary action:** request a call (name, email, one line on their workflow).
- **Who it is for:** small businesses such as accountancy firms and communications teams, and people in insurance.
- **First clients:** warm leads through family and contacts, plus consultancies in Spain reached via Accountex. They will check the site before the call, so it has to look credible in under a minute.

## Pages

Version 1 is a single scrolling homepage plus one page per example workflow.

| Page | Purpose | Contents |
| --- | --- | --- |
| Home | Explain the offer and drive the call request | Logo and one-line pitch, three example workflows, how an engagement runs, call request form |
| Workflow page (one each) | Make the offer concrete | The problem, the agent's steps, what the client gets back, rough time saved |
| Contact | Capture the lead | Form plus a visible email address |

## Front page

Five sections, top to bottom. About and Contact are sections of this page, and their nav links scroll to them.

1. **Hero:** headline "Building bespoke AI solutions for businesses", with a subline naming small businesses as the main audience, and a Book a call button.
2. **Example workflows:** three cards, one each for insurance, accountancy and communications, linking to their workflow pages.
3. **How it works:** three steps. The client describes a workflow, Sema proposes a solution, Sema builds it and a person reviews the output.
4. **About:** a short note on the people behind Sema Systems and Ed's background, including the insurance contract automation work. The site speaks as the company and does not claim a team size. No testimonials or client logos until real ones exist.
5. **Contact:** the call request form with a visible email address, then the footer with the language switch.

## Header, intro and language

- **Intro:** on first visit the S logo sits large in the centre of an empty off-white screen, then shrinks and moves into the header's left corner as the page appears. It plays once per visit and is skipped for reduced-motion users. The page content is present underneath, so nothing depends on the animation finishing.
- **Header at the top:** full width and flat.
- **Header after about 40px of scroll:** a floating rounded bar with margin, soft shadow and slight blur.
- **Navigation:** Home, Workflows, About, Contact, then the EN / ES switch at the right end. No dropdowns while there are this few pages.
- **Spanish:** launched alongside English. Pages live under /en and /es, all copy sits in two language files, and the switch keeps the visitor on the same page. First visit follows the browser language. Spanish is written as natural copy, not translated word for word, and Ed reviews it before launch.

## Example workflows

The three lead workflows are not decided yet. The site is built with three workflow slots filled with clearly marked placeholder content, and each slot is one file, so adding the real workflows later is a content change only.

Insurance, accountancy and communications are the likely candidates. Each should be checked with a real contact before it goes live, so the page describes work people actually do.

Each workflow page shows a short before and after, and states clearly that a person reviews the output.

## Build and hosting

- **Stack:** Next.js in the existing semaSystems GitHub repo, deployed on the Vercel project already created.
- **Brand:** the black S logo on an off-white ground is the anchor. Colour stays minimal, with black and off-white as the base and at most one accent. The logo is supplied as an image and will be redrawn as a clean SVG.
- **Content:** workflow pages are plain files in the repo, so adding one is a single new file.
- **Contact form:** posts to a small server route that emails the request to Ed.
- **Quality bar:** loads fast, works on a phone, readable in light and dark.

## Out of scope for version 1

- Client logins or a dashboard
- Live agent demos or a chatbot on the site
- Blog, case studies and testimonials, until real ones exist
- Pricing page
- Analytics beyond basic visit counts

## Open questions

- [ ] Which reference sites feel right for the look and animation? (Suggestions are in the chat; add the chosen ones here.)
- [ ] Do you have a domain, or should the site launch on a Vercel address first?
- [ ] Which three workflows do you want to lead with, and who can confirm them?