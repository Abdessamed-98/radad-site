import { Head } from "@/components/blocks/Blocks";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Icon } from "@/components/Icon";
import type { DictKey } from "@/lib/dictionary";
import { getT, isLocale, locales, type Locale } from "@/lib/i18n";
import type { IconName } from "@/lib/icons";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const CONTACTS: [IconName, DictKey, string][] = [
  ["mail", "c_sales", "sales@radad.online"],
  ["chat", "c_support", "support@radad.online"],
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "ar") as Locale;
  const t = getT(l);

  return (
    <section className="sec sec-white">
      <div className="wrap stack g8">
        <Head locale={l} badge="c_badge" title="c_h" sub="c_sub" />

        <div className="ctwo">
          <ContactForm locale={l} />

          <div className="cside rv d1">
            {CONTACTS.map(([icon, key, value]) => (
              <div className="surface lift cb" key={key}>
                <span className="ico ico-md ico-tint">
                  <Icon name={icon} width={1.8} />
                </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span className="cb-k">{t(key)}</span>
                  <span className="cb-v" dir="ltr">
                    {value}
                  </span>
                </span>
              </div>
            ))}

            <div className="surface lift cb">
              <span className="ico ico-md ico-tint">
                <Icon name="clock" width={1.8} />
              </span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span className="cb-k">{t("c_hours")}</span>
                <span
                  className="cb-v"
                  style={{ fontWeight: 500, fontSize: ".85rem" }}
                >
                  {t("c_hours_v")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
