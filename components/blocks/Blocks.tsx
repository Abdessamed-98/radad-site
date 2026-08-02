import Link from "next/link";
import { Icon, Arrow } from "@/components/Icon";
import { CHANS, FAQ, INTS, PLANS, STEPS } from "@/lib/content";
import { BRANDS } from "@/lib/brands";
import type { DictKey } from "@/lib/dictionary";
import { getP, getT, href, type Locale } from "@/lib/i18n";
import type { IconName } from "@/lib/icons";

/* ---------- section heading ---------- */
export function Head({
  locale,
  badge,
  title,
  sub,
}: {
  locale: Locale;
  badge: DictKey;
  title: DictKey;
  sub?: DictKey;
}) {
  const t = getT(locale);
  return (
    <div className="stack g3 ctr rv">
      <span className="badge badge-brand">
        <i />
        {t(badge)}
      </span>
      <h2 className="t-h1">{t(title)}</h2>
      {sub && <p className="t-lead">{t(sub)}</p>}
    </div>
  );
}

/* ---------- honest-caveat note ---------- */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="note rv">
      <Icon name="info" />
      <span>{children}</span>
    </div>
  );
}

/* ---------- integrations marquee ----------
   Official brand marks (lib/brands.ts) drifting in an infinite loop. The
   track is rendered twice and slides -50%, so the loop point is invisible.
   Transform-only; edge fades are static overlays, NOT a mask — a mask over
   an animating track would re-rasterise the strip every frame. */
export function StripBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const row = (key: string) => (
    <div className="mq-track" key={key} aria-hidden={key === "b"}>
      {[...BRANDS, ...BRANDS, ...BRANDS].map((br, i) => (
        <span className="mq-item" key={br.name + i} style={{ "--bc": br.color } as React.CSSProperties}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
               dangerouslySetInnerHTML={{ __html: br.svg }} />
          {br.name}
        </span>
      ))}
    </div>
  );
  return (
    <div className="mq rv">
      <span className="mq-l">{t("strip_l")}</span>
      <div className="mq-win">
        <div className="mq-rail">
          {row("a")}
          {row("b")}
        </div>
        <span className="mq-fade s" aria-hidden="true" />
        <span className="mq-fade e" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ---------- headline stats ---------- */
const STATS: [DictKey, DictKey][] = [
  ["st1v", "st1l"],
  ["st2v", "st2l"],
  ["st3v", "st3l"],
  ["st4v", "st4l"],
];

export function StatsBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="grid4">
      {STATS.map(([value, label], i) => (
        <div className={`surface lift st rv d${(i % 3) + 1}`} key={label}>
          <span className="ico ico-sm ico-tint st-ic">
            <Icon name="arrow" width={2.4} />
          </span>
          <span className="st-v grad-txt num">{t(value)}</span>
          <span className="st-l">{t(label)}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- onboarding steps ----------
   A journey rail: the connecting line draws itself across the section,
   each numbered station pops as the line reaches it, and every card
   opens with a small CSS-drawn scene of what actually happens at that
   step — channels clicking into the store, the knowledge base filling,
   the first supervised conversation. Copy is the verbatim STEPS
   content; scene labels reuse the product's own phrases. */
export function StepsBlock({ locale }: { locale: Locale }) {
  const p = getP(locale);
  const chip = (name: string, cls: string) => {
    const b = BRANDS.find((x) => x.name === name)!;
    return (
      <span className={`sc-chip ${cls}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: b.svg }} />
      </span>
    );
  };

  const scenes = [
    /* 1 — channels click into the store */
    <span className="sc sc1" key="c">
      <span className="sc1-chips">
        {chip("WhatsApp", "wa")}
        {chip("Salla", "salla")}
        {chip("Zid", "zid")}
      </span>
      <span className="sc1-wire" />
      <span className="sc1-hub">
        <Icon name="store" width={2} />
        {p(["متجرك", "Your store"])}
        <span className="sc-ok">
          <Icon name="check" width={3.2} />
        </span>
      </span>
    </span>,

    /* 2 — the knowledge base fills itself */
    <span className="sc sc2" key="t">
      <span className="sc2-doc">
        <i />
        <i />
        <i />
      </span>
      <span className="sc2-flow">
        <i />
        <i />
        <i />
      </span>
      <span className="sc2-bot">
        <Icon name="spark" width={2} />
      </span>
      <span className="sc2-foot">
        <span className="sc2-bar">
          <i />
        </span>
        <span className="sc2-lbl">{p(["قاعدة المعرفة · جاهزة", "Knowledge base · ready"])}</span>
      </span>
    </span>,

    /* 3 — the first supervised conversation */
    <span className="sc sc3" key="w">
      <span className="sc3-row">
        <span className="sc3-av">ن</span>
        <span className="sc3-lines">
          <i />
          <i />
        </span>
        <span className="sc3-live">
          <i />
          {p(["يرد الآن", "Replying now"])}
        </span>
      </span>
      <span className="sc3-take">{p(["استلام المحادثة", "Take over"])}</span>
    </span>,
  ];

  return (
    <div className="stp rv">
      <span className="stp-rail" aria-hidden="true">
        <i />
      </span>
      {STEPS.map((s, i) => (
        <div
          className="stq"
          key={i}
          style={{ "--sd": `${0.3 + i * 0.24}s` } as React.CSSProperties}
        >
          <span className="stq-disc num">0{i + 1}</span>
          <div className="stq-card surface">
            <span className="stq-vis" aria-hidden="true">
              {scenes[i]}
            </span>
            <span className="t-h3">{p(s.t)}</span>
            <span className="t-body">{p(s.d)}</span>
            <span className="stq-m">
              <Icon name="clock" width={2.2} />
              {p(s.m)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- pricing ---------- */
export function PlansBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);
  return (
    <div className="grid4">
      {PLANS.map((pl, i) => (
        <div
          className={`surface lift pl${pl.hot ? " pl-on" : ""} rv d${(i % 3) + 1}`}
          key={i}
        >
          {pl.hot ? (
            <span className="badge badge-glass pl-flag">{t("p_pop")}</span>
          ) : null}
          <span className="pl-n">{p(pl.n)}</span>
          {pl.free ? (
            <div className="pl-pr">
              <span className="pl-a">{t("p_free")}</span>
            </div>
          ) : (
            <div className="pl-pr">
              {/* PlanSeeder prices are SAR, not dollars */}
              <span className="pl-c">{p(["ر.س", "SAR"])}</span>
              <span className="pl-a num">{p(pl.a)}</span>
              <span className="pl-per">{t("p_month")}</span>
            </div>
          )}
          <p className="pl-for">{p(pl.f2)}</p>
          <ul>
            {pl.f.map((f, k) => (
              <li key={k}>
                <span className="tick">
                  <Icon name="check" width={3.2} />
                </span>
                <span>{p(f)}</span>
              </li>
            ))}
          </ul>
          <Link
            className={`btn ${pl.hot ? "btn-w" : "btn-s"}`}
            href={href(locale, "contact")}
          >
            {t(pl.cta)}
          </Link>
        </div>
      ))}
    </div>
  );
}

/* ---------- FAQ ---------- */
export function FaqBlock({ locale }: { locale: Locale }) {
  const p = getP(locale);
  return (
    <div className="faq">
      {FAQ.map((f, i) => (
        <details className="surface qa rv" key={i}>
          <summary>
            {p(f.q)}
            <span className="qa-i">+</span>
          </summary>
          <div className="qa-a">{p(f.a)}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------- integrations ---------- */
export function IntsBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);
  return (
    <div className="grid3">
      {INTS.map((o, i) => (
        <div className={`surface lift it rv d${(i % 3) + 1}`} key={i}>
          <div className="it-h">
            <span className={`ico ico-md ${o.k ? "ico-solid" : "ico-neutral"}`}>
              <Icon name={o.i} width={1.8} />
            </span>
            <span className="it-n">{p(o.n)}</span>
          </div>
          <p className="t-body">{p(o.d)}</p>
          <span className={`it-s${o.live ? "" : " soon"}`}>
            <i />
            {o.live ? t("i_live") : t("i_soon")}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- channels ---------- */
export function ChansBlock({ locale }: { locale: Locale }) {
  const p = getP(locale);
  return (
    <div
      className="grid3 rv"
      style={{ gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))" }}
    >
      {CHANS.map((c, i) => (
        <span
          className="surface lift"
          key={i}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            padding: "16px 18px",
          }}
        >
          <span className={`ico ico-md ${c.k ? "ico-solid" : "ico-neutral"}`}>
            <Icon name={c.i} width={1.8} />
          </span>
          <span className="t-h4">{p(c.n)}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------- trust ---------- */
const TRUST: [IconName, DictKey, DictKey][] = [
  ["lock", "tru1", "tru1s"],
  ["shield", "tru2", "tru2s"],
  ["team", "tru3", "tru3s"],
  ["chat", "tru4", "tru4s"],
];

export function TrustBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="trust">
      {TRUST.map(([icon, k, s], i) => (
        <div className={`surface lift tr rv d${(i % 3) + 1}`} key={k}>
          <span className="ico ico-md ico-tint">
            <Icon name={icon} width={1.8} />
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span className="tr-k">{t(k)}</span>
            <span className="tr-s">{t(s)}</span>
          </span>
        </div>
      ))}
      {/* left empty on purpose — awaiting a real certification to name */}
      <div className="tr slot rv">
        <span className="ico ico-md ico-neutral">
          <Icon name="check" width={2} />
        </span>
        <span className="tr-k">{t("tru_slot")}</span>
      </div>
    </div>
  );
}

/* ---------- comparison ---------- */
const Yes = () => (
  <span className="mark yes">
    <Icon name="check" width={3} />
  </span>
);
const No = () => (
  <span className="mark no">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  </span>
);
const Part = () => (
  <span className="mark part">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 12h12" />
    </svg>
  </span>
);

/* Compares approaches, not named competitors — we have no basis to assert
   what any specific rival does or doesn't ship. */
const CMP: [DictKey, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2][] = [
  ["cmp1", 0, 1, 0],
  ["cmp2", 0, 2, 0],
  ["cmp3", 0, 0, 1],
  ["cmp4", 0, 2, 0],
  ["cmp5", 0, 1, 2],
  ["cmp6", 0, 1, 0],
  ["cmp7", 0, 2, 1],
  ["cmp8", 0, 1, 2],
  ["cmp9", 0, 0, 1],
];

const Mark = ({ v }: { v: 0 | 1 | 2 }) =>
  v === 0 ? <Yes /> : v === 1 ? <No /> : <Part />;

export function CmpBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="cmp rv">
      <table>
        <thead>
          <tr>
            <th>{t("cmp_f")}</th>
            <th className="us">{t("cmp_us")}</th>
            <th>{t("cmp_bot")}</th>
            <th>{t("cmp_man")}</th>
          </tr>
        </thead>
        <tbody>
          {CMP.map(([k, a, b, c]) => (
            <tr key={k}>
              <th>{t(k)}</th>
              <td className="us">
                <Mark v={a} />
              </td>
              <td>
                <Mark v={b} />
              </td>
              <td>
                <Mark v={c} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- closing CTA band ---------- */
export function Band({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section className="sec">
      <div className="wrap">
        <div className="band rv">
          <h2 className="t-h2">{t("band_h")}</h2>
          <p>{t("band_s")}</p>
          <div className="cta-row">
            <Link className="btn btn-lg btn-w" href={href(locale, "contact")}>
              {t("cta_start")}
              <Arrow />
            </Link>
            <Link className="btn btn-lg btn-o" href={href(locale, "pricing")}>
              {t("nav_price")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
