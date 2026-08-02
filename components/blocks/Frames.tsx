import Link from "next/link";
import { Arrow } from "@/components/Icon";
import { BRANDS } from "@/lib/brands";
import type { DictKey } from "@/lib/dictionary";
import { getP, getT, href, type Locale } from "@/lib/i18n";

/* ============================================================
   Half-frame product shots. Each section pairs marketing copy
   with a cropped replica of a REAL product page (same .awin
   token scope as the cockpit shot): the frame is anchored to
   one edge of the viewport and runs off it, the way the app
   itself would sit just out of view. Content, labels and even
   the sample values are verbatim from the product repo —
   tenant/automations/partials/abandoned-cart-form.blade.php
   and livewire/dashboard/stats.blade.php.
   ============================================================ */

const WA = BRANDS.find((b) => b.name === "WhatsApp")!;

/* the product's own inline stroke icons (dashboard stats + journey strip) */
const S = (d: string, w = 2) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} aria-hidden="true">
    <path d={d} />
  </svg>
);
const IC_CHAT = S("M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z");
const IC_MAIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const IC_USERS = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);
const IC_BOT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <rect x="4" y="8" width="16" height="11" rx="3" />
    <path d="M12 8V4M9 13h.01M15 13h.01" />
  </svg>
);
const IC_CART = S("M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3 3h2l2.6 12.4a1 1 0 0 0 1 .6h9.7a1 1 0 0 0 1-.75L21.5 8H6");
const IC_CLOCK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const IC_ARROW = S("M5 12h14M13 6l6 6-6 6", 2);

/* shared copy column: badge → headline → lead → checklist → CTA */
function FrameCopy({
  locale,
  badge,
  h,
  sub,
  items,
  dark,
}: {
  locale: Locale;
  badge: DictKey;
  h: DictKey;
  sub: DictKey;
  items: [DictKey, DictKey][];
  dark?: boolean;
}) {
  const t = getT(locale);
  return (
    <div className="fr-copy stack g4 rv">
      <span className="badge" style={{ alignSelf: "flex-start" }}>
        <i />
        {t(badge)}
      </span>
      <h2 className="t-h1">{t(h)}</h2>
      <p className="t-lead">{t(sub)}</p>
      <div className="vo-list">
        {items.map(([k, s]) => (
          <div className="vo-li" key={k}>
            <span className="fr-dot" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="m5 13 4 4L19 7" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span className="vo-k">{t(k)}</span>
              <span className="vo-s">{t(s)}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="cta-row" style={{ justifyContent: "flex-start" }}>
        <Link className={`btn ${dark ? "btn-w" : "btn-p"}`} href={href(locale, "contact")}>
          {t("cta_start")}
          <Arrow />
        </Link>
      </div>
    </div>
  );
}

/* ---------- automations: the abandoned-cart studio ----------
   Visible half: the journey strip (event → wait → send) and the live
   WhatsApp preview with the product's default message resolved with its
   own sample values. The editor column bleeds off the viewport edge. */
export function AutomationBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);
  return (
    <div className="fr-two">
      <FrameCopy
        locale={locale}
        badge="au_badge"
        h="au_h"
        sub="au_sub"
        items={[
          ["au_1", "au_1s"],
          ["au_2", "au_2s"],
          ["au_3", "au_3s"],
        ]}
      />

      <div className="fscrub fr-crop au rv d1" aria-hidden="true">
        <div className="awin fr-frame au-frame">
          {/* page header: title + description + enabled switch */}
          <div className="au-head">
            <div>
              <p className="au-t">{t("au_f_title")}</p>
              <p className="au-d">{t("au_f_desc")}</p>
            </div>
            <span className="au-switch on" />
          </div>

          {/* journey strip: event → wait → send */}
          <div className="au-journey">
            <div className="jnode">
              <p className="jt">{t("au_j_event")}</p>
              <span className="jic warn">{IC_CART}</span>
              <p className="jk">{t("au_j_cart")}</p>
              <p className="js">{t("au_j_cart_s")}</p>
            </div>
            <span className="jconn">{IC_ARROW}</span>
            <div className="jnode">
              <p className="jt">{t("au_j_wait")}</p>
              <span className="jic mute">{IC_CLOCK}</span>
              <p className="jk num">{t("au_j_wait_v")}</p>
              <p className="js">{t("au_j_wait_s")}</p>
            </div>
            <span className="jconn">{IC_ARROW}</span>
            <div className="jnode send">
              <p className="jt">{t("au_j_send")}</p>
              <span className="jic wa">
                <svg viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: WA.svg }} />
              </span>
              <p className="jk">{t("au_1")}</p>
            </div>
          </div>

          <div className="au-row">
            {/* the money shot: WhatsApp preview, exactly like the studio's aside */}
            <div className="au-side">
              <div className="wa-prev">
                <div className="wa-top">
                  <span className="wa-av">{t("au_wa_store").charAt(0)}</span>
                  <div>
                    <p className="wa-nm">{t("au_wa_store")}</p>
                    <p className="wa-via">{t("au_wa_via")}</p>
                  </div>
                </div>
                <div className="wa-body">
                  <div className="wa-msg">
                    {t("au_wa_msg")}
                    <span className="wa-time num">10:24</span>
                  </div>
                </div>
              </div>
              <p className="wa-note">{t("au_wa_note")}</p>
            </div>

            {/* the editor card — bleeds off-screen, cropped by the viewport */}
            <div className="au-editor">
              <div className="au-f3">
                <div>
                  <p className="au-lbl">{t("au_f_delay")}</p>
                  <span className="au-input num">60</span>
                </div>
                <div>
                  <p className="au-lbl">{t("au_f_rem")}</p>
                  <span className="au-input">
                    {t("au_f_rem_v")}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="au-lbl">{t("au_f_int")}</p>
                  <span className="au-input num">24</span>
                </div>
              </div>
              <p className="au-lbl">{t("au_f_msg")}</p>
              <span className="au-area">
                {p([
                  "مرحباً {customer_name}،\nلاحظنا أنك تركت {items_count} منتجات في سلتك!\nإجمالي السلة: {cart_total} ر.س",
                  "Hello {customer_name},\nWe noticed you left {items_count} items in your cart!\nCart total: {cart_total} SAR",
                ])}
              </span>
              <div className="au-chips">
                {["{customer_name}", "{cart_total}", "{coupon_code}"].map((v) => (
                  <span className="au-chip num" key={v}>
                    + {v}
                  </span>
                ))}
              </div>
              <div className="au-bh">
                <span className="au-lbl" style={{ margin: 0 }}>
                  {t("au_f_bh")}
                </span>
                <span className="au-switch on sm" />
                <span className="au-input num sm">09:00</span>
                <span className="au-input num sm">18:00</span>
              </div>
              <span className="au-save">{t("au_f_save")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- the merchant's morning: tenant dashboard home ----------
   Greeting by name, range picker, and the four sparkline stat cards.
   The frame bleeds off the opposite edge; card order puts conversations
   nearest the visible side (DOM order is free — the shot is decorative). */
const MO_STATS: {
  k: DictKey;
  v: string;
  tone: string;
  icon: React.ReactNode;
  path: string;
  pill?: DictKey;
}[] = [
  /* first child sits deepest into the crop; conversations renders last = most visible */
  {
    k: "mo_s_ag",
    v: "4",
    tone: "ok",
    icon: IC_BOT,
    path: "M0 16 L20 16 L40 16 L60 13 L80 13 L100 8 L120 8",
    pill: "mo_ai_pill",
  },
  {
    k: "mo_s_cust",
    v: "342",
    tone: "warn",
    icon: IC_USERS,
    path: "M0 18 L15 17 L30 19 L45 15 L60 16 L75 12 L90 13 L105 10 L120 9",
  },
  {
    k: "mo_s_msg",
    v: "8,952",
    tone: "violet",
    icon: IC_MAIL,
    path: "M0 14 L15 16 L30 10 L45 12 L60 7 L75 12 L90 6 L105 9 L120 4",
  },
  {
    k: "mo_s_conv",
    v: "1,284",
    tone: "accent",
    icon: IC_CHAT,
    path: "M0 20 L15 18 L30 21 L45 13 L60 15 L75 8 L90 11 L105 5 L120 7",
  },
];

export function MorningBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="fr-two flip">
      <div className="fscrub fr-crop mo rv d1" aria-hidden="true">
        <div className="awin fr-frame mo-frame">
          <div className="mo-head">
            {/* range picker first in DOM = deepest into the crop */}
            <div className="mo-range">
              <span className="on">{t("mo_r_all")}</span>
              <span>{t("mo_r_today")}</span>
              <span className="num">{t("mo_r_7")}</span>
              <span className="num">{t("mo_r_30")}</span>
            </div>
            <div className="mo-greet-w">
              <p className="mo-date">{t("mo_date")}</p>
              <p className="mo-greet">{t("mo_greet")}</p>
              <p className="mo-gs">{t("mo_greet_s")}</p>
            </div>
          </div>

          <div className="mo-stats">
            {MO_STATS.map((s) => (
              <div className={`mo-card ${s.tone}`} key={s.k}>
                <div className="mo-cr">
                  <span className="mo-ic">{s.icon}</span>
                  {s.pill ? <span className="mo-pill num">{t(s.pill)}</span> : null}
                </div>
                <p className="mo-v num">{s.v}</p>
                <p className="mo-k">{t(s.k)}</p>
                <svg className="mo-spark" height="26" viewBox="0 0 120 26" preserveAspectRatio="none">
                  <path d={s.path} fill="none" strokeWidth="2" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FrameCopy
        locale={locale}
        badge="mo_badge"
        h="mo_h"
        sub="mo_sub"
        dark
        items={[
          ["mo_1", "mo_1s"],
          ["mo_2", "mo_2s"],
          ["mo_3", "mo_3s"],
        ]}
      />
    </div>
  );
}
