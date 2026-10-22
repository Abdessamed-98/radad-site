"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import qrcode from "qrcode-generator";
import { Icon } from "@/components/Icon";
import { DIA, MATCH, type DemoQ } from "@/lib/demo";
import { getP, getT, type Locale } from "@/lib/i18n";

/* The demo section in three states:
 *
 *   idle — one hero input (text or voice only, no attachments) over a brand
 *          gradient glass panel, then «أو», then a WhatsApp button.
 *   chat — sending anything morphs the panel into the full scripted demo
 *          (dialect tabs, suggested questions, thread) with the message
 *          already answered. The mic sends a mock voice note instead.
 *   qr   — the WhatsApp button flips the panel to a scannable QR code.
 *          The code is REAL (qrcode-generator) but deliberately encodes
 *          atheerxai.com and says so — no fake wa.me number.
 */

const QR_TARGET = "https://atheerxai.com";

function QrSvg() {
  /* deterministic — same modules server- and client-side, no hydration risk */
  const d = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(QR_TARGET);
    qr.make();
    const n = qr.getModuleCount();
    let path = "";
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`;
    return { path, n };
  }, []);
  return (
    <svg
      className="dq-code"
      viewBox={`0 0 ${d.n} ${d.n}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={QR_TARGET}
    >
      <path d={d.path} fill="currentColor" />
    </svg>
  );
}

type Turn =
  | { role: "them"; text: string }
  | { role: "them-voice"; secs: number }
  | { role: "typing" }
  | { role: "us"; text: string; icon: "spark" | "info" };

type Mode = "idle" | "chat" | "qr";

export function DemoBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getP(locale);

  const [mode, setMode] = useState<Mode>("idle");
  const [heroDraft, setHeroDraft] = useState("");
  const [tab, setTab] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const later = (fn: () => void, ms: number) =>
    timers.current.push(setTimeout(fn, reduced() ? 0 : ms));

  /** Scripted question — typing beat, then the authored reply. */
  function ask(pair: DemoQ, typed?: string) {
    clear();
    setTurns([{ role: "them", text: typed || p(pair.q) }]);
    later(() => setTurns((v) => [...v, { role: "typing" }]), 180);
    later(
      () =>
        setTurns((v) => [
          ...v.filter((x) => x.role !== "typing"),
          { role: "us", text: p(pair.a), icon: "spark" },
        ]),
      1250
    );
  }

  /** Free text — route to the nearest script, else say so plainly. */
  function answer(text: string) {
    const hit = MATCH.find((m) => m.re.test(text));
    if (hit) {
      const d = DIA[hit.d];
      ask(d.qs[Math.min(hit.i, d.qs.length - 1)], text);
    } else {
      clear();
      setTurns([{ role: "them", text }]);
      later(
        () =>
          setTurns((v) => [
            ...v,
            { role: "us", text: t("dm_fallback"), icon: "info" },
          ]),
        500
      );
    }
  }

  /* Ride the expansion: as the box unrolls, glide the page so the chat's
     FINAL position sits centred. scrollHeight reads the natural content
     height even while max-height clamps it, so the destination is known on
     the first frame — the scroll and the grow travel together. */
  const centerChat = () => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const box = wrapRef.current?.querySelector<HTMLElement>(".dbox-solo");
        if (!box) return;
        const h = Math.min(box.scrollHeight, 760);
        const top = box.getBoundingClientRect().top + window.scrollY;
        const target = top + h / 2 - window.innerHeight / 2;
        window.scrollTo({
          top: Math.max(0, target),
          behavior: reduced() ? "auto" : "smooth",
        });
      })
    );
  };

  /* ---- idle-state entries ---- */
  function heroSend(e: React.FormEvent) {
    e.preventDefault();
    const text = heroDraft.trim();
    if (!text) return;
    setMode("chat");
    setHeroDraft("");
    answer(text);
    centerChat();
  }

  function heroVoice() {
    setMode("chat");
    centerChat();
    clear();
    setTurns([{ role: "them-voice", secs: 4 }]);
    later(() => setTurns((v) => [...v, { role: "typing" }]), 300);
    later(
      () =>
        setTurns((v) => [
          ...v.filter((x) => x.role !== "typing"),
          { role: "us", text: t("dh_voice_a"), icon: "spark" },
        ]),
      1400
    );
  }

  function backToIdle() {
    clear();
    setTurns([]);
    setMode("idle");
  }

  /* ---- chat form ---- */
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    answer(text);
    setDraft("");
  }

  return (
    <div className="dwrap" ref={wrapRef}>
      {mode === "idle" && (
        <div className="dhero" key="idle">
          {/* slim one-line bar in theme surfaces, wrapped by a rotating
              gradient stroke + a static blurred halo of the same gradient */}
          <form className="dglow" onSubmit={heroSend}>
            <span className="dglow-halo" aria-hidden="true" />
            <div className="dbar">
              <div className="dbar-in">
                <input
                  className="dbar-input"
                  placeholder={t("dh_ph")}
                  value={heroDraft}
                  onChange={(e) => setHeroDraft(e.target.value)}
                  autoComplete="off"
                  suppressHydrationWarning
                />
                {/* voice is the only alternative to text — no attachments */}
                <button
                  type="button"
                  className="dbar-mic"
                  aria-label="voice"
                  onClick={heroVoice}
                >
                  <Icon name="voice" width={2} />
                </button>
                <button
                  type="submit"
                  className="dbar-send"
                  aria-label={t("c_send")}
                  disabled={!heroDraft.trim()}
                >
                  <Icon name="send" width={2.2} />
                </button>
              </div>
            </div>
          </form>

          <div className="dor">
            <i />
            <span>{t("dh_or")}</span>
            <i />
          </div>

          <button type="button" className="dwa" onClick={() => setMode("qr")}>
            <Icon name="wa" width={2} />
            {t("dh_wa")}
          </button>
        </div>
      )}

      {mode === "qr" && (
        <div className="dqr surface" key="qr">
          <span className="badge badge-mint">
            <i />
            {t("dh_qr_t")}
          </span>
          <QrSvg />
          <p className="t-sm" style={{ maxWidth: "30ch", textAlign: "center" }}>
            {t("dh_qr_s")}
          </p>
          <button type="button" className="btn btn-s" onClick={backToIdle}>
            {t("dh_back")}
          </button>
        </div>
      )}

      {mode === "chat" && (
        <div className="surface dbox dbox-solo" key="chat">
          <div className="dtabs">
            <button
              type="button"
              className="dt dt-back"
              onClick={backToIdle}
              aria-label={t("dh_back")}
            >
              <Icon name="arrow" width={2.2} />
            </button>
            {DIA.map((d, i) => (
              <button
                type="button"
                className={`dt${i === tab ? " on" : ""}`}
                key={i}
                onClick={() => {
                  setTab(i);
                  clear();
                  setTurns([]);
                }}
              >
                {p(d.k)}
              </button>
            ))}
          </div>

          <div className="dqs">
            {DIA[tab].qs.map((q, i) => (
              <button type="button" className="dq" key={i} onClick={() => ask(q)}>
                {p(q.q)}
              </button>
            ))}
          </div>

          <div className="dchat">
            {turns.length === 0 ? (
              <span className="dempty">{t("dm_empty")}</span>
            ) : (
              turns.map((turn, i) => {
                if (turn.role === "typing")
                  return (
                    <div className="msg them tmp" key={i}>
                      <span className="typ">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                  );
                if (turn.role === "them-voice")
                  return (
                    <div className="msg them" key={i}>
                      <span className="bub dvn">
                        <Icon name="voice" width={2.2} />
                        <span className="dvn-bars">
                          {[7, 12, 9, 15, 10, 13, 6, 11, 8].map((h, j) => (
                            <i key={j} style={{ height: h }} />
                          ))}
                        </span>
                        <span className="num">0:0{turn.secs}</span>
                      </span>
                    </div>
                  );
                return (
                  <div className={`msg ${turn.role}`} key={i}>
                    <span className="bub">{turn.text}</span>
                    {turn.role === "us" && (
                      <span className="mmeta">
                        <Icon name={turn.icon} width={2} />
                        {t("dm_demo")}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <form className="dform" onSubmit={submit}>
            <input
              className="input"
              placeholder={t("dm_ph")}
              autoComplete="off"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              suppressHydrationWarning
            />
            <button className="dsend" type="submit" aria-label={t("dm_ph")}>
              <Icon name="send" width={2.2} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
