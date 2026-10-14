import type { Dict } from "./types";

// Plain, short UK English. No hype, no jargon, no pricing.
export const en: Dict = {
  meta: {
    title: "Sema Systems: agents you can watch work",
    description:
      "Bespoke AI agents for accountancy firms, insurers and small teams. Built in our own software and delivered as a workflow your team can read and run.",
    ogLocale: "en_GB",
  },
  nav: {
    label: "Main",
    how: "How it works",
    examples: "Examples",
    faq: "FAQ",
    book: "Book a free call",
    menu: "Menu",
    close: "Close menu",
    home: "Sema Systems home",
    language: "Español",
  },
  hero: {
    title: "Agents you can watch work.",
    sub: "Describe a task in plain words. We build an AI agent that does it inside the tools you already use, and show you every step so your team stays in control.",
    audience: "For accountancy firms, insurers and small teams.",
    primary: "Book a free call",
    secondary: "Send us a task",
    visual: {
      label: "Example: an agent called Invoice intake, shown as four steps. The last step waits for you to approve.",
      agent: "Invoice intake",
      status: "Running",
      steps: ["New invoice arrives", "Reads the invoice", "Adds it to your sheet", "You approve"],
      log: "Today · 6 invoices processed · 1 waiting for you",
    },
  },
  how: {
    heading: "How it works.",
    steps: [
      {
        title: "Your workflow",
        text: "You walk us through how the work gets done today, in your own words: where it comes in, who touches it and where the time goes.",
      },
      {
        title: "The design",
        text: "We map it as a workflow and agree what's worth automating, what to leave alone, and where a person should check the work.",
      },
      {
        title: "The build",
        text: "We build the agent in our own software and connect it to the tools you already use.",
        points: [
          { lead: "Rules in code.", text: "Calculations, checks and routing run the same way every time." },
          { lead: "AI only for judgment.", text: "Reading a document or drafting a reply, and it records why." },
          { lead: "You sign off.", text: "Nothing leaves the business without a person's approval unless you choose otherwise." },
        ],
      },
      {
        title: "Your team",
        text: "We hand it over so your team understands it and can run it.",
        points: [
          { lead: "The workflow view.", text: "Every step, what goes in and what comes out." },
          { lead: "Plain-English notes.", text: "What each step does, and what to do if it stops." },
          { lead: "A run log.", text: "Every run is recorded, so you can check any result." },
        ],
      },
    ],
  },
  examples: {
    heading: "Example workflows",
    sub: "Six tasks an agent could take off your desk.",
    illustrative: "Illustrative",
    tabsLabel: "Choose an example",
    problem: "The problem",
    does: "What the agent does",
    check: "You check this",
    before: "Before",
    after: "After",
    tools: "Works with",
    items: {
      invoices: {
        tab: "Invoices",
        problem: "Supplier invoices arrive by email and someone retypes each one into a spreadsheet.",
        steps: ["Spots a new invoice in the inbox", "Reads the supplier, date and amount", "Adds a row to your sheet", "You check the new rows"],
        before: "About two hours retyping 30 invoices.",
        after: "Rows added for you. A two-minute check.",
      },
      inbox: {
        tab: "Enquiries",
        problem: "Enquiries pile up in a shared inbox and replies go out late.",
        steps: ["Reads each new enquiry", "Sorts it: quote, support or other", "Drafts a reply in your words", "You approve the reply", "Sends it from your address"],
        before: "Five to ten minutes on every enquiry.",
        after: "A draft waiting for each one. You approve it.",
      },
      chasing: {
        tab: "Accountancy",
        problem: "Clients send documents late and someone loses an afternoon chasing them.",
        steps: ["Reads each document a client sends", "Checks it against what's still needed", "Drafts a reminder listing what's missing", "You approve each reminder"],
        before: "An afternoon chasing 20 clients.",
        after: "Reminders drafted. You approve each one.",
      },
      contracts: {
        tab: "Insurance review",
        problem: "Every new contract needs a careful first read before anyone can act on it.",
        steps: ["Reads the whole contract", "Pulls out the key terms", "Flags clauses that need a closer look", "You decide on each flag"],
        before: "An hour or more for a first read.",
        after: "A first pass in minutes. Every call is yours.",
      },
      submission: {
        tab: "Broker intake",
        problem: "Broker submissions arrive as emails and attachments, and each one is keyed in by hand.",
        steps: ["Opens the email and its attachments", "Picks out the risk details", "Builds the submission and lists any gaps", "You check it before it moves on"],
        before: "Twenty to forty minutes keying each one.",
        after: "A tidy draft with the gaps listed. You check it.",
      },
      briefing: {
        tab: "Briefing",
        problem: "Someone spends the first hour of every day reading the news about your clients.",
        steps: ["Collects overnight coverage on your topics", "Keeps only what matters", "Writes a one-page briefing with sources", "You sign it off"],
        before: "An hour of reading every morning.",
        after: "A one-page briefing ready when you arrive.",
      },
    },
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        q: "Will we depend on you to keep it running?",
        a: "No, and that's the point. Everything we build is designed for your team to understand: you get the workflow view, plain-English notes on every step and a handover session. We're still here whenever you want changes, a new workflow or a second pair of eyes.",
      },
      {
        q: "Do you replace our existing software?",
        a: "No. Our aim is to automate the workflows you already run, inside the tools you already use: email, spreadsheets, Sage, Xero, your CRM. If we genuinely think a tool is holding a workflow back, we'll say so and explain why, but replacing software isn't the goal.",
      },
      {
        q: "What is an AI agent, in practice?",
        a: "Software that carries out a task step by step, the way a person would. Most steps follow fixed rules. AI is used only where judgment is needed, such as reading a document or drafting a reply.",
      },
      {
        q: "What if it gets something wrong?",
        a: "Every run is logged and the important steps wait for a person. If something looks off, you can see exactly which step did what, and what it was working from.",
      },
      {
        q: "Is our data safe?",
        a: "The agent runs on your own accounts, with only the access the task needs. Your data is used to run your workflow and nothing else. We build with UK GDPR in mind and agree how your data is handled before we start.",
      },
      {
        q: "How long does a first workflow take?",
        a: null, // TODO(Ed): confirm a typical timeframe, then replace null with the answer.
      },
      {
        q: "How much does it cost?",
        a: "Every build is scoped to the workflow. After a free call we send you a written quote, before any work starts.",
      },
      {
        q: "What do you need from us to start?",
        a: "A 30-minute call and one task that eats your team's time.",
      },
      {
        q: "Do you work in Spanish?",
        a: "Yes. We work in English, Spanish and Catalan.",
      },
    ],
  },
  closing: {
    title: "Send us one task that eats your week.",
    sub: "We'll show you how an agent would do it.",
    email: "Or email",
  },
  contact: {
    heading: "Send us a task",
    email: "Your email",
    task: "What task eats your time?",
    optional: "optional",
    send: "Send",
    sending: "Sending...",
    success: "Thank you. We have your message and will reply soon.",
    error: "Something went wrong. Please try again, or email us instead.",
    consentBefore: "We'll only use your details to reply to you. See our ",
    consentLink: "privacy policy",
    consentAfter: ".",
  },
  footer: {
    privacy: "Privacy policy",
    label: "Footer",
    legalLine:
      "Sema Systems is a trading name of Innovation Partners Ltd. Registered in England & Wales, company no. 04369538. Registered office: 3 Athenaeum Road, London, N20 9AA.",
    rights: "Sema Systems",
  },
  placeholder: {
    privacyTitle: "Privacy policy",
    text: "This page is a placeholder and will be written separately.",
    back: "Back to home",
  },
};
