import { LOGO } from "@/lib/logo";
import { getT, type Locale } from "@/lib/i18n";

/** The mark plus a typeset wordmark in both locales. The horizontal lockup
 *  in Logo/ still carries the old Radad wordmark as paths, so it's retired
 *  until an Atheer lockup lands. */
export function BrandMark({ locale }: { locale: Locale }) {
  return (
    <>
      <svg
        className="logo-sym"
        viewBox="0 0 36 40"
        fill="none"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: LOGO.sym }}
      />
      <span className="brand-t">{getT(locale)("brand")}</span>
    </>
  );
}
