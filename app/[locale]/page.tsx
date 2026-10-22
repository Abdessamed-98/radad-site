import {
  Band,
  CmpBlock,
  FaqBlock,
  Head,
  Note,
  PlansBlock,
  PlansFoot,
  StatsBlock,
  StepsBlock,
  StripBlock,
  TrustBlock,
} from "@/components/blocks/Blocks";
import { AppWindow } from "@/components/blocks/AppWindow";
import { StatsZoom } from "@/components/blocks/StatsZoom";
import { CalcBlock } from "@/components/blocks/CalcBlock";
import { ActivitiesBlock } from "@/components/blocks/Activities";
import { FeatCards } from "@/components/blocks/MiniUI";
import { FeatZoom } from "@/components/blocks/FeatZoom";
import { HubBlock } from "@/components/blocks/HubBlock";
import { OrbBlock } from "@/components/blocks/OrbBlock";
import { DotWave } from "@/components/hero/DotWave";
import { AutomationBlock, MorningBlock } from "@/components/blocks/Frames";
import { HandoffBlock, SourcesBlock, VoiceBlock } from "@/components/blocks/Product";
import { MessageFlow } from "@/components/hero/MessageFlow";
import { SplashIntro } from "@/components/SplashIntro";
import { Arrow, Icon } from "@/components/Icon";
import { FAQ } from "@/lib/content";
import { getT, isLocale, locales, type Locale } from "@/lib/i18n";
import { LINKS } from "@/lib/links";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "ar") as Locale;
  const t = getT(l);

  return (
    <>
      <SplashIntro />
      <section className="hero">
        {/* Dot grid rippling outward from behind the mark. */}
        <DotWave />

        <div className="wrap">
          <MessageFlow locale={l} />
          <div className="hero-in">
            <h1 className="t-display rv d1">
              {t("hero_1")}
              <br />
              <span className="grad-txt">{t("hero_2")}</span>
            </h1>
            <p className="t-lead rv d2">{t("hero_sub")}</p>
            <div className="cta-row rv d2">
              <a className="btn btn-lg btn-p" href="#activities">
                <Icon name="grid" width={2} />
                {t("cta_pick")}
                <Arrow />
              </a>
              <a className="btn btn-lg btn-s" href={LINKS.register}>
                {t("cta_start")}
              </a>
            </div>
            <span className="t-cap rv d3">{t("hero_note")}</span>
          </div>
          <AppWindow locale={l} pills />
        </div>
      </section>

      <section className="sec-t">
        <div className="wrap">
          <StripBlock locale={l} />
        </div>
      </section>

      {/* The hero CTA lands here: who it's for, before what it does. */}
      <section className="sec sec-white" id="activities">
        <ActivitiesBlock locale={l} />
      </section>

      {/* no badge here by design — the headline itself opens the act */}
      <section className="sec-t sec-white">
        <div className="wrap">
          <FeatZoom l1={t("f_h1a")} l2={t("f_h1b")}>
            <FeatCards locale={l} />
          </FeatZoom>
        </div>
      </section>

      <section className="sec-t sec-white">
        <div className="wrap">
          <StatsZoom locale={l} />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack g8">
          <OrbBlock locale={l} />
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

      {/* Half-frame shot of the real abandoned-cart studio; the editor
          column intentionally runs off the viewport edge. */}
      <section className="sec sec-tint">
        <div className="wrap">
          <AutomationBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-white">
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
          <Head locale={l} badge="s_badge" title="s_h1" sub="s_sub" />
          <StepsBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap stack g8">
          <Head locale={l} badge="calc_badge" title="calc_h" sub="calc_sub" />
          <CalcBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap stack g8">
          <Head locale={l} badge="cmp_badge" title="cmp_h" sub="cmp_sub" />
          <CmpBlock locale={l} />
          <Note>{t("cmp_note")}</Note>
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="tru_badge" title="tru_h" />
          <TrustBlock locale={l} />
        </div>
      </section>

      {/* Finished testimonial design carrying clearly-labelled SAMPLE quotes —
          no real customer quotes exist yet (none in the product repo either).
          Every card wears a نموذج chip; swap the tm* keys for real quotes. */}
      <section className="sec sec-tint">
        <div className="wrap stack g8">
          <Head locale={l} badge="t_badge" title="t_h" />
          <div className="slots">
            {([1, 2, 3] as const).map((i) => (
              <div className={`surface lift tm rv d${i}`} key={i}>
                <span className="tm-top">
                  <span className="tm-metric grad-txt num">
                    {t(`tm${i}_m` as "tm1_m")}
                  </span>
                  <span className="chip-xs tm-sample">{t("t_sample")}</span>
                </span>
                <span className="tm-ml">{t(`tm${i}_ml` as "tm1_ml")}</span>
                <span className="tm-q">“{t(`tm${i}_q` as "tm1_q")}”</span>
                <span className="tm-w">
                  <span className={`tm-avi tm-c${i}`}>
                    {t(`tm${i}_n` as "tm1_n").charAt(0)}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span className="tm-n">{t(`tm${i}_n` as "tm1_n")}</span>
                    <span className="tm-s">{t(`tm${i}_s` as "tm1_s")}</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
          <Note>{t("t_note")}</Note>
        </div>
      </section>

      {/* The merchant's morning: the tenant dashboard home as a half-frame,
          bleeding off the opposite edge to the automations shot. */}
      <section className="sec sec-dark">
        <div className="wrap">
          <MorningBlock locale={l} />
        </div>
      </section>

      <section className="sec sec-white">
        <div className="wrap stack g8">
          <Head locale={l} badge="p_badge" title="p_h" sub="p_sub" />
          <PlansBlock locale={l} />
          <PlansFoot locale={l} />
        </div>
      </section>

      <section className="sec sec-tint">
        <div className="wrap stack g8">
          <Head locale={l} badge="faq_badge" title="faq_h" />
          <FaqBlock locale={l} items={FAQ.slice(0, 6)} more />
        </div>
      </section>

      <Band locale={l} />
    </>
  );
}
