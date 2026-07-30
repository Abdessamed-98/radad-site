"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";
import type { DictKey } from "@/lib/dictionary";
import { getT, type Locale } from "@/lib/i18n";

/* Stats reveal, two independent layers so nothing can strand the content:
 *
 *   - The CARDS layer is the plain settled markup. Its text is never
 *     transformed and never rewritten by JS — whatever happens to the
 *     animation, the final section is just ordinary cards.
 *   - The BIG layer is an absolutely-positioned overlay mirroring the same
 *     grid, one giant counter centered over each (hidden) card. It counts
 *     up, then FLIES into the card value's measured position (FLIP), and is
 *     display:none'd once the real value takes over in place.
 *
 * Timeline (class-driven): .pre → count → .fly → .done
 * SSR ships settled cards only; no-JS / reduced-motion never leave that. */

const STATS: [DictKey, DictKey][] = [
  ["st1v", "st1l"],
  ["st2v", "st2l"],
  ["st3v", "st3l"],
  ["st4v", "st4l"],
];

/** "1.8" -> 1.8 + ""; "24%" -> 24 + "%"; "24/7" -> 24 + "/7" */
function parseStat(v: string): { n: number; dec: number; suffix: string } {
  const m = /^([\d.]+)(.*)$/.exec(v);
  if (!m) return { n: 0, dec: 0, suffix: v };
  return {
    n: parseFloat(m[1]),
    dec: m[1].includes(".") ? 1 : 0,
    suffix: m[2] ?? "",
  };
}

const COUNT_MS = 1300;
const SETTLE_MS = 700;

export function StatsZoom({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-count]"));
    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    el.classList.add("pre");
    spans.forEach((s) => {
      s.textContent = (0).toFixed(+(s.dataset.dec || 0));
    });

    let played = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || played) return;
        played = true;
        io.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const q = Math.min(1, (now - t0) / COUNT_MS);
          const eased = 1 - Math.pow(1 - q, 3);
          spans.forEach((s) => {
            const n = parseFloat(s.dataset.count || "0");
            const dec = +(s.dataset.dec || 0);
            s.textContent = (n * eased).toFixed(dec);
          });
          if (q < 1) {
            requestAnimationFrame(tick);
            return;
          }
          /* FLIP: fly each big number from where it stands into its card
             value's exact spot, shrinking on the way. The card's own value
             stays hidden until touchdown, then takes over in place. */
          const bigs = Array.from(
            el.querySelectorAll<HTMLElement>(".statz-big .statz-n")
          );
          const targets = Array.from(
            el.querySelectorAll<HTMLElement>(".statz-cards .st-vt")
          );
          bigs.forEach((b, i) => {
            const to = targets[i];
            if (!to) return;
            const a = b.getBoundingClientRect();
            const z = to.getBoundingClientRect();
            const dx = z.left + z.width / 2 - (a.left + a.width / 2);
            const dy = z.top + z.height / 2 - (a.top + a.height / 2);
            /* Scale by FONT-SIZE ratio, not rect-height ratio: the target's
               line box carries line-height leading the overlay doesn't have,
               so height-based scaling lands the glyphs oversized and the
               handover pops. Same font both sides + half-leading centring
               means font ratio + centre alignment is glyph-exact. */
            const k =
              parseFloat(getComputedStyle(to).fontSize) /
              parseFloat(getComputedStyle(b).fontSize);
            b.style.transition = `transform ${SETTLE_MS}ms cubic-bezier(.2,.7,.2,1)`;
            b.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${k.toFixed(4)})`;
          });
          el.classList.remove("pre");
          el.classList.add("fly");
          settleTimer = setTimeout(() => {
            el.classList.remove("fly");
            el.classList.add("done");
          }, SETTLE_MS + 40);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div className="statz" ref={ref}>
      {/* settled cards — plain markup, untouched by the animation */}
      <div className="grid4 statz-cards">
        {STATS.map(([vk, lk]) => (
          <div className="surface st" key={vk}>
            <span className="ico ico-sm ico-tint st-ic">
              <Icon name="arrow" width={2.4} />
            </span>
            {/* .st-v stretches to the card's full width (flex item), so its
                rect centre is the card centre — NOT where the text sits.
                The inner span is inline, i.e. a tight text box: that is the
                honest flight target. */}
            <span className="st-v grad-txt num">
              <span className="st-vt">{t(vk)}</span>
            </span>
            <span className="st-l">{t(lk)}</span>
          </div>
        ))}
      </div>

      {/* overlay counters, one centered over each card */}
      <div className="statz-big grid4" aria-hidden="true">
        {STATS.map(([vk]) => {
          const { n, dec, suffix } = parseStat(t(vk));
          return (
            <span className="statz-cell" key={vk}>
              <span className="statz-n grad-txt num">
                <span data-count={n} data-dec={dec}>
                  {n.toFixed(dec)}
                </span>
                {suffix}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
