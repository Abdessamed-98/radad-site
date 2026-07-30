"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Elements marked `.rv` start at opacity 0 and only become visible once
 * `.in` is added — without this observer the entire page renders but stays
 * transparent. Re-scans on navigation, since App Router swaps the tree
 * without remounting the layout.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const showAll = () =>
      document
        .querySelectorAll<HTMLElement>(".rv:not(.in)")
        .forEach((el) => el.classList.add("in"));

    // No observer support, or motion is unwanted: show everything at once.
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      showAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target); // reveal is one-way
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );

    // Re-observing an element already being watched is a no-op, so repeated
    // scans are safe and cheap.
    const scan = () =>
      document
        .querySelectorAll<HTMLElement>(".rv:not(.in)")
        .forEach((el) => io.observe(el));

    scan();

    /* A single scan only ever sees the nodes present right now. Anything
       swapped in afterwards — Fast Refresh replacing the tree, or a client
       component mounting its content after measuring — would never be
       observed and would stay at opacity 0 forever. Watch for additions and
       rescan, batched to one pass per frame. */
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
