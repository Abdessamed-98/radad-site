import type { DictKey } from "./dictionary";

export type HubNode = {
  k: DictKey;
  i: keyof typeof BIC;
  c: string;
  side: -1 | 1;
  row: 0 | 1 | 2;
};

export const HUBN: readonly HubNode[] = [
  { k: "n_salla", i: "salla", c: "#00B39F", side: -1, row: 0 },
  { k: "n_zid", i: "zid", c: "#4E7BF0", side: -1, row: 1 },
  { k: "n_web", i: "web", c: "#00B4D8", side: -1, row: 2 },
  { k: "n_wa", i: "wa", c: "#25D366", side: 1, row: 0 },
  { k: "n_tg", i: "tg", c: "#229ED9", side: 1, row: 1 },
  { k: "n_mail", i: "mail", c: "#EA6A47", side: 1, row: 2 },
];

/** Phase offset per rail, so the six flows never pulse in unison. */
export const HUBD = [0, 0.62, 1.24, 0.31, 0.93, 1.55];

/**
 * Orthogonal rail from a node to the hub: run straight, then a single 45°
 * elbow onto the circle. Purely horizontal or vertical approaches skip the
 * elbow entirely.
 */
export function hubPath(
  sx: number,
  sy: number,
  cx: number,
  cy: number,
  R: number
): string {
  const k = R * 0.7071;
  const dx = cx - sx;
  const dy = cy - sy;

  if (Math.abs(dy) < 4) return `M ${sx} ${sy} H ${cx - Math.sign(dx) * R}`;
  if (Math.abs(dx) < 4) return `M ${sx} ${sy} V ${cy - Math.sign(dy) * R}`;

  const ex = cx - Math.sign(dx) * k;
  const ey = cy - Math.sign(dy) * k;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const run = Math.abs(ey - sy);
    return `M ${sx} ${sy} H ${ex - Math.sign(dx) * run} L ${ex} ${ey}`;
  }
  const runV = Math.abs(ex - sx);
  return `M ${sx} ${sy} V ${ey - Math.sign(dy) * runV} L ${ex} ${ey}`;
}

/* Brand glyphs, drawn white so they read on the coloured node discs.
   These are the platforms' own marks; Salla and Zid remain stand-ins until
   official SVGs are supplied. */
export const BIC = {
  wa: '<path fill="#fff" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.46 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.09.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.4Z"/>',
  tg: '<path fill="#fff" d="M11.94 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.06Zm4.97 7.22c.1 0 .32.02.46.14a.5.5 0 0 1 .17.33c.02.09.04.3.02.47-.18 1.9-.96 6.5-1.36 8.63-.17.9-.5 1.2-.82 1.23-.7.06-1.23-.46-1.9-.9-1.06-.7-1.65-1.13-2.68-1.8-1.18-.78-.42-1.21.26-1.91.18-.19 3.25-2.98 3.31-3.23.01-.03.01-.15-.06-.21-.07-.06-.17-.04-.25-.02-.1.02-1.79 1.14-5.06 3.34-.48.33-.91.49-1.3.48-.43 0-1.25-.24-1.87-.44-.75-.24-1.35-.37-1.3-.79.03-.21.33-.43.9-.66 3.5-1.52 5.83-2.53 7-3.01 3.33-1.39 4.02-1.63 4.48-1.64Z"/>',
  mail: '<path fill="#fff" d="M3.2 6.6A2.4 2.4 0 0 1 5.6 4.2h12.8a2.4 2.4 0 0 1 2.4 2.4v10.8a2.4 2.4 0 0 1-2.4 2.4H5.6a2.4 2.4 0 0 1-2.4-2.4V6.6Z"/><path d="m4.6 7.3 7.4 5.3 7.4-5.3" stroke="#0A5FB4" stroke-width="1.9" fill="none" stroke-linecap="round"/>',
  salla:
    '<path fill="#fff" d="M4.3 7.9h15.4a1.25 1.25 0 0 1 1.25 1.38l-1.06 11.06A2.45 2.45 0 0 1 17.45 22.5H6.55a2.45 2.45 0 0 1-2.44-2.16L3.05 9.28A1.25 1.25 0 0 1 4.3 7.9Z"/><path d="M8.35 8.5V6.05a3.65 3.65 0 0 1 7.3 0V8.5" stroke="#fff" stroke-width="2.1" fill="none" stroke-linecap="round"/>',
  zid: '<path fill="#fff" d="M3.6 9.5h16.8v10.3a2.1 2.1 0 0 1-2.1 2.1h-3.4v-5.6H9.1v5.6H5.7a2.1 2.1 0 0 1-2.1-2.1V9.5Z"/><path fill="#fff" d="M4.95 2.2h14.1l1.9 4.45a1.05 1.05 0 0 1-.97 1.46H4.02a1.05 1.05 0 0 1-.97-1.46L4.95 2.2Z"/>',
  web: '<path fill="#fff" d="M12 2.6C6.55 2.6 2.1 6.25 2.1 10.8c0 2.55 1.4 4.83 3.58 6.34v4.5l3.5-1.95c.93.23 1.9.36 2.92.36 5.45 0 9.9-3.65 9.9-8.2S17.45 2.6 12 2.6Z"/>',
} as const;
