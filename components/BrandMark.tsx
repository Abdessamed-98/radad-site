import { LOGO } from "@/lib/logo";
import type { Locale } from "@/lib/i18n";

/** Arabic gets the full horizontal lockup; English pairs the mark with a
 *  latin wordmark, since the lockup's wordmark is Arabic script. */
export function BrandMark({ locale }: { locale: Locale }) {
  if (locale === "ar") {
    return (
      <svg
        className="logo-lock"
        viewBox="0 0 108 40"
        fill="none"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: LOGO.h }}
      />
    );
  }
  return (
    <>
      <svg
        className="logo-sym"
        viewBox="0 0 36 40"
        fill="none"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: LOGO.sym }}
      />
      <span className="brand-t">Radad</span>
    </>
  );
}
