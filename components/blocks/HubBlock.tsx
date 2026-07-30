"use client";

import { useEffect, useRef, useState } from "react";
import { BIC, HUBD, HUBN, hubPath } from "@/lib/hub";
import { LOGO } from "@/lib/logo";
import { getT, type Locale } from "@/lib/i18n";

/** Wide lays the six sources left/right of the hub; narrow stacks them. */
function geometry(wide: boolean) {
  const W = wide ? 1000 : 560;
  const H = wide ? 560 : 900;
  const R = wide ? 64 : 58;
  const nr = wide ? 44 : 40;
  const lx = wide ? 168 : 92;
  /* The middle row sits level with the hub, so its rails are pure straights
     — push those two nodes further out and let the longer run breathe.
     Narrow mode has no width to spare, so the offset only exists wide. */
  const mx = wide ? 88 : 0;
  return {
    W,
    H,
    R,
    nr,
    cx: W / 2,
    cy: H / 2,
    lx,
    rx: W - lx,
    mx,
    ys: wide ? [118, 280, 442] : [150, 450, 750],
    iconS: Math.round(nr * 1.18),
    chipW: wide ? 168 : 158,
  };
}

export function HubBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [wide, setWide] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  /* Reveal-on-scroll: hub-on starts the choreography (core pops, rails
     draw, nodes land, flows wake) once a third of the diagram is really
     on screen. Timer is the never-scrolled safety net. */
  useEffect(() => {
    const el = wrapRef.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    const bail = setTimeout(() => setOn(true), 6000);
    return () => {
      io.disconnect();
      clearTimeout(bail);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width:780px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* The rails animate stroke-dashoffset, which the compositor cannot handle —
     every frame re-rasterises this whole SVG. Pause it off-screen so it only
     costs anything while it is actually being looked at. */
  useEffect(() => {
    const el = svgRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        el.classList.toggle("anim-off", !e.isIntersecting);
        try {
          if (e.isIntersecting) el.unpauseAnimations();
          else el.pauseAnimations();
        } catch {
          /* pauseAnimations is unavailable in some engines */
        }
      },
      { rootMargin: "160px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const g = geometry(wide);
  const chipY = g.cy + g.R + 30;

  const rails = HUBN.map((n, idx) => {
    const x = (n.side < 0 ? g.lx : g.rx) + (n.row === 1 ? n.side * g.mx : 0);
    const y = g.ys[n.row];
    const dxs = g.cx - x;
    const dys = g.cy - y;
    const horiz = Math.abs(dxs) >= Math.abs(dys);
    const sx = horiz ? x + Math.sign(dxs) * g.nr : x;
    const sy = horiz ? y : y + Math.sign(dys) * g.nr;
    return {
      n,
      idx,
      x,
      y,
      d: hubPath(sx, sy, g.cx, g.cy, g.R),
      style: {
        "--c": n.c,
        "--d": `${HUBD[idx]}s`,
        "--rd": `${(idx * 0.07).toFixed(2)}s`, // reveal stagger
      } as React.CSSProperties,
    };
  });

  return (
    <div className={`hubwrap rv${on ? " hub-on" : ""}`} ref={wrapRef}>
      <svg
        className="hub-svg"
        ref={svgRef}
        viewBox={`0 0 ${g.W} ${g.H}`}
        role="img"
        aria-label={t("hub_h")}
      >
        <defs>
          <radialGradient id="hubGlow">
            <stop offset="0%" stopColor="#2E93FF" stopOpacity=".55" />
            <stop offset="100%" stopColor="#2E93FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hubMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E93FF" />
            <stop offset="100%" stopColor="#0077EE" />
          </linearGradient>
        </defs>

        {rails.map((r) => (
          <path
            className="hub-rail"
            d={r.d}
            pathLength={100}
            style={r.style}
            key={`rail-${r.idx}`}
          />
        ))}

        {rails.map((r) => (
          <g key={`flow-${r.idx}`}>
            <path
              className="hub-flow hub-in"
              d={r.d}
              pathLength={100}
              style={r.style}
            />
            <path
              className="hub-flow hub-out"
              d={r.d}
              pathLength={100}
              style={r.style}
            />
          </g>
        ))}

        {rails.map((r) => (
          <g className="hub-node" style={r.style} key={`node-${r.idx}`}>
            <circle className="halo" cx={r.x} cy={r.y} r={g.iconS * 0.62} />
            <svg
              className="glyph"
              x={r.x - g.iconS / 2}
              y={r.y - g.iconS / 2}
              width={g.iconS}
              height={g.iconS}
              viewBox="0 0 24 24"
              fill="none"
              dangerouslySetInnerHTML={{ __html: BIC[r.n.i] }}
            />
            <text className="lab" x={r.x} y={r.y + g.iconS / 2 + 27}>
              {t(r.n.k)}
            </text>
          </g>
        ))}

        <g className="hub-core">
          <circle className="hub-glow" cx={g.cx} cy={g.cy} r={g.R * 2.6} />
          <circle className="hub-ring" cx={g.cx} cy={g.cy} r={g.R} />
          <circle className="hub-ring r2" cx={g.cx} cy={g.cy} r={g.R} />
          <circle className="hub-ring r3" cx={g.cx} cy={g.cy} r={g.R} />
          <circle className="disc" cx={g.cx} cy={g.cy} r={g.R * 1.1} />
          <svg
            x={g.cx - g.R}
            y={g.cy - g.R}
            width={g.R * 2}
            height={(g.R * 2 * 40) / 36}
            viewBox="0 0 36 40"
            fill="none"
            dangerouslySetInnerHTML={{ __html: LOGO.sym }}
          />
          <rect
            className="hub-chip"
            x={g.cx - g.chipW / 2}
            y={chipY}
            width={g.chipW}
            height={34}
            rx={17}
          />
          <text className="hub-chip-t" x={g.cx} y={chipY + 22}>
            {t("hub_lat")}
          </text>
        </g>
      </svg>
    </div>
  );
}
