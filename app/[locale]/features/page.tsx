import {
  Band,
  ChansBlock,
  CmpBlock,
  Head,
  Note,
} from "@/components/blocks/Blocks";
import { AppWindow } from "@/components/blocks/AppWindow";
import { DemoBlock } from "@/components/blocks/DemoBlock";
import { FeatCards } from "@/components/blocks/MiniUI";
import { HubBlock } from "@/components/blocks/HubBlock";
import { OrbBlock } from "@/components/blocks/OrbBlock";
import { HandoffBlock, SourcesBlock, VoiceBlock } from "@/components/blocks/Product";
import { getT, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FeaturesPage({
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
          <Head locale={l} badge="f_badge" title="f_h1" sub="f_sub" />
          <FeatCards locale={l} />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack g8">
          <OrbBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap stack g8">
          <Head locale={l} badge="dm_badge" title="dm_h" sub="dm_sub" />
          <DemoBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap stack g8">
          <Head locale={l} badge="hub_badge" title="hub_h" sub="hub_sub" />
          <HubBlock locale={l} />
        </div>
      </section>


      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="ho_badge" title="ho_h" sub="ho_sub" />
          <HandoffBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap stack g8">
          <Head locale={l} badge="f_badge" title="src_h" sub="src_sub" />
          <SourcesBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap stack g8">
          <VoiceBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="ch_badge" title="ch_h" />
          <ChansBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap stack g8">
          <Head locale={l} badge="cmp_badge" title="cmp_h" sub="cmp_sub" />
          <CmpBlock locale={l} />
          <Note>{t("cmp_note")}</Note>
        </div>
      </section>

      <section className="sec-t">
        <div className="wrap">
          <AppWindow locale={l} />
        </div>
      </section>

      <Band locale={l} />
    </>
  );
}
