export type Workflow = {
  slug: string;
  placeholder: boolean;
  sector: string;
  title: string;
  summary: string;
  problem: string;
  steps: string[];
  returns: string[];
  saved: string;
  before: string;
  after: string;
};
export type WorkflowSet = { en: Workflow; es: Workflow };
