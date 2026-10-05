import type { WorkflowSet } from "./types";

// PLACEHOLDER: replace with a real, confirmed workflow.
export const communications: WorkflowSet = {
  en: {
    slug: "communications",
    placeholder: true,
    sector: "Communications",
    title: "Media monitoring and daily briefing",
    summary: "An agent watches the news for your clients and sends a short briefing each morning.",
    problem: "Teams spend the start of every day scanning sources and pasting links into a summary email.",
    steps: [
      "The agent checks your chosen sources and keywords overnight.",
      "It groups relevant coverage and drops duplicates.",
      "It drafts a short briefing with the key points and links.",
      "A person reviews it before it goes out.",
    ],
    returns: ["A ready-to-send morning briefing", "Coverage grouped by client or topic", "A searchable archive of past briefings"],
    saved: "Placeholder estimate: around an hour each morning",
    before: "Scan a dozen sources, copy links, write the summary.",
    after: "Read the draft briefing, adjust, send.",
  },
  es: {
    slug: "communications",
    placeholder: true,
    sector: "Comunicación",
    title: "Seguimiento de medios y resumen diario",
    summary: "Un agente vigila la prensa de tus clientes y envía un breve resumen cada mañana.",
    problem: "El equipo dedica el inicio de cada día a revisar fuentes y pegar enlaces en un correo resumen.",
    steps: [
      "El agente revisa durante la noche las fuentes y palabras clave que elijas.",
      "Agrupa la cobertura relevante y elimina duplicados.",
      "Redacta un resumen breve con los puntos clave y los enlaces.",
      "Una persona lo revisa antes de enviarlo.",
    ],
    returns: ["Un resumen matinal listo para enviar", "Cobertura agrupada por cliente o tema", "Un archivo consultable de resúmenes anteriores"],
    saved: "Estimación de ejemplo: alrededor de una hora cada mañana",
    before: "Revisar una docena de fuentes, copiar enlaces y escribir el resumen.",
    after: "Leer el borrador, ajustarlo y enviarlo.",
  },
};
