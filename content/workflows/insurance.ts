import type { WorkflowSet } from "./types";

// PLACEHOLDER: replace with a real, confirmed workflow.
export const insurance: WorkflowSet = {
  en: {
    slug: "insurance",
    placeholder: true,
    sector: "Insurance",
    title: "Contract review and data extraction",
    summary: "An agent reads incoming contracts and pulls the key terms into your system.",
    problem: "Staff re-key terms, dates and clauses from long contracts by hand, which is slow and easy to get wrong.",
    steps: [
      "The agent picks up each new contract from your inbox or shared folder.",
      "It extracts parties, dates, limits, exclusions and renewal terms.",
      "It flags anything unusual or missing for a person to look at.",
      "It writes the structured result to your spreadsheet or system.",
    ],
    returns: ["A completed summary for every contract", "A short list of items needing a decision", "A record of where each value came from"],
    saved: "Placeholder estimate: around 20 minutes per contract",
    before: "Open the PDF, read it end to end, type the key terms into the system.",
    after: "Open the summary, check the flagged items, approve.",
  },
  es: {
    slug: "insurance",
    placeholder: true,
    sector: "Seguros",
    title: "Revisión de contratos y extracción de datos",
    summary: "Un agente lee los contratos que llegan y pasa las condiciones clave a tu sistema.",
    problem: "El equipo copia a mano condiciones, fechas y cláusulas de contratos largos. Es lento y fácil equivocarse.",
    steps: [
      "El agente recoge cada contrato nuevo de tu correo o carpeta compartida.",
      "Extrae partes, fechas, límites, exclusiones y condiciones de renovación.",
      "Señala lo inusual o lo que falta para que una persona lo revise.",
      "Guarda el resultado estructurado en tu hoja de cálculo o sistema.",
    ],
    returns: ["Un resumen completo de cada contrato", "Una lista corta de puntos que requieren decisión", "Un registro de dónde sale cada dato"],
    saved: "Estimación de ejemplo: unos 20 minutos por contrato",
    before: "Abrir el PDF, leerlo entero y teclear las condiciones clave en el sistema.",
    after: "Abrir el resumen, revisar lo señalado y aprobar.",
  },
};
