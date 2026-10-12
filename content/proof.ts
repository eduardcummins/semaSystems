// Social proof shown directly under the hero. Leave `clients` empty and the whole strip is hidden,
// so nothing placeholder ever ships. Only add real clients that have agreed to be named.
//
// TODO (owner): add 3-5 entries, e.g.
//   { name: "Client name", logo: "/proof/client.svg" }     // logo optional; files go in public/proof/
// and one outcome quote per language, e.g.
//   outcome: { en: "...", es: "..." }
export type ProofClient = { name: string; logo?: string };

export const proof: { clients: ProofClient[]; outcome?: { en: string; es: string }; attribution?: string } = {
  clients: [],
};
