"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import type { DictKey } from "@/lib/dictionary";
import { getT, type Locale } from "@/lib/i18n";
import type { IconName } from "@/lib/icons";

/* A faithful replica of the real dashboard's conversations screen, so the
 * mockup and the product look like the same software.
 *
 * Structure and styling follow resources/views/tenant/conversations.blade.php
 * ("floating cockpit": three separate panels on a soft canvas) and the chat
 * partials; tokens come from resources/css/app.css and live in
 * styles/app-replica.css, scoped under .awin. Labels are verbatim from
 * lang/{ar,en}/chat.php. Only the sample conversation data is invented. */

const channelColour = (ch: IconName) =>
  ch === "wa" ? "#0F9D58"
  : ch === "msgr" ? "#0084FF"
  : ch === "mail" ? "#EA6A47"
  : ch === "voice" ? "#7A5CF0"
  : "#229ED9";

/* ui-avatars-style tints, as the app renders initials when no photo exists */
const AV = ["#2A7BEE", "#7c5cff", "#0fa968", "#e08a00"];

/* ---------- conversation rows ----------
   As in the product, active rows carry no tag; only waiting / ended /
   archived rows are badged (list-conversations.blade.php). */
const CONVOS: {
  av: number; name: DictKey; preview: DictKey; time: DictKey;
  ch: IconName; tag?: DictKey; tagTone?: "danger" | "mute";
  unread?: number; on?: boolean;
}[] = [
  { av: 0, name: "c1n", preview: "c1p", time: "t_now", ch: "wa", on: true },
  { av: 1, name: "c2n", preview: "c2p", time: "t5", ch: "msgr", tag: "cs_waiting", tagTone: "danger" },
  { av: 2, name: "c3n", preview: "c3p", time: "t12", ch: "tg", unread: 2 },
  { av: 3, name: "c4n", preview: "c4p", time: "t1h", ch: "wa", tag: "cs_closed", tagTone: "mute" },
];

/* ---------- scripted thread ----------
   Ends on the product's real escalation: the customer asks for a person and
   the handoff bar appears above the composer, exactly where
   chat-handoff-controls renders it. */
type Step =
  | { kind: "typing" }
  | { kind: "msg"; side: "in" | "out"; body: "m1" | "m2" | "m3" | "m4" | "m5" }
  | { kind: "product" }
  | { kind: "handoff" };

const SEQUENCE: Step[] = [
  { kind: "msg", side: "in", body: "m1" },
  { kind: "typing" },
  { kind: "msg", side: "out", body: "m2" },
  { kind: "msg", side: "in", body: "m3" },
  { kind: "typing" },
  { kind: "msg", side: "out", body: "m4" },
  { kind: "product" },
  { kind: "msg", side: "in", body: "m5" },
  { kind: "handoff" },
];

function Thread({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 0;
    SEQUENCE.forEach((step, i) => {
      at += reduced ? 0 : step.kind === "typing" ? 1150 : 900;
      timers.push(setTimeout(() => setShown(i + 1), at));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const visible = SEQUENCE.slice(0, shown);
  const handoff = visible.some((s) => s.kind === "handoff");

  /* .row pairs each bubble with a small avatar, as the real thread does */
  const InAv = () => (
    <span className="avatar mav" style={{ background: AV[0] }}>
      {t("c1n").charAt(0)}
    </span>
  );
  const OutAv = () => (
    <span
      className="avatar mav"
      style={{ background: "linear-gradient(135deg,#2A7BEE,#7c5cff)" }}
    >
      <Icon name="spark" width={2.4} />
    </span>
  );

  return (
    <>
      <div className="thread-scroll">
        {visible.map((step, i) => {
          if (step.kind === "typing") {
            if (i < visible.length - 1) return null;
            return (
              <div className="row" key={i}>
                <InAv />
                <span className="typ">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            );
          }
          if (step.kind === "handoff") return null;
          if (step.kind === "product") {
            return (
              <div className="row out" key={i}>
                <OutAv />
                <span className="pcard">
                  <span className="pcard-i" />
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span className="pcard-n">{t("prod_n")}</span>
                    <span className="pcard-p num">{t("prod_p")}</span>
                  </span>
                  <span className="tagchip">{t("prod_b")}</span>
                </span>
              </div>
            );
          }
          return (
            <div className={`row${step.side === "out" ? " out" : ""}`} key={i}>
              {step.side === "out" ? <OutAv /> : <InAv />}
              <span className="stack">
                <span className={`bub ${step.side}`}>{t(step.body)}</span>
                {step.body === "m2" && (
                  <span className="meta">
                    <Icon name="spark" width={2} />
                    {t("ai_by")}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {handoff && (
        <div className="hbar">
          <span className="hbar-k">{t("cs_waiting")}</span>
          <span className="btn btn-accent">{t("ho_claim")}</span>
        </div>
      )}
    </>
  );
}

/* ---------- the framed product shot ---------- */
const PILLS: [1 | 2 | 3 | 4, IconName][] = [
  [1, "spark"],
  [2, "wa"],
  [3, "store"],
  [4, "clock"],
];

const RAIL: IconName[] = ["wa", "msgr", "tg"];

export function AppWindow({
  locale,
  pills = false,
}: {
  locale: Locale;
  pills?: boolean;
}) {
  const t = getT(locale);

  /* Assemble-on-scroll. The generic .rv observer fires at 5% visibility,
     which on tall viewports marks the shot before it is meaningfully on
     screen (even under the splash) — so the assembly gets its own
     observer that waits for a real quarter of the window to be visible. */
  const shotRef = useRef<HTMLDivElement>(null);
  const [asm, setAsm] = useState(false);
  useEffect(() => {
    const el = shotRef.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setAsm(true);
      return;
    }
    /* 0.45: on tall viewports the shot already peeks ~30% above the fold
       at load — the assembly should wait for a deliberate scroll. The
       timer is a safety net so a visitor who never scrolls still gets
       the window rather than an empty canvas. */
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAsm(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    const bail = setTimeout(() => setAsm(true), 5000);
    return () => {
      io.disconnect();
      clearTimeout(bail);
    };
  }, []);

  return (
    <div className={`shot rv${asm ? " asm-on" : ""}`} ref={shotRef}>
      {pills &&
        PILLS.map(([n, ic]) => (
          <span className={`fpill fp${n}`} key={n}>
            <Icon name={ic} width={2} />
            {t(`fp${n}` as DictKey)}
          </span>
        ))}

      <div className="win">
        <div className="win-bar">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span className="url" dir="ltr">
            {t("win_url")}
          </span>
        </div>

        {/* the real conversations screen: three floating panels on the
            app canvas */}
        <div className="awin">
          <div className="cx">
            {/* list panel = channel rail + list column */}
            <div className="panel cx-list">
              <div className="ch-rail">
                <span
                  className="ch active"
                  style={{
                    background: "linear-gradient(135deg,#2A7BEE,#7c5cff)",
                    color: "#2A7BEE",
                  }}
                >
                  <Icon name="chat" width={2} />
                  <span className="cnt num">4</span>
                </span>
                <span className="ch-div" />
                {RAIL.map((ch) => (
                  <span
                    className="ch"
                    key={ch}
                    style={{ background: channelColour(ch) }}
                  >
                    <Icon name={ch} width={1.9} />
                  </span>
                ))}
              </div>

              <div className="list-col">
                <div className="ph">
                  <span className="lh-t">{t("win_inbox")}</span>
                  <div className="lh-s">
                    <span className="num">4</span> {t("iw_convs")} ·{" "}
                    <b>
                      <span className="num">2</span> {t("iw_unread")}
                    </b>
                  </div>
                  <div className="input">
                    <Icon name="search" width={2} />
                    {t("iw_search")}
                  </div>
                  <div className="seg">
                    <span className="on">{t("cs_active")}</span>
                    <span>{t("iw_wait_f")}</span>
                    <span>{t("cs_closed")}</span>
                    <span>{t("iw_archived")}</span>
                  </div>
                </div>

                <div className="list-scroll">
                  {CONVOS.map((c) => (
                    <div className={`li${c.on ? " active" : ""}`} key={c.name}>
                      <span className="av">
                        <span
                          className="avatar"
                          style={{ background: AV[c.av] }}
                        >
                          {t(c.name).charAt(0)}
                        </span>
                        <span
                          className="chbadge"
                          style={{ background: channelColour(c.ch) }}
                        >
                          <Icon name={c.ch} width={2.4} />
                        </span>
                      </span>
                      <span className="li-body">
                        <span className="li-row">
                          <span className="li-nm">
                            <span className="li-name">{t(c.name)}</span>
                            {c.tag && (
                              <span className={`tg ${c.tagTone}`}>
                                {t(c.tag)}
                              </span>
                            )}
                          </span>
                          <span className="li-time">{t(c.time)}</span>
                        </span>
                        <span className="li-prev">{t(c.preview)}</span>
                        {c.unread ? (
                          <span className="li-foot">
                            <span className="unread num">{c.unread}</span>
                          </span>
                        ) : null}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* thread panel */}
            <div className="panel cx-thread">
              <div className="ph th">
                <span className="av">
                  <span className="avatar" style={{ background: AV[0] }}>
                    {t("c1n").charAt(0)}
                  </span>
                  <span
                    className="chbadge"
                    style={{ background: channelColour("wa") }}
                  >
                    <Icon name="wa" width={2.4} />
                  </span>
                </span>
                <span style={{ minWidth: 0 }}>
                  <div className="th-name">{t("c1n")}</div>
                  <div className="th-sub num" dir="ltr">
                    +966 50 000 0000
                  </div>
                </span>
                <span className="th-act">
                  <span className="btn btn-ok">
                    <Icon name="check" width={2.5} />
                    {t("iw_complete")}
                  </span>
                  <span className="icon-btn">
                    <Icon name="search" width={2} />
                  </span>
                  <span className="icon-btn">
                    <Icon name="panel" width={2} />
                  </span>
                  <span className="icon-btn">
                    <Icon name="dots3" width={2} />
                  </span>
                </span>
              </div>

              <Thread locale={locale} />

              <div className="composer">
                <span className="cbox">{t("ph_msg")}</span>
                <span className="send">
                  <Icon name="send" width={2.2} />
                </span>
              </div>
            </div>

            {/* context dock */}
            <div className="panel cx-ctx">
              <div className="ph" style={{ padding: "10px 12px" }}>
                <div className="tabs">
                  <span className="info-tab on">{t("pn_tab_info")}</span>
                  <span className="info-tab">{t("pn_tab_summary")}</span>
                </div>
              </div>

              <div className="ctx-scroll">
                <div className="cust">
                  <div className="cust-k">{t("pn_h")}</div>
                  <div className="cust-row">
                    <span className="avatar">{t("c1n").charAt(0)}</span>
                    <span style={{ minWidth: 0 }}>
                      <div className="cust-n">{t("c1n")}</div>
                      <div className="cust-p num" dir="ltr">
                        +966 50 000 0000
                      </div>
                    </span>
                  </div>
                </div>

                <div className="stats">
                  <div>
                    <div className="k">{t("pn_deals")}</div>
                    <div className="v num">3</div>
                  </div>
                  <div>
                    <div className="k">{t("pn_purchases")}</div>
                    <div className="v num">7</div>
                  </div>
                  <div>
                    <div className="k">{t("pn_channels")}</div>
                    <div className="chs">
                      <span style={{ background: channelColour("wa") }}>
                        <Icon name="wa" width={2.4} />
                      </span>
                      <span style={{ background: channelColour("mail") }}>
                        <Icon name="mail" width={2.4} />
                      </span>
                    </div>
                  </div>
                </div>

                <span className="profile-link">{t("iw_profile")}</span>

                <div className="sec-t">
                  {t("iw_assignees")}
                  <Icon name="arrow" width={2} />
                </div>
                <div className="sec-b">
                  <span className="chipp">
                    <span
                      className="avatar"
                      style={{ height: 18, width: 18, borderRadius: 6, background: AV[1], fontSize: 9 }}
                    >
                      {t("c2n").charAt(0)}
                    </span>
                    {t("c2n")}
                  </span>
                </div>

                <div className="sec-t">
                  {t("iw_tags")}
                  <Icon name="arrow" width={2} />
                </div>
                <div className="sec-b">
                  <span className="tagchip accent">{t("pn_vip")}</span>
                </div>

                <div className="sec-t">
                  {t("iw_cdata")}
                  <Icon name="arrow" width={2} />
                </div>
                <div className="sec-b">
                  <span className="kv">
                    <i>{t("iw_phone")}</i>
                    <b className="num" dir="ltr">+966 50 000 0000</b>
                  </span>
                </div>

                <div className="sec-t">
                  <span>
                    {t("iw_notes")} <span className="num">(2)</span>
                  </span>
                  <Icon name="arrow" width={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
