import type { WfId } from "@/lib/workflows";

export type NodeCopy = { title: string; tool: string; result: string; input: string; output: string };
export type WfCopy = {
  tab: string;
  title: string;
  sample: string;
  before: string;
  after: string;
  nodes: Record<string, NodeCopy>;
};

export type Dict = {
  meta: { title: string; description: string; ogLocale: string };
  nav: { examples: string; faq: string; book: string; menu: string; close: string; home: string };
  hero: { title: string; sub: string; primary: string; secondary: string };
  player: {
    label: string;
    sample: string;
    before: string;
    after: string;
    tools: string;
    illustrative: string;
    play: string;
    pause: string;
    next: string;
    restart: string;
    stepNow: string; // "Step {n} of {total}: {title}"
    input: string;
    output: string;
    pending: string;
    person: string;
    hint: string;
    items: Record<WfId, WfCopy>;
  };
  problem: { heading: string; problemTitle: string; problem: string[]; getTitle: string; get: string[] };
  examples: { heading: string; intro: string };
  faq: { heading: string; items: { q: string; a: string }[] };
  contact: {
    heading: string;
    intro: string;
    name: string;
    company: string;
    email: string;
    task: string;
    message: string;
    optional: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
  };
  footer: { themeLight: string; themeDark: string; tagline: string; privacy: string; legal: string; linkedin: string; legalLine: string };
  placeholder: { privacyTitle: string; legalTitle: string; text: string; back: string };
};
