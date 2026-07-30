"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Adds .rev-on to the wrapper once `threshold` of it is genuinely on
 * screen — for blocks whose reveal choreography deserves a real entrance,
 * not the 5%-peek the global .rv observer fires at. Shows immediately for
 * reduced motion or missing IntersectionObserver, and a timer guarantees
 * a visitor who never scrolls still gets the content.
 */
export function Reveal({
  className,
  children,
  threshold = 0.35,
}: {
  className?: string;
  children: ReactNode;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
      { threshold }
    );
    io.observe(el);
    const bail = setTimeout(() => setOn(true), 6000);
    return () => {
      io.disconnect();
      clearTimeout(bail);
    };
  }, [threshold]);

  return (
    <div ref={ref} className={`${className ?? ""}${on ? " rev-on" : ""}`}>
      {children}
    </div>
  );
}
