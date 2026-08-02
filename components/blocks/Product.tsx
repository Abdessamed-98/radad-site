import Link from "next/link";
import { Arrow, Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import type { DictKey } from "@/lib/dictionary";
import { getP, getT, href, type Locale } from "@/lib/i18n";
import type { IconName } from "@/lib/icons";

/* ---------- AI ↔ human handoff ----------
   The escalation flow is the centre of gravity in the real product
   (active → waiting for an agent → with an agent → closed), and the site
   never showed it. */
const HANDOFF: [DictKey, DictKey][] = [
  ["ho_1", "cs_active"],
  ["ho_2", "cs_waiting"],
  ["ho_3", "cs_human"],
  ["ho_4", "cs_closed"],
];

export function HandoffBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    /* A timeline stepper: state-coloured discs ride a gradient journey
       line that draws itself across the section on reveal; each card
       rises beneath its disc as the line reaches it. */
    <Reveal className="handoff" threshold={0.3}>
      <span className="ho-track" aria-hidden="true" />
      {HANDOFF.map(([step, status], i) => (
        <div className="ho" key={step}>
          <span className="ho-n num">{i + 1}</span>
          <span className="ho-k">{t(step)}</span>
          <span className={`chip-xs${i === 1 ? " a" : i === 2 ? " g" : ""}`}>
            {t(status)}
          </span>
        </div>
      ))}
    </Reveal>
  );
}

/* ---------- what the agent reads ----------
   Knowledge bases, custom tables, Sheets and observability all ship in the
   product but had no marketing presence at all. Each card carries a small
   illustrated scene of its source — a doc with topic chips, a data table,
   a live sheet, an audit log — that assembles on reveal. */
const sc = (c: string) => ({ "--sc": c } as React.CSSProperties);

export function SourcesBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);
  return (
    <Reveal className="srcv" threshold={0.3}>
      {/* knowledge bases : article sheet + topic chips */}
      <div className="src-card" style={sc("#0077EE")}>
        <span className="srcv-vis" aria-hidden="true">
          <span className="sv-sheet">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="sv-chip c1">{p(["أسئلة شائعة", "FAQs"])}</span>
          <span className="sv-chip c2">{p(["سياسات", "Policies"])}</span>
          <span className="sv-chip c3">{p(["مستندات", "Docs"])}</span>
          <span className="sv-pill">
            <Icon name="book" width={2.2} />
            {p(["يقرأها وكيلك", "Read by your agent"])}
          </span>
        </span>
        <span className="src-k">{t("src_kb")}</span>
        <span className="src-s">{t("src_kb_s")}</span>
      </div>

      {/* custom tables : header + rows, one hit highlighted */}
      <div className="src-card" style={sc("#7C5CFF")}>
        <span className="srcv-vis" aria-hidden="true">
          <span className="sv-table">
            <span className="sv-th">
              <i />
              <i />
              <i />
            </span>
            <span className="sv-tr">
              <i />
              <i />
              <i />
            </span>
            <span className="sv-tr hl">
              <i />
              <i />
              <i />
            </span>
            <span className="sv-tr">
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className="sv-pill">
            <Icon name="search" width={2.2} />
            {p(["منتجات، حجوزات، أسعار", "Products, bookings, prices"])}
          </span>
        </span>
        <span className="src-k">{t("src_tbl")}</span>
        <span className="src-s">{t("src_tbl_s")}</span>
      </div>

      {/* Google Sheets : green-headed grid, live badge */}
      <div className="src-card" style={sc("#0F9D58")}>
        <span className="srcv-vis" aria-hidden="true">
          <span className="sv-table">
            <span className="sv-th">
              <i />
              <i />
              <i />
            </span>
            <span className="sv-tr">
              <i />
              <i />
              <i />
            </span>
            <span className="sv-tr">
              <i />
              <i />
              <i />
            </span>
            <span className="sv-tr hl">
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className="sv-chip c1 live">
            <i className="sv-dot" />
            {p(["مباشر", "Live"])}
          </span>
          <span className="sv-pill">
            <Icon name="sheet" width={2.2} />
            {p(["يتحدّث من جدولك", "Synced from your sheet"])}
          </span>
        </span>
        <span className="src-k">{t("src_sheet")}</span>
        <span className="src-s">{t("src_sheet_s")}</span>
      </div>

      {/* observability : audit log of what the agent read */}
      <div className="src-card" style={sc("#D97706")}>
        <span className="srcv-vis" aria-hidden="true">
          <span className="sv-log">
            <span className="sv-li ok">
              <Icon name="check" width={3} />
              <i />
            </span>
            <span className="sv-li ok">
              <Icon name="check" width={3} />
              <i />
            </span>
            <span className="sv-li warn">
              <Icon name="info" width={2.4} />
              <i />
            </span>
          </span>
          <span className="sv-pill">
            <Icon name="eye" width={2.2} />
            {p(["ما قرأه الوكيل", "What the agent read"])}
          </span>
        </span>
        <span className="src-k">{t("src_obs")}</span>
        <span className="src-s">{t("src_obs_s")}</span>
      </div>
    </Reveal>
  );
}

/* ---------- voice calling ----------
   Real and substantial — LiveKit-backed, with a call centre, recording and
   analytics — but sits behind the beta_voice_calls flag, so it is presented
   as beta rather than generally available. */
const VOICE: [IconName, DictKey, DictKey][] = [
  ["voice", "vo_1", "vo_1s"],
  ["inbox", "vo_2", "vo_2s"],
  ["chart", "vo_3", "vo_3s"],
  ["spark", "vo_4", "vo_4s"],
];

export function VoiceBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);
  return (
    /* .vz choreographs the reveal: the phone starts centred and ringing
       (incoming-call overlay, buzz), the call is "answered" ~1.5s in —
       overlay fades to the in-call screen, the phone eases to its column,
       and the copy staggers out from the middle. CSS-only timeline. */
    <div className="orb-two vz rv">
      <div className="orb-copy stack g4">
        <span className="badge badge-glass" style={{ alignSelf: "flex-start" }}>
          <i />
          {t("vo_badge")}
        </span>
        <h2 className="t-h1">{t("vo_h")}</h2>
        <p className="t-lead">{t("vo_sub")}</p>

        {/* the four call-centre facts, as a compact checklist under the copy */}
        <div className="vo-list">
          {VOICE.map(([icon, k, s]) => (
            <div className="vo-li" key={k}>
              <span className="ico ico-sm ico-tint">
                <Icon name={icon} width={1.8} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <span className="vo-k">{t(k)}</span>
                <span className="vo-s">{t(s)}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="cta-row" style={{ justifyContent: "flex-start" }}>
          <Link className="btn btn-w" href={href(locale, "contact")}>
            {t("dm_qr_cta")}
            <Arrow />
          </Link>
        </div>
      </div>

      {/* An in-call screen — the section is about answering CALLS, so the
          phone shows one: pulsing avatar, live timer, the agent speaking
          (waveform), a live transcript, and real call controls including
          the escalation the product actually offers. */}
      <div className="vphone" aria-hidden="true">
        <div className="vcall">
          {/* incoming-call face; fades away at the answer moment */}
          <span className="vc-inc">
            <span className="vc-inc-t">{p(["مكالمة واردة", "Incoming call"])}</span>
            <span className="vc-inc-av">ن</span>
            <span className="vc-inc-n">{p(["نورة السالم", "Noura AlSalem"])}</span>
            <span className="vc-inc-num num">+966 50 000 0000</span>
            <span className="vc-inc-btns">
              <span className="vc-btn end">
                <Icon name="phone" width={2} />
              </span>
              <span className="vc-btn answer">
                <Icon name="phone" width={2} />
              </span>
            </span>
          </span>
          <span className="vc-chip">
            <Icon name="spark" width={2.2} />
            {t("vc_status")}
          </span>

          <span className="vc-avwrap">
            <span className="vc-pulse" />
            <span className="vc-pulse p2" />
            <span className="vc-av">
              <Icon name="store" width={1.6} />
            </span>
          </span>
          <span className="vc-name">{t("vc_name")}</span>
          <span className="vc-dur num">00:42</span>

          <span className="vc-wave">
            {[8, 14, 10, 18, 12, 20, 9, 16, 11, 19, 8, 13].map((h, i) => (
              <i key={i} style={{ height: h, animationDelay: `${i * 0.1}s` }} />
            ))}
          </span>

          <span className="vc-cap">
            <span className="vc-cap-l">
              <Icon name="spark" width={2.2} />
              {t("vc_cap_l")}
            </span>
            {t("va_reply")}
          </span>

          <span className="vc-esc">
            <Icon name="team" width={2} />
            {t("vc_esc")}
          </span>

          <span className="vc-ctrl">
            <span className="vc-btn">
              <Icon name="mic" width={2} />
            </span>
            <span className="vc-btn">
              <Icon name="voice" width={2} />
            </span>
            <span className="vc-btn end">
              <Icon name="phone" width={2} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}