/* Concentric rings of dialect flags orbiting the mark.
   Each ring spins with SMIL; every pod counter-spins at the same rate so the
   flags stay upright. Angles are degrees from the ring's 3 o'clock. */

export type OrbFlag = { k: keyof typeof FLAG; a: number };
export type OrbRing = { r: number; dur: number; dir: 1 | -1; f: readonly OrbFlag[] };

export const ORB: readonly OrbRing[] = [
 {r:112,dur:58,dir: 1,f:[{k:"sa",a:-72},{k:"eg",a:150}]},
 {r:188,dur:76,dir:-1,f:[{k:"ae",a:22},{k:"jo",a:146},{k:"kw",a:266}]},
 {r:264,dur:96,dir: 1,f:[{k:"qa",a:-38},{k:"gb",a:98},{k:"bh",a:202}]}
];

/* Simplified flags drawn at 60x40 and circle-clipped into each pod. */
export const FLAG = {
 sa:'<rect width="60" height="40" fill="#006C35"/>'+
    '<path d="M20 26.5 40 15.5M20 15.5l20 11" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'+
    '<path d="M30 21V11.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>'+
    '<path d="M30 12c-2.6-3.4-6.2-4.4-8.4-3.6M30 12c2.6-3.4 6.2-4.4 8.4-3.6M30 12c-1.4-4-0.6-7 1.2-8.4M30 12c1.4-4 0.6-7-1.2-8.4" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
 eg:'<rect width="60" height="13.34" fill="#CE1126"/><rect y="13.34" width="60" height="13.33" fill="#fff"/>'+
    '<rect y="26.67" width="60" height="13.33" fill="#000"/>'+
    '<path d="M30 16.6c2.7 0 4.4 1.7 4.4 3.9 0 2.4-2 3.6-4.4 3.6s-4.4-1.2-4.4-3.6c0-2.2 1.7-3.9 4.4-3.9Z" fill="#C09300"/>',
 ae:'<rect width="60" height="13.34" fill="#00732F"/><rect y="13.34" width="60" height="13.33" fill="#fff"/>'+
    '<rect y="26.67" width="60" height="13.33" fill="#000"/><rect width="16" height="40" fill="#CE1126"/>',
 kw:'<rect width="60" height="13.34" fill="#007A3D"/><rect y="13.34" width="60" height="13.33" fill="#fff"/>'+
    '<rect y="26.67" width="60" height="13.33" fill="#CE1126"/>'+
    '<path d="M0 0h20l-8 13.34v13.33L20 40H0z" fill="#000"/>',
 jo:'<rect width="60" height="13.34" fill="#000"/><rect y="13.34" width="60" height="13.33" fill="#fff"/>'+
    '<rect y="26.67" width="60" height="13.33" fill="#007A3D"/>'+
    '<path d="M0 0l26 20L0 40z" fill="#CE1126"/>'+
    '<path d="M9 15.6l1.15 2.5 2.72.3-2.03 1.83.57 2.68L9 21.44l-2.41 1.47.57-2.68-2.03-1.83 2.72-.3z" fill="#fff"/>',
 qa:'<rect width="60" height="40" fill="#8A1538"/>'+
    '<path d="M0 0h13l7 2.22-7 2.23 7 2.22-7 2.22 7 2.23-7 2.22 7 2.22-7 2.23 7 2.22-7 2.22 7 2.23-7 2.22 7 2.22-7 2.23 7 2.22-7 2.22 7 2.23-7 2.22H0z" fill="#fff"/>',
 bh:'<rect width="60" height="40" fill="#CE1126"/>'+
    '<path d="M0 0h13l7 4-7 4 7 4-7 4 7 4-7 4 7 4-7 4 7 4-7 4H0z" fill="#fff"/>',
 gb:'<rect width="60" height="40" fill="#012169"/>'+
    '<path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/>'+
    '<path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="4"/>'+
    '<path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/>'+
    '<path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/>'
} as const;

/** Pod tooltips — hover names the flag, so no pod is a mystery. */
export const ORB_NAMES: Record<keyof typeof FLAG, readonly [string, string]> = {
  sa: ["السعودية", "Saudi Arabia"],
  eg: ["مصر", "Egypt"],
  ae: ["الإمارات", "UAE"],
  kw: ["الكويت", "Kuwait"],
  jo: ["الأردن", "Jordan"],
  qa: ["قطر", "Qatar"],
  bh: ["البحرين", "Bahrain"],
  gb: ["English", "English"],
};
