"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow, Icon } from "@/components/Icon";
import { ACTIVITIES } from "@/lib/content";
import { getP, getT, type Locale } from "@/lib/i18n";
import { LINKS } from "@/lib/links";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* ---------- activities carousel ----------
   Tall photo cards on a scroll-snap rail that bleeds off the end edge, with
   prev/next arrows in the heading row. Native scrolling does the work, so
   touch, trackpad and keyboard all behave; the arrows only nudge it.
   In RTL, scrollLeft runs 0 → negative, so "forward" is a negative delta. */
export function ActivitiesBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const pos = Math.abs(el.scrollLeft);
    setEdge({
      start: pos < 4,
      end: pos >= el.scrollWidth - el.clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  function nudge(dir: 1 | -1) {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".act-card");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * step * (rtl ? -1 : 1), behavior: "smooth" });
  }

  return (
    <div className="act">
      <div className="wrap act-head rv">
        <div className="stack g3">
          <span className="badge badge-brand">
            <i />
            {t("act_badge")}
          </span>
          <h2 className="t-h1">{t("act_h")}</h2>
          <p className="t-lead">{t("act_sub")}</p>
        </div>
        <div className="act-nav">
          <button
            type="button"
            className="act-btn prev"
            aria-label={t("act_prev")}
            disabled={edge.start}
            onClick={() => nudge(-1)}
          >
            <Arrow />
          </button>
          <button
            type="button"
            className="act-btn"
            aria-label={t("act_next")}
            disabled={edge.end}
            onClick={() => nudge(1)}
          >
            <Arrow />
          </button>
        </div>
      </div>

      <div className="act-rail rv d1" ref={rail} onScroll={measure}>
        {ACTIVITIES.map((a) => (
          <article className={`act-card act-${a.id}`} key={a.id}>
            {/* Placeholder art; the photo fades in over it only once it has
                actually loaded, so a missing file never shows a broken glyph. */}
            <span className="act-ph" aria-hidden="true">
              <Icon name={a.i} width={1.2} />
            </span>
            <img
              className="act-img"
              src={`${BASE}/activities/${a.photo}`}
              alt=""
              loading="lazy"
              decoding="async"
              ref={(img) => {
                // may have finished (or failed) before hydration
                if (img?.complete && img.naturalWidth) img.classList.add("on");
              }}
              onLoad={(e) => e.currentTarget.classList.add("on")}
            />
            <div className="act-body">
              <h3 className="act-n">{p(a.n)}</h3>
              <p className="act-d">{p(a.d)}</p>
              <a className="act-go" href={LINKS.register}>
                {t("act_go")}
                <Arrow />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
