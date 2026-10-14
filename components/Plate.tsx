// An isometric plate with a thin grid, visible edge thickness and a serif numeral lying on its surface.
// Top face corners: top (160,10), right (310,75), bottom (160,140), left (10,75).
const at = (u: number, v: number) => [160 + 150 * u - 150 * v, 10 + 65 * u + 65 * v] as const;
const GRID = [1, 2, 3, 4, 5, 6, 7].map((k) => k / 8);
const T = 9; // edge thickness

export function Plate({ n }: { n: number }) {
  return (
    <svg className="plate" viewBox="0 0 320 160" aria-hidden="true">
      <path className="plate-side" d={`M10 75 L160 140 L160 ${140 + T} L10 ${75 + T}Z`} />
      <path className="plate-side plate-side-r" d={`M160 140 L310 75 L310 ${75 + T} L160 ${140 + T}Z`} />
      <path className="plate-top" d="M160 10 L310 75 L160 140 L10 75Z" />
      <g className="plate-grid">
        {GRID.map((k) => (
          <path key={k} d={`M${at(k, 0)} L${at(k, 1)} M${at(0, k)} L${at(1, k)}`} />
        ))}
      </g>
      <text className="plate-num" x="0" y="0" transform="translate(160 75) scale(1.25 .62)" textAnchor="middle" dominantBaseline="central">
        {n}
      </text>
    </svg>
  );
}
