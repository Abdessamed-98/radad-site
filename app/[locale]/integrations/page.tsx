import { Band, Head, IntsBlock, StepsBlock } from "@/components/blocks/Blocks";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function IntegrationsPage({
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
          <Head locale={l} badge="i_badge" title="i_h" sub="i_sub" />
          <IntsBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="s_badge" title="s_h1" sub="s_sub" />
          <StepsBlock locale={l} />
        </div>
      </section>

      <Band locale={l} />
    </>
  );
}
