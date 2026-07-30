"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/Icon";
import { FLAG, ORB, ORB_NAMES } from "@/lib/orb";
import { LOGO } from "@/lib/logo";
import { getP, getT, href, type Locale } from "@/lib/i18n";

const S = 620;
const C = S / 2;
const POD_R = 27;

const CHIPS: Record<Locale, string[]> = {
  ar: ["خليجي", "مصري", "شامي", "فصحى", "English"],
  en: ["Gulf", "Egyptian", "Levantine", "MSA", "English"],
};

export function OrbBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);
  const [still, setStill] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* SMIL ignores animation-play-state entirely, so an off-screen pause has to
     go through pauseAnimations() on the <svg> element itself. */
  useEffect(() => {
    const el = svgRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        try {
          if (e.isIntersecting) el.unpauseAnimations();
          else el.pauseAnimations();
        } catch {
          /* not supported here */
        }
      },
      { rootMargin: "160px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const markW = 112;
  const markH = (markW * 40) / 36;

  return (
    <div className="orb-two">
      <div className="orb-copy stack g4 rv">
        <span className="badge badge-brand" style={{ alignSelf: "flex-start" }}>
          <i />
          {t("orb_badge")}
        </span>
        <h2 className="t-h1">{t("orb_h")}</h2>
        <p className="t-lead">{t("orb_sub")}</p>
        <div className="orb-chips">
          {CHIPS[locale].map((x, i) => (
            <span className={`chip${i === 0 ? " chip-key" : ""}`} key={x}>
              {x}
            </span>
          ))}
        </div>
        <div className="cta-row" style={{ justifyContent: "flex-start" }}>
          <Link className="btn btn-p" href={href(locale, "features")}>
            {t("cta_watch_dialect")}
            <Arrow />
          </Link>
        </div>
      </div>

      <div className="orbwrap rv d1">
        <svg
          className="orb-svg"
          ref={svgRef}
          viewBox={`0 0 ${S} ${S}`}
          role="img"
          aria-label={t("orb_h")}
        >
          <defs>
            <clipPath id="podClip">
              <circle cx="0" cy="0" r={POD_R} />
            </clipPath>
            <radialGradient id="orbGlow">
              <stop offset="0%" stopColor="#0077EE" stopOpacity=".20" />
              <stop offset="100%" stopColor="#0077EE" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle className="orb-glow" cx={C} cy={C} r={152} />

          {ORB.map((ring, i) => (
            <circle
              className="orb-ring"
              cx={C}
              cy={C}
              r={ring.r}
              key={`ring-${i}`}
              style={{ "--od": i } as React.CSSProperties}
            />
          ))}

          {/* one-shot sonar pulse that "assembles" the orbits on reveal */}
          <circle className="orb-wave" cx={C} cy={C} r={60} />

          {ORB.map((ring, i) => (
            <g key={`pods-${i}`}>
              {!still && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${C} ${C}`}
                  to={`${360 * ring.dir} ${C} ${C}`}
                  dur={`${ring.dur}s`}
                  repeatCount="indefinite"
                />
              )}
              {ring.f.map((f) => {
                const rad = (f.a * Math.PI) / 180;
                const x = (C + ring.r * Math.cos(rad)).toFixed(1);
                const y = (C + ring.r * Math.sin(rad)).toFixed(1);
                return (
                  <g transform={`translate(${x},${y})`} key={f.k}>
                    <g className="orb-pod">
                      {/* counter-spin keeps the flag upright as the ring turns */}
                      {!still && (
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 0 0"
                          to={`${-360 * ring.dir} 0 0`}
                          dur={`${ring.dur}s`}
                          repeatCount="indefinite"
                        />
                      )}
                      {/* the pop wrapper is separate from .orb-pod because the
                          counter-spin SMIL owns that element's transform —
                          a CSS transform there would cancel it */}
                      <g
                        className="orb-pop"
                        style={{ "--od": i } as React.CSSProperties}
                      >
                        <g clipPath="url(#podClip)">
                          <svg
                            x={-POD_R}
                            y={-POD_R}
                            width={POD_R * 2}
                            height={POD_R * 2}
                            viewBox="0 0 60 40"
                            preserveAspectRatio="xMidYMid slice"
                            dangerouslySetInnerHTML={{ __html: `<title>${p(ORB_NAMES[f.k])}</title>` + FLAG[f.k] }}
                          />
                        </g>
                        <circle className="rim" r={POD_R} />
                      </g>
                    </g>
                  </g>
                );
              })}
            </g>
          ))}

          <g className="orb-core">
            <svg
              x={C - markW / 2}
              y={C - markH * 0.45}
              width={markW}
              height={markH}
              viewBox="0 0 36 40"
              fill="none"
              dangerouslySetInnerHTML={{ __html: LOGO.sym }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
