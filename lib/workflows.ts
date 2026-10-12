// Language-independent workflow config. All text lives in content/en.ts and es.ts (dict.workflows.items[id]).
export type WfId = "invoices" | "inbox" | "chasing" | "contracts" | "submission" | "briefing";

export type WfNode = { id: string; dur?: number; human?: boolean };
export type Pos = Record<string, [number, number]>;
export type WfCfg = {
  id: WfId;
  nodes: WfNode[]; // run order; the last node is the person-review step
  /** Defaults to a simple chain in node order. Optional [from, to, fromFrac, toFrac] anchors apply to vertical layouts. */
  edges?: [string, string, number?, number?][];
  /** Optional hand-placed layouts; otherwise nodes are laid out automatically. */
  positions?: { wide: Pos; narrow: Pos };
  /** Every third loop fails at this node, to show where an agent went wrong. */
  failAt?: string;
};

export const workflows: WfCfg[] = [
  {
    id: "invoices",
    nodes: [
      { id: "email", dur: 0.2 },
      { id: "read", dur: 0.7 },
      { id: "extract", dur: 1.5 },
      { id: "sheet", dur: 0.6 },
      { id: "review", human: true },
    ],
    failAt: "extract",
  },
  {
    id: "inbox",
    nodes: [{ id: "enquiry", dur: 0.2 }, { id: "classify", dur: 0.9 }, { id: "draft", dur: 1.6 }, { id: "review", human: true }, { id: "send", dur: 0.3 }],
  },
  {
    id: "chasing",
    nodes: [{ id: "email", dur: 0.2 }, { id: "read", dur: 0.8 }, { id: "check", dur: 0.5 }, { id: "draft", dur: 1.4 }, { id: "review", human: true }],
  },
  {
    id: "contracts",
    nodes: [{ id: "contract", dur: 0.6 }, { id: "terms", dur: 2.1 }, { id: "flag", dur: 1.8 }, { id: "review", human: true }],
  },
  {
    id: "submission",
    nodes: [{ id: "inbox", dur: 0.3 }, { id: "extract", dur: 2.0 }, { id: "build", dur: 0.9 }, { id: "review", human: true }],
  },
  {
    id: "briefing",
    nodes: [{ id: "collect", dur: 1.2 }, { id: "filter", dur: 1.1 }, { id: "summarise", dur: 1.7 }, { id: "review", human: true }],
  },
];

export const heroWorkflow = workflows[0];
