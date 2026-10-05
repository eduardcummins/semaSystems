import type { WorkflowSet } from "./types";

// PLACEHOLDER: replace with a real, confirmed workflow.
export const accountancy: WorkflowSet = {
  en: {
    slug: "accountancy",
    placeholder: true,
    sector: "Accountancy",
    title: "Chasing and sorting client documents",
    summary: "An agent collects, names and files the documents clients send at month end.",
    problem: "Every close, someone chases clients for receipts and statements, then renames and files them by hand.",
    steps: [
      "The agent sends a polite reminder listing what is still missing.",
      "It reads incoming files and identifies what each one is.",
      "It files and names them consistently per client and period.",
      "It tells you what is complete and what is still outstanding.",
    ],
    returns: ["A tidy folder per client and period", "A status list of complete and missing items", "Drafted reminders ready to send"],
    saved: "Placeholder estimate: several hours per month-end",
    before: "Email clients, wait, rename files, file them, check nothing is missing.",
    after: "Review the status list and approve the reminders.",
  },
  es: {
    slug: "accountancy",
    placeholder: true,
    sector: "Contabilidad",
    title: "Reclamar y ordenar documentos de clientes",
    summary: "Un agente recoge, nombra y archiva los documentos que los clientes envían a fin de mes.",
    problem: "En cada cierre alguien reclama facturas y extractos a los clientes y luego los renombra y archiva a mano.",
    steps: [
      "El agente envía un recordatorio amable con lo que aún falta.",
      "Lee los archivos recibidos e identifica qué es cada uno.",
      "Los archiva y nombra de forma coherente por cliente y periodo.",
      "Te dice qué está completo y qué sigue pendiente.",
    ],
    returns: ["Una carpeta ordenada por cliente y periodo", "Una lista de estado con lo completo y lo pendiente", "Recordatorios redactados y listos para enviar"],
    saved: "Estimación de ejemplo: varias horas por cierre mensual",
    before: "Escribir a los clientes, esperar, renombrar archivos, archivarlos y comprobar que no falta nada.",
    after: "Revisar la lista de estado y aprobar los recordatorios.",
  },
};
