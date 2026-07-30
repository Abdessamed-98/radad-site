"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo3D } from "@/components/Logo3D";
import { FLOW, FS_BEAMS, FS_CYCLE, fsPaths } from "@/lib/flow";
import { getP, type Locale } from "@/lib/i18n";

/** Lanes riding at once. Each lane puts two chips on screen, and every chip
 *  becomes its own render surface under preserve-3d — so this number is a
 *  direct GPU cost. FLOW only holds 8 unique messages, so beyond that they
 *  repeat, spread across the cycle to keep duplicates apart in time. */
const LANE_COUNT = 9;

/** Waveform silhouettes for voice-note chips, in em-ish units (h/14 em)
 *  so the bars scale with the chip's font size across breakpoints. The
 *  reply reads the same list backwards so the two notes don't look cloned. */
const VOICE_BARS = [6, 10, 7, 13, 9, 15, 7, 11, 5, 12, 8, 14, 6, 9] as const;
const VOICE_BARS_A = [...VOICE_BARS].reverse();

function VoiceNote({ secs, bars }: { secs: number; bars: readonly number[] }) {
  return (
    <span className="fs-vnote">
      <svg className="fs-vplay" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
      <span className="fs-wave">
        {bars.map((h, j) => (
          <i
            key={j}
            style={{
              height: `${(h / 14).toFixed(2)}em`,
              animationDelay: `${(-j * 0.09).toFixed(2)}s`,
            }}
          />
        ))}
      </span>
      <span className="fs-vdur num">0:{String(secs).padStart(2, "0")}</span>
    </span>
  );
}

export function MessageFlow({ locale }: { locale: Locale }) {
  const p = getP(locale);
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  /* Paths are absolute pixel coordinates, so they have to be rebuilt
     whenever the viewport width changes. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;
    const measure = () =>
      setBox({
        w: document.documentElement.clientWidth,
        h: el.clientHeight || 240,
      });

    measure();
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Hovering the mark makes the whole flow rush. playbackRate shifts the
     running animations mid-flight — swapping animation-duration instead
     would recompute every negative delay and teleport the chips. The rate
     itself is lerped in a rAF loop so the speed swells and settles rather
     than stepping. Runs per box change because .fs-core only exists once
     box is measured. */
  useEffect(() => {
    const el = ref.current;
    const core = el?.querySelector<HTMLElement>(".fs-core");
    if (!el || !core || typeof el.getAnimations !== "function") return;

    const RAMP_MS = 1000;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const s = { rate: 1, from: 1, target: 1, t0: 0, raf: 0, ease: easeOut };
    /* Keyframe animations only — CSSTransitions (the hover scale, theme
       fades) must keep their own clock, and per-frame rate writes were
       observed to stall an in-flight transition entirely. */
    const apply = (rate: number) =>
      el.getAnimations({ subtree: true }).forEach((a) => {
        if (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) return;
        a.playbackRate = rate;
      });

    const tick = (now: number) => {
      const t = Math.min(1, (now - s.t0) / RAMP_MS);
      s.rate = s.from + (s.target - s.from) * s.ease(t);
      apply(s.rate);
      if (t >= 1) {
        s.raf = 0;
        return;
      }
      s.raf = requestAnimationFrame(tick);
    };
    /* Speeding up eases OUT — the rush is felt the instant the pointer
       lands, then settles. Slowing down eases in-out, so releasing the
       hover winds down gently. Each retarget restarts the curve from
       the current rate, so mid-ramp reversals never kink. */
    const aim = (target: number) => {
      s.from = s.rate;
      s.target = target;
      s.ease = target > s.rate ? easeOut : easeInOut;
      s.t0 = performance.now();
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };
    const over = () => aim(2.4);
    const out = () => aim(1);

    core.addEventListener("pointerenter", over);
    core.addEventListener("pointerleave", out);
    return () => {
      core.removeEventListener("pointerenter", over);
      core.removeEventListener("pointerleave", out);
      if (s.raf) cancelAnimationFrame(s.raf);
      apply(1);
    };
  }, [box]);

  /* Stop compositing entirely when the band scrolls away. */
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("anim-off", !entry.isIntersecting),
      { rootMargin: "160px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paths = box ? fsPaths(box.w, box.h) : [];
  /* Narrow screens: fewer chips, and only the upper rails — the lower
     rails would run the chips straight through the headline. */
  const small = !!box && box.w < 640;
  const rails = small ? paths.slice(0, 3) : paths;
  const laneCount = small ? 6 : LANE_COUNT;
  // Wraps once FLOW runs out, so the lane count is free to exceed the list.
  const lanes = Array.from(
    { length: laneCount },
    (_, i) => FLOW[i % FLOW.length]
  );
  /* Constant on-screen speed: the rails scale with the viewport, so the
     cycle time must scale with it too — at a fixed duration the chips
     crawl on narrow screens and sprint on wide ones. Clamped so phones
     never turn frantic and ultrawides never turn sleepy. */
  const speed = box ? Math.max(0.5, Math.min(1.1, box.w / 1440)) : 1;
  const dur = FS_CYCLE * speed;

  return (
    <div
      className="fs"
      ref={ref}
      aria-hidden="true"
      style={{ "--fsDur": `${dur.toFixed(2)}s` } as React.CSSProperties}
    >
      {box && (
        <>
          {/* streaks ride the same rails, travelling with the messages */}
          <div className="fs-beams">
            {FS_BEAMS.map((b, i) => (
              <span
                key={i}
                className="fs-beam"
                style={
                  {
                    offsetPath: `path("${paths[b.p % paths.length]}")`,
                    "--bc": b.c,
                    "--bd": `${(b.dur * speed).toFixed(2)}s`,
                    animationDelay: `${(b.d * speed).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <span className="fs-rg" />
          <span className="fs-rg r2" />
          <span className="fs-rg r3" />
          <span className="fs-glow" />

          {/* the mask lives on .fs-depth; .fs-track must stay free of any
              grouping property or transform-style:preserve-3d collapses
              and chips paint in DOM order instead of depth order */}
          <div className="fs-depth">
            <div className="fs-track">
              {lanes.map((f, i) => {
                const d = -i * (dur / lanes.length);
                const offsetPath = `path("${rails[(i * 2) % rails.length]}")`;
                const far = f.far ? " lane-far" : "";
                const style = {
                  offsetPath,
                  "--d": `${d}s`,
                } as React.CSSProperties;
                return (
                  <Fragment key={i}>
                    <span className={`fs-chip in${far}`} style={style}>
                      <span className="fs-body">
                        <span className="fs-ch" style={{ background: f.cc }}>
                          <Icon name={f.ch} width={2.4} />
                        </span>
                        {f.voice ? <VoiceNote secs={f.voice} bars={VOICE_BARS} /> : p(f.q)}
                      </span>
                    </span>
                    <span className={`fs-chip out${far}`} style={style}>
                      <span className="fs-body">
                        <span className="fs-tick">
                          <Icon name="check" width={3.6} />
                        </span>
                        {f.va ? <VoiceNote secs={f.va} bars={VOICE_BARS_A} /> : p(f.a)}
                      </span>
                    </span>
                  </Fragment>
                );
              })}
            </div>
          </div>

          <span className="fs-core">
            <Logo3D />
          </span>
        </>
      )}
    </div>
  );
}
