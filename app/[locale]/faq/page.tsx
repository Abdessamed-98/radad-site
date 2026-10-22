import { Band, FaqBlock, Head } from "@/components/blocks/Blocks";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "ar") as Locale;

  return (
    <>
      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="faq_badge" title="faq_h" sub="faq_sub" />
          <FaqBlock locale={l} />
        </div>
      </section>

      <Band locale={l} />
    </>
  );
}
