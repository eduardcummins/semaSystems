// Language-independent example config. All wording lives in content/en.ts and es.ts (dict.examples.items[id]).
export type ExampleId = "invoices" | "inbox" | "chasing" | "contracts" | "submission" | "briefing";

export type ExampleCfg = {
  id: ExampleId;
  check: number; // index of the step a person does ("You check this")
  tools: string[]; // product names only
};

export const examples: ExampleCfg[] = [
  { id: "invoices", check: 3, tools: ["Gmail", "Google Sheets", "Xero"] },
  { id: "inbox", check: 3, tools: ["Gmail", "Outlook"] },
  { id: "chasing", check: 3, tools: ["Gmail", "Google Sheets"] },
  { id: "contracts", check: 3, tools: ["Outlook", "SharePoint"] },
  { id: "submission", check: 3, tools: ["Outlook", "Excel"] },
  { id: "briefing", check: 3, tools: ["Google Alerts", "Gmail"] },
];
