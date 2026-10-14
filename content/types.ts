import type { ExampleId } from "@/lib/examples";

export type ExampleCopy = {
  tab: string;
  problem: string;
  steps: string[]; // 3-5 short sentences, in order; lib/examples.ts marks which one a person does
  before: string;
  after: string;
};

export type Dict = {
  meta: { title: string; description: string; ogLocale: string };
  nav: { label: string; how: string; examples: string; faq: string; book: string; menu: string; close: string; home: string; language: string };
  hero: {
    title: string;
    sub: string;
    audience: string;
    primary: string;
    secondary: string;
    visual: { label: string; agent: string; view: string; status: string; steps: string[]; log: string; caption: string };
  };
  how: {
    heading: string;
    steps: { title: string; text: string; points?: { lead: string; text: string }[] }[];
  };
  examples: {
    heading: string;
    sub: string;
    illustrative: string;
    tabsLabel: string;
    problem: string;
    does: string;
    check: string;
    before: string;
    after: string;
    items: Record<ExampleId, ExampleCopy>;
  };
  // An answer of null hides the question until it is written (see the TODO next to it).
  faq: { heading: string; items: { q: string; a: string | null }[] };
  closing: { title: string; sub: string; email: string };
  contact: {
    heading: string;
    email: string;
    task: string;
    optional: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
  };
  footer: { label: string; privacy: string; legalLine: string; rights: string };
  placeholder: { privacyTitle: string; text: string; back: string };
};
