// Language-independent workflow config. All text lives in content/en.ts and es.ts (dict.player.items[id]).
export type WfId = "invoices" | "inbox" | "chasing" | "contracts" | "submission" | "briefing";

export type WfNode = { id: string; dur?: number; human?: boolean };
export type WfCfg = {
  id: WfId;
  nodes: WfNode[]; // run order; the last node is the human-review step
  tools: (string | { en: string; es: string })[]; // product names, shown as "Tools used"
};

export const workflows: WfCfg[] = [
  { id: "invoices", tools: ["Gmail", "pdfplumber", "Claude", "Google Sheets"], nodes: [{ id: "email", dur: 0.2 }, { id: "read", dur: 0.7 }, { id: "extract", dur: 1.5 }, { id: "sheet", dur: 0.6 }, { id: "review", human: true }] },
  { id: "inbox", tools: [{ en: "Shared inbox", es: "Bandeja compartida" }, "Claude", "Gmail"], nodes: [{ id: "enquiry", dur: 0.2 }, { id: "classify", dur: 0.9 }, { id: "draft", dur: 1.6 }, { id: "review", human: true }, { id: "send", dur: 0.3 }] },
  { id: "chasing", tools: ["Gmail", "pdfplumber", "Google Sheets", "Claude"], nodes: [{ id: "email", dur: 0.2 }, { id: "read", dur: 0.8 }, { id: "check", dur: 0.5 }, { id: "draft", dur: 1.4 }, { id: "review", human: true }] },
  { id: "contracts", tools: [{ en: "Secure upload", es: "Subida segura" }, "Claude"], nodes: [{ id: "contract", dur: 0.6 }, { id: "terms", dur: 2.1 }, { id: "flag", dur: 1.8 }, { id: "review", human: true }] },
  { id: "submission", tools: [{ en: "Shared inbox", es: "Bandeja compartida" }, "Claude"], nodes: [{ id: "inbox", dur: 0.3 }, { id: "extract", dur: 2.0 }, { id: "build", dur: 0.9 }, { id: "review", human: true }] },
  { id: "briefing", tools: [{ en: "News and web sources", es: "Noticias y fuentes web" }, "Claude"], nodes: [{ id: "collect", dur: 1.2 }, { id: "filter", dur: 1.1 }, { id: "summarise", dur: 1.7 }, { id: "review", human: true }] },
];

export const heroWorkflow = workflows[0];
