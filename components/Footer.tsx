import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { Icon } from "./Icon";
import { getT, href, type Locale } from "@/lib/i18n";
import { LINKS } from "@/lib/links";

export function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const to = (path: string) => href(locale, path);

  /* Same three columns as atheerxai.com; legal pages live on the app. */
  const columns: { head: string; items: [string, string][] }[] = [
    {
      head: t("ft_prod"),
      items: [
        [t("nav_feat"), to("features")],
        [t("nav_price"), to("pricing")],
        [t("nav_int"), to("integrations")],
        [t("ft_faq"), to("faq")],
      ],
    },
    {
      head: t("ft_comp"),
      items: [[t("nav_contact"), to("contact")]],
    },
    {
      head: t("ft_legal"),
      items: [
        [t("ft_privacy"), LINKS.privacy],
        [t("ft_terms"), LINKS.terms],
        [t("ft_refund"), LINKS.refund],
      ],
    },
  ];

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-g">
          <div className="fcol">
            <Link className="brand" href={to("")} style={{ marginBottom: 8 }}>
              <BrandMark locale={locale} />
            </Link>
            <p className="t-sm" style={{ maxWidth: "32ch" }}>
              {t("ft_tag")}
            </p>
          </div>

          {columns.map((c) => (
            <div className="fcol" key={c.head}>
              <span className="fh">{c.head}</span>
              {c.items.map(([label, url], i) => (
                <Link href={url} key={`${label}-${i}`}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="ftr-b">
          <span>
            © 2026 {t("brand")} · {t("ft_rights")}
          </span>
          <span className="bdgs">
            <span className="chip-xs">
              <Icon name="shield" width={2} />
              GDPR
            </span>
            <span className="chip-xs">
              <Icon name="lock" width={2} />
              AES-256
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
