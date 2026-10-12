// Pricing and timeframes. Leave a value as null until it is confirmed: the site then shows neutral
// wording instead of a number, so no TODO text ever ships.
//
// TODO (owner): fill these in.
export const engagement: {
  pilotPrice: string | null; // e.g. "£2,500"
  retainer: string | null; // e.g. "£400"
  timeframes: [string | null, string | null, string | null, string | null]; // free call, map, pilot, handover
} = {
  pilotPrice: null,
  retainer: null,
  timeframes: [null, null, null, null],
};
