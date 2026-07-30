import {
  Band,
  FaqBlock,
  Head,
  Note,
  PlansBlock,
  TrustBlock,
} from "@/components/blocks/Blocks";
import { CalcBlock } from "@/components/blocks/CalcBlock";
import { getT, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "ar") as Locale;
  const t = getT(l);

  return (
    <>
      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="p_badge" title="p_h" sub="p_sub" />
          <PlansBlock locale={l} />
          <Note>{t("p_pay")}</Note>
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap stack g8">
          <Head locale={l} badge="calc_badge" title="calc_h" sub="calc_sub" />
          <CalcBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="tru_badge" title="tru_h" />
          <TrustBlock locale={l} />
          <Note>{t("tru_slots")}</Note>
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap stack g8">
          <Head locale={l} badge="faq_badge" title="faq_h" />
          <FaqBlock locale={l} />
        </div>
      </section>

      <Band locale={l} />
    </>
  );
}
