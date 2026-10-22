"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./BrandMark";
import {
  getT,
  href,
  routes,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import { LINKS } from "@/lib/links";

export function Header({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [stuck, setStuck] = useState(false);

  /* Direction is measured against the last point where we actually acted,
     not the previous frame, so a few stray pixels of momentum cannot flip
     the pill back and forth. */
  const lastY = useRef(0);
  const ticking = useRef(false);
  const hiddenRef = useRef(false);
  const menuRef = useRef(false);

  menuRef.current = menuOpen;

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const y = Math.max(0, window.scrollY);
        setStuck(y > 8);

        const dy = y - lastY.current;

        if (y <= 160 || menuRef.current) {
          if (hiddenRef.current) {
            hiddenRef.current = false;
            setHidden(false);
          }
          lastY.current = y;
          return;
        }
        if (Math.abs(dy) < 8) return; // ignore jitter
        const wantHide = dy > 0;
        if (wantHide !== hiddenRef.current) {
          hiddenRef.current = wantHide;
          setHidden(wantHide);
        }
        lastY.current = y;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  function toggleTheme() {
    const root = document.documentElement;
    let current = root.getAttribute("data-theme");
    if (!current) {
      current = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("rd5-theme", next);
    } catch {
      /* private mode — the toggle still works for this session */
    }
  }

  function toggleLocale() {
    const next: Locale = locale === "ar" ? "en" : "ar";
    router.push(switchLocalePath(pathname, next));
  }

  const home = href(locale, "");

  return (
    <header
      className={`hdr${stuck ? " stuck" : ""}${hidden ? " nav-hide" : ""}`}
      id="hdr"
    >
      <div className="wrap">
        <div className="hdr-in">
          <Link className="brand" href={home} aria-label={t("brand")}>
            <BrandMark locale={locale} />
          </Link>

          <div className={`navwrap${menuOpen ? " open" : ""}`} id="navwrap">
            <nav className="nav">
              {routes.map((r) => {
                const to = href(locale, r.path);
                const active = pathname === to;
                return (
                  <Link
                    key={r.path || "home"}
                    href={to}
                    className={active ? "on" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    {t(r.key)}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hdr-act">
            <button className="lang" type="button" onClick={toggleLocale}>
              {locale === "ar" ? "EN" : "ع"}
            </button>
            <button
              className="ibtn"
              type="button"
              aria-label="theme"
              onClick={toggleTheme}
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path
                  d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a className="lang hdr-hide-sm" href={LINKS.login}>
              {t("nav_login")}
            </a>
            <Link className="btn btn-d btn-sm" id="navCta" href={href(locale, "contact")}>
              {t("nav_cta")}
            </Link>
            <button
              className="ibtn burger"
              type="button"
              aria-label="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
