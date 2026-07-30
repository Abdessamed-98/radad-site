/* Data + geometry for the hero message band.
   Chips ride CSS motion paths from the outer edge in to the logo and back
   out again; the logo sits at offset-distance 50% on every rail. */
import type { IconName } from "./icons";

export type Lane = {
  q: readonly [string, string];   // customer question
  a: readonly [string, string];   // Radad's reply
  syn: number; eyn: number; side: number; d: number;
  ch: IconName; cc: string; far?: number;
  /** Seconds shown on a voice-note question. When set, the inbound chip
      renders as a voice message (play + waveform + duration) instead of
      text; q still documents what the customer said. */
  voice?: number;
  /** Seconds for a voice-note reply — the outbound brand chip gets the
      same treatment. a still documents what Radad answered. */
  va?: number;
};

export const FLOW: readonly Lane[] = [
 /* Eight lanes are defined; MessageFlow rides the first six on one 24s
    cycle, so the logo is struck every 4s. Each message enters from the
    outer edge, recedes into the hub, and leaves as a reply. */
 {q:["وين طلبي؟","Where's my order?"],
  a:["طلبك 4821 يوصل بكرة","Order 4821 arrives tomorrow"],
  syn:-112, eyn:-76, side:-1, d:0,      ch:"wa", cc:"#25D366"},
 {q:["عندكم مقاس L؟","Size L available?"],
  a:["متوفر بالزيتي 🌿","In stock, olive 🌿"],
  syn: 108, eyn: 72, side: 1, d:-3,   ch:"msgr", cc:"#0084FF"},
 {q:["كم الشحن للدمام؟","Shipping to Dammam?"],
  a:["مجاني فوق 200 ر.س","Free over SAR 200"],
  syn: -84, eyn: 44, side:-1, d:-6,     ch:"tg", cc:"#229ED9"},
 {q:["أبغى أرجع القطعة","I want to return this"],
  a:["فتحت لك طلب إرجاع","Return request opened"],
  syn:  80, eyn:-40, side: 1, d:-9,   ch:"wa", cc:"#25D366", voice:7, va:5},
 {q:["متى يفتح المتجر؟","When do you open?"],
  a:["نستقبل طلباتك 24 ساعة","We take orders 24/7"],
  syn: -56, eyn: 96, side: 1, d:-12,     ch:"msgr", cc:"#0084FF", far:1},
 {q:["فيه خصم على الطلبية؟","Any discount?"],
  a:["استخدم كود WELCOME10","Use code WELCOME10"],
  syn: -30, eyn:110, side:-1, d:-15,     ch:"wa", cc:"#25D366", far:1},
 {q:["الطلب وصل ناقص قطعة","An item is missing"],
  a:["أرسلت لك البديل اليوم","Replacement sent today"],
  syn:-100, eyn: 18, side: 1, d:-18,    ch:"tg", cc:"#229ED9", voice:12, va:8},
 {q:["كم يستغرق التوصيل؟","How long is delivery?"],
  a:["من 2 إلى 4 أيام عمل","2 to 4 working days"],
  syn: -68, eyn: 62, side:-1, d:-21,    ch:"msgr", cc:"#0084FF"}
];

/** Seconds for one full pass at the 1440px reference width; the logo is
    struck every CYCLE/lanes. MessageFlow scales this with viewport width
    (writing --fsDur inline) so the on-screen chip speed stays constant —
    the 21.6s in styles/message-flow.css is only the no-JS fallback. */
export const FS_CYCLE = 21.6;
/** How far below the logo each rail lands, as a fraction of band height.
    No entry may be 0 — a straight rail has a 0deg tangent and cannot bank. */
export const FS_LANES = [.14,.27,.40,.53,.66];
/** Logo height within the band. */
export const FS_TOP = .19;

export type Beam = { p: number; dur: number; d: number; c: string };
export const FS_BEAMS: readonly Beam[] = [
 {p:0,dur:4.6,d:0,     c:'#7CC9FF'},
 {p:3,dur:6.4,d:-2.1,  c:'#FFFFFF'},
 {p:4,dur:5.2,d:-3.4,  c:'#9AD8FF'}
];

/** One cubic per rail. The first control point is lifted toward the apex so
    the tangent at the outer end is genuinely sloped and a chip enters banked;
    the second sits level with the apex so it straightens as it arrives. A
    symmetric flat-ended curve reads level at BOTH ends, which is why banking
    never showed in earlier revisions. */
export function fsPaths(W: number, H: number): string[] {
  const cy = H * FS_TOP;
  return FS_LANES.map((f) => {
    const off = f * H;
    const y0 = (cy + off).toFixed(1);
    const c = cy.toFixed(1);
    const lift = (cy + off * 0.28).toFixed(1); // lower lift = steeper tangent
    return (
      "M 0 " + y0 +
      " C " + (W * 0.2).toFixed(1) + " " + lift +
      ", " + (W * 0.4).toFixed(1) + " " + c +
      ", " + (W * 0.5).toFixed(1) + " " + c +
      " C " + (W * 0.6).toFixed(1) + " " + c +
      ", " + (W * 0.8).toFixed(1) + " " + lift +
      ", " + W + " " + y0
    );
  });
}
