import { dict, type DictKey } from "./dictionary";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

/** The prototype indexed every string pair as [arabic, english]; keep that
 *  ordering so dictionary.ts needs no reshaping. */
const index: Record<Locale, 0 | 1> = { ar: 0, en: 1 };

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Translator bound to one locale. `t("nav_home")` -> "الرئيسية" | "Home" */
export function getT(locale: Locale) {
  const i = index[locale];
  return function t(key: DictKey): string {
    return dict[key][i];
  };
}

/** For inline pairs that never earned a dictionary key, e.g. p(["نعم","Yes"]). */
export function getP(locale: Locale) {
  const i = index[locale];
  return function p<T>(pair: readonly [T, T]): T {
    return pair[i];
  };
}

export type T = ReturnType<typeof getT>;

/** Swap the locale segment of a path: /ar/pricing -> /en/pricing */
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = next;
    return parts.join("/");
  }
  return `/${next}${pathname}`;
}

/** Route table — the order here is the order shown in the navbar. */
export const routes = [
  { path: "", key: "nav_home" },
  { path: "features", key: "nav_feat" },
  { path: "pricing", key: "nav_price" },
  { path: "integrations", key: "nav_int" },
  { path: "contact", key: "nav_contact" },
] as const satisfies readonly { path: string; key: DictKey }[];

export const href = (locale: Locale, path: string) =>
  path ? `/${locale}/${path}` : `/${locale}`;
