"use client";

import { useEffect, useId, useRef } from "react";
import { SYM_PARTS } from "@/lib/logo";

/** Max tilt toward the cursor, in degrees. */
const DEFAULT_TILT = 13;

/** The extruded side wall: slices of the bubble silhouette stacked into
 *  depth, shaded darker the deeper they sit so the edge reads as a lit
 *  solid rather than a repeated outline. */
const WALL_SLICES = 14;
const WALL_STEP = 0.85; // px of depth per slice

function mixHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (sh: number) =>
    Math.round(((pa >> sh) & 255) * (1 - t) + ((pb >> sh) & 255) * t);
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}

const WALL = Array.from({ length: WALL_SLICES }, (_, i) => ({
  z: -(i + 1) * WALL_STEP,
  fill: mixHex("#0063CE", "#051A3E", (i + 1) / WALL_SLICES),
}));

/**
 * The mark as a real CSS-3D object: extruded wall slices behind, then the
 * front face, then the inner pieces raised on their own Z planes so tilting
 * produces parallax between them. Tilts toward the cursor (spring-lerped in
 * a rAF loop, written straight to the DOM), pupils drift the same way, and
 * it blinks. The parent element sets the width; height follows the mark's
 * 36:40 aspect.
 */
export function Logo3D({
  className,
  maxTilt = DEFAULT_TILT,
}: {
  className?: string;
  maxTilt?: number;
}) {
  // useId emits ":r0:" style tokens — strip the colons so url(#…) resolves.
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const outerRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);

  /* mousemove only records a target; the rAF loop lerps toward it and
     parks itself once settled, restarting on the next move. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = { rx: 0, ry: 0, tx: 0, ty: 0, raf: 0 };

    const tick = () => {
      a.rx += (a.tx - a.rx) * 0.09;
      a.ry += (a.ty - a.ry) * 0.09;
      const st = stageRef.current;
      if (st) {
        st.style.transform = `rotateX(${a.rx.toFixed(2)}deg) rotateY(${a.ry.toFixed(2)}deg)`;
        // pupils drift toward the cursor; sheen brightens toward the light
        st.style.setProperty("--l3d-ex", `${((a.ry / maxTilt) * 1.4).toFixed(2)}px`);
        st.style.setProperty("--l3d-ey", `${((-a.rx / maxTilt) * 1.05).toFixed(2)}px`);
        const sheen = 0.1 + (a.rx / maxTilt) * 0.05 - (a.ry / maxTilt) * 0.04;
        st.style.setProperty("--l3d-sheen", Math.min(0.22, Math.max(0.02, sheen)).toFixed(3));
      }
      if (Math.abs(a.tx - a.rx) < 0.02 && Math.abs(a.ty - a.ry) < 0.02) {
        a.raf = 0;
        return;
      }
      a.raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const el = outerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      a.ty = Math.max(-1, Math.min(1, dx)) * maxTilt;
      a.tx = Math.max(-1, Math.min(1, -dy)) * maxTilt * 0.85;
      if (!a.raf) a.raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (a.raf) cancelAnimationFrame(a.raf);
    };
  }, [maxTilt]);

  const gFront = `l3dFront-${uid}`;
  const gFace = `l3dFace-${uid}`;
  const gSheen = `l3dSheen-${uid}`;

  return (
    <span
      ref={outerRef}
      className={className ? `l3d ${className}` : "l3d"}
      aria-hidden="true"
    >
      <span className="l3d-stage" ref={stageRef}>
        {WALL.map((w, i) => (
          <svg key={i} viewBox="0 0 36 40" fill="none" style={{ transform: `translateZ(${w.z}px)` }}>
            <path d={SYM_PARTS.bubble} fill={w.fill} />
          </svg>
        ))}
        <svg viewBox="0 0 36 40" fill="none" style={{ transform: "translateZ(0px)" }}>
          <defs>
            <linearGradient id={gFront} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3D9BFF" />
              <stop offset="0.55" stopColor="#0077EE" />
              <stop offset="1" stopColor="#005CC4" />
            </linearGradient>
            <linearGradient id={gFace} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E7F0FA" />
            </linearGradient>
            <linearGradient id={gSheen} x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={SYM_PARTS.bubble} fill={`url(#${gFront})`} />
          <path
            d={SYM_PARTS.bubble}
            fill={`url(#${gSheen})`}
            style={{ opacity: "var(--l3d-sheen, 0.1)" }}
          />
        </svg>
        <svg viewBox="0 0 36 40" fill="none" style={{ transform: "translateZ(2.2px)" }}>
          <path d={SYM_PARTS.band} fill="#052659" />
        </svg>
        <svg viewBox="0 0 36 40" fill="none" style={{ transform: "translateZ(3.8px)" }}>
          <path d={SYM_PARTS.face} fill={`url(#${gFace})`} />
        </svg>
        <svg viewBox="0 0 36 40" fill="none" style={{ transform: "translateZ(5.2px)" }}>
          <g className="l3d-eyes">
            <g className="l3d-blink">
              <path d={SYM_PARTS.eyeL} fill="#052659" />
              <path d={SYM_PARTS.eyeR} fill="#052659" />
            </g>
          </g>
          <path d={SYM_PARTS.smile} fill="#052659" />
        </svg>
      </span>
    </span>
  );
}
