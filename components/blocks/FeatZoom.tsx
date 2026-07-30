"use client";

import { useEffect, useRef } from "react";

/* Scroll-scrubbed intro for the features section: the two-line headline
 * starts large in the middle of the pinned frame, then shrinks and rises to
 * settle in its natural place while the cards come up underneath.
 *
 * The scroll handler writes ONE custom property (--zp, 0..1); every visual
 * is derived from it in CSS as transform/opacity only, so the scrub stays
 * composited. rAF-throttled, passive listeners.
 *
 * --zp defaults to 1 (settled state) in CSS, so without JS — or with reduced
 * motion — the section is simply static and fully visible. Short or narrow
 * viewports get the static layout via a media guard, because a pinned 100vh
 * frame cannot fit the full grid there. */
export function FeatZoom({
  l1,
  l2,
  children,
}: {
  l1: string;
  l2: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      /* Pinned scrub: the wrapper is taller than the viewport, the frame
         sticks, and p is how far through the extra height we've scrolled. */
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      el.style.setProperty("--zp", p.toFixed(4));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <div className="fz" ref={ref}>
      <div className="fz-stick">
        {/* each line is its own block and never wraps, so the scaled-up
            headline has a known width and cannot clip */}
        <h2 className="t-display fz-head">
          <span>{l1}</span>
          <span className="grad-txt">{l2}</span>
        </h2>
        <div className="fz-cards">{children}</div>
      </div>
    </div>
  );
}
