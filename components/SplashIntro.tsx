"use client";

import { useEffect, useRef, useState } from "react";
import { Logo3D } from "@/components/Logo3D";

const HOLD_MS = 1000; // minimum time the mark holds centre stage
const TIMEOUT_MS = 3200; // give up waiting for the hero and fly anyway
const FLY_MS = 950; // must match the .spl-mark transition in splash.css

/* Module-level so it resets on a full page load but survives client-side
   route changes: the splash greets every hard load, and browsing away and
   back to home doesn't replay it. Set on completion (not start) so React
   StrictMode's double-invoked effect can't mark it done prematurely. */
let introDone = false;

/**
 * First-load intro: the 3D mark holds centre stage over a veil while the
 * page finishes loading, then flies down and lands exactly on the hero
 * core's rect as the veil fades. The real hero logo stays hidden (via
 * body.rd-splash) until the landing frame, so the hand-off is seamless.
 * Skipped entirely under reduced motion.
 */
export function SplashIntro() {
  const [on, setOn] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      introDone ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOn(false);
      return;
    }

    /* rd-splash lives until the landing frame (hides the real hero logo,
       locks scroll); rd-splash-hold is released the moment the veil starts
       fading, so the navbar reveal rides the fade, not the landing. */
    document.body.classList.add("rd-splash", "rd-splash-hold");
    const t0 = performance.now();
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const finish = () => {
      introDone = true;
      document.body.classList.remove("rd-splash", "rd-splash-hold");
      setOn(false);
    };

    const fly = () => {
      const root = rootRef.current;
      const mark = markRef.current;
      const target = document.querySelector<HTMLElement>(".fs-core .l3d");
      if (!root || !mark) return finish();
      root.classList.add("flying");
      // commit the transition-enabling class before moving the mark, so
      // the geometry change can never land in the same style recalc
      void mark.offsetWidth;
      if (veilRef.current) veilRef.current.style.opacity = "0";
      // the veil is fading: let the navbar bloom alongside it
      document.body.classList.remove("rd-splash-hold");
      if (target) {
        const r = target.getBoundingClientRect();
        mark.style.left = `${r.left}px`;
        mark.style.top = `${r.top}px`;
        mark.style.width = `${r.width}px`;
      } else {
        mark.style.opacity = "0"; // no hero to land on: just dissolve
      }
      timer = setTimeout(finish, FLY_MS);
    };

    const wait = (now: number) => {
      const held = now - t0 >= HOLD_MS;
      const ready =
        document.readyState === "complete" &&
        !!document.querySelector(".fs-core .l3d");
      if ((held && ready) || now - t0 >= TIMEOUT_MS) return fly();
      raf = requestAnimationFrame(wait);
    };
    raf = requestAnimationFrame(wait);

    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      document.body.classList.remove("rd-splash", "rd-splash-hold");
    };
  }, []);

  if (!on) return null;
  return (
    <div className="spl" ref={rootRef} aria-hidden="true">
      <div className="spl-veil" ref={veilRef}>
        <i className="spl-ring" />
        <i className="spl-ring r2" />
        <i className="spl-ring r3" />
      </div>
      <div className="spl-mark" ref={markRef}>
        <Logo3D />
      </div>
    </div>
  );
}
