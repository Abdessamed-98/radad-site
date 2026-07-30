import { Icon } from "@/components/Icon";
import type { DictKey } from "@/lib/dictionary";
import { getT, type Locale } from "@/lib/i18n";
import type { IconName } from "@/lib/icons";

/** Avatar tints, indexed the same way the prototype's AV array was. */
export const AV = [
  "#0077EE",
  "#00A3D9",
  "#0F9D58",
  "#D97706",
  "#DC2E5C",
  "#2E93FF",
];

const channelColour = (ch: IconName) =>
  ch === "wa" ? "#0F9D58"
  : ch === "msgr" ? "#0084FF"
  : ch === "mail" ? "#EA6A47"
  : ch === "voice" ? "#7A5CF0"
  : "#229ED9";

/* ---------- unified inbox ----------
   Header shows the connected sources as their REAL brand marks — full logos
   in brand colour, no containing discs, no stacking. Rows keep the app's
   chbadge pattern: a small colour dot pinned to the avatar corner. */
const INBOX: [number, DictKey, DictKey, IconName][] = [
  [0, "c1n", "c1p", "wa"],
  [1, "c2n", "c2p", "mail"],
];

/* Genuine logo paths (WhatsApp/Telegram shared with lib/hub.ts). Email has
   no brand — it gets a solid envelope in its channel colour. */
const WA_D =
  "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.46 6.6 2.02 12.05 2.02c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.09.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.4Z";
const MSGR_D =
  "M12 2C6.48 2 2 6.14 2 11.25c0 2.88 1.42 5.46 3.66 7.15V22l3.35-1.84c.94.26 1.94.4 2.99.4 5.52 0 10-4.14 10-9.31C22 6.14 17.52 2 12 2Zm1.06 12.45-2.56-2.73-4.99 2.73 5.49-5.83 2.62 2.73 4.93-2.73-5.49 5.83Z";
const TG_PLANE =
  "M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42Z";

function BrandGlyph({ ch, size = 18 }: { ch: IconName; size?: number }) {
  const c = channelColour(ch);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
      {ch === "wa" && <path d={WA_D} fill={c} />}
      {ch === "msgr" && <path d={MSGR_D} fill={c} />}
      {ch === "tg" && (
        <>
          <circle cx="12" cy="12" r="11" fill={c} />
          <path d={TG_PLANE} fill="#fff" />
        </>
      )}
      {ch === "mail" && (
        <>
          <rect x="2" y="4.5" width="20" height="15" rx="3" fill={c} />
          <path d="m4.5 7.5 7.5 5.4 7.5-5.4" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

function ChannelDot({ ch, size = 13 }: { ch: IconName; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flex: "none",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        background: channelColour(ch),
        boxShadow: "0 0 0 2px var(--fcui-bg, #fff)",
      }}
    >
      <Icon name={ch} width={3} />
    </span>
  );
}

export function UiInbox({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <>
      <span style={{ display: "flex", alignItems: "center" }}>
        <span className="mmut">{t("win_inbox")}</span>
        <span
          style={{ display: "flex", alignItems: "center", gap: 8, marginInlineStart: "auto" }}
        >
          {(["wa", "msgr", "tg", "mail"] as IconName[]).map((ch) => (
            <BrandGlyph ch={ch} key={ch} />
          ))}
        </span>
      </span>
      {INBOX.map(([i, name, preview, ch]) => (
        <span className="mrow" key={name}>
          <span style={{ position: "relative", flex: "none", display: "flex" }}>
            <span className="mav" style={{ background: AV[i] }}>
              {t(name).charAt(0)}
            </span>
            <span
              style={{
                position: "absolute",
                insetBlockEnd: -3,
                insetInlineEnd: -3,
                display: "flex",
              }}
            >
              <ChannelDot ch={ch} size={13} />
            </span>
          </span>
          <span
            style={{ display: "flex", flexDirection: "column", minWidth: 0 }}
          >
            <span className="mk">{t(name)}</span>
            <span
              className="mmut"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t(preview)}
            </span>
          </span>
        </span>
      ))}
    </>
  );
}

/* ---------- dialect understanding ---------- */
export function UiDialect({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const dialects = t("ui_dialects").split("|");
  return (
    <>
      <span style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {dialects.map((d, i) => (
          <span className={`chip-xs${i === 0 ? " v" : ""}`} key={d}>
            {d}
          </span>
        ))}
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginTop: 2,
        }}
      >
        <span className="mbub them">{t("ui_q")}</span>
        <span className="mbub us">{t("ui_a")}</span>
      </span>
    </>
  );
}

/* ---------- order timeline ---------- */
const TIMELINE: [DictKey, string][] = [
  ["tl1", "ok"],
  ["tl2", "ok"],
  ["tl3", "now"],
  ["tl4", ""],
];

export function UiOrder({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <span className="mtl">
      {TIMELINE.map(([k, state]) => (
        <span className={`mtl-r ${state}`} key={k}>
          <i className="mtl-d" />
          {t(k)}
        </span>
      ))}
    </span>
  );
}

/* ---------- product card ---------- */
export function UiProduct({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <>
      <span className="mrow">
        <span
          style={{
            width: 34,
            height: 40,
            borderRadius: 8,
            background: "var(--surf-brand)",
            flex: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.3)",
          }}
        />
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span className="mk">{t("prod_n")}</span>
          <span className="mmut num">{t("prod_p")}</span>
        </span>
        <span className="chip-xs v" style={{ marginInlineStart: "auto" }}>
          {t("prod_b")}
        </span>
      </span>
      <span className="mbub us" style={{ alignSelf: "flex-end" }}>
        {t("ui_buy")}
      </span>
    </>
  );
}

/* ---------- abandoned cart recovery ---------- */
export function UiCart({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <>
      <span className="mrow">
        <span className="mav" style={{ background: "var(--amber)" }}>
          <Icon name="cart" width={2.2} />
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span className="mk">{t("ui_cart")}</span>
          <span className="mmut num">
            349 {locale === "ar" ? "ر.س" : "SAR"}
          </span>
        </span>
        <span className="chip-xs a" style={{ marginInlineStart: "auto" }}>
          20m
        </span>
      </span>
      <span className="mrow">
        <span className="mav" style={{ background: "var(--mint)" }}>
          <Icon name="check" width={2.8} />
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span className="mk">{t("ui_cart2")}</span>
          <span className="mmut">WhatsApp</span>
        </span>
        <span className="chip-xs g" style={{ marginInlineStart: "auto" }}>
          {t("ui_recov")}
        </span>
      </span>
    </>
  );
}

/* ---------- analytics ---------- */
const BARS = [34, 52, 28, 68, 44, 86, 60];

export function UiChart({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <>
      <span className="mbars">
        {BARS.map((h, i) => (
          <i key={i} style={{ height: `${h}%` }} className={i === 5 ? "hi" : ""} />
        ))}
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 2,
        }}
      >
        <span className="mmut">{t("rp_status")}:</span>
        <span className="chip-xs v">{t("rp_open")} <span className="num">12</span></span>
        <span className="chip-xs g">{t("rp_closed")} <span className="num">46</span></span>
      </span>
    </>
  );
}

/* ---------- feature cards ---------- */
const FCARDS: {
  t: DictKey;
  d: DictKey;
  ui: (p: { locale: Locale }) => React.ReactNode;
  c?: string;
}[] = [
  { t: "fc1_t", d: "fc1_d", ui: UiInbox, c: "fc-c fc-v" },
  { t: "fc2_t", d: "fc2_d", ui: UiDialect, c: "fc-sky" },
  { t: "fc3_t", d: "fc3_d", ui: UiOrder },
  { t: "fc4_t", d: "fc4_d", ui: UiProduct, c: "fc-c fc-b" },
  { t: "fc5_t", d: "fc5_d", ui: UiCart, c: "fc-mint" },
  { t: "fc6_t", d: "fc6_d", ui: UiChart, c: "fc-lav" },
];

export function FeatCards({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="grid3 featgrid">
      {FCARDS.map((c, i) => {
        const Ui = c.ui;
        return (
          <article
            className={`surface lift fc ${c.c || ""} rv d${(i % 3) + 1}`}
            key={c.t}
          >
            <h3 className="t-h3">{t(c.t)}</h3>
            <p className="t-body">{t(c.d)}</p>
            <div className="fc-ui">
              <Ui locale={locale} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
