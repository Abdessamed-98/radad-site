"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { SYM_PARTS } from "@/lib/logo";
import { getP, type Locale } from "@/lib/i18n";
import { Icon } from "@/components/Icon";
import { Logo3D } from "@/components/Logo3D";

/* ------------------------------------------------------------------ */
/* Copy — inline [ar, en] pairs, same convention as getP()             */
/* ------------------------------------------------------------------ */

const S = {
  open: ["افتح المحادثة مع مساعد رداد", "Chat with the Radad assistant"],
  close: ["إغلاق المحادثة", "Close chat"],
  title: ["مساعد رداد", "Radad Assistant"],
  online: ["متصل الآن", "Online now"],
  greeting: [
    "مرحباً! 👋 أنا مساعد رداد. كيف يمكنني مساعدتك اليوم؟",
    "Hi there! 👋 I'm the Radad assistant. How can I help you today?",
  ],
  placeholder: ["اكتب رسالتك…", "Type your message…"],
  send: ["إرسال", "Send"],
} as const;

const REPLIES = [
  [
    "شكراً لرسالتك! سيتواصل معك فريقنا قريباً، ويمكنك أيضاً مراسلتنا من صفحة التواصل.",
    "Thanks for your message! Our team will get back to you soon — you can also reach us from the contact page.",
  ],
  [
    "يمكنك استكشاف كل ما تقدمه رداد من صفحة المزايا، أو الاطلاع على خطط الأسعار.",
    "You can explore everything Radad offers on the features page, or take a look at our pricing plans.",
  ],
  [
    "سؤال جيد! تواصل معنا عبر صفحة التواصل وسنرد عليك بأسرع وقت ممكن.",
    "Good question! Reach out via the contact page and we'll reply as fast as we can.",
  ],
] as const;

type Msg = { from: "bot" | "user"; text: string };

/* ------------------------------------------------------------------ */

export function ChatAssistant({ locale }: { locale: Locale }) {
  const p = useMemo(() => getP(locale), [locale]);

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greeted = useRef(false);
  const replyAt = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* Open: focus the input, close on Escape, greet on the first open. */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    if (!greeted.current) {
      greeted.current = true;
      setTyping(true);
      timers.current.push(
        setTimeout(() => {
          setTyping(false);
          setMsgs([{ from: "bot", text: p(S.greeting) }]);
        }, 750)
      );
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, p]);

  /* Keep the newest message in view. */
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setDraft("");
    setTyping(true);
    timers.current.push(
      setTimeout(() => {
        setTyping(false);
        const reply = REPLIES[replyAt.current % REPLIES.length];
        replyAt.current += 1;
        setMsgs((m) => [...m, { from: "bot", text: p(reply) }]);
      }, 950)
    );
  };

  return (
    <div className="rda-root">
      {open && (
        <div className="rda-panel" role="dialog" aria-label={p(S.title)}>
          <header className="rda-head">
            <svg
              className="rda-mini"
              viewBox="0 0 36 40"
              fill="none"
              aria-hidden="true"
            >
              <path d={SYM_PARTS.bubble} fill="#0077EE" />
              <path d={SYM_PARTS.band} fill="#052659" />
              <path d={SYM_PARTS.face} fill="#fff" />
              <path d={SYM_PARTS.eyeL} fill="#052659" />
              <path d={SYM_PARTS.eyeR} fill="#052659" />
              <path d={SYM_PARTS.smile} fill="#052659" />
            </svg>
            <div className="rda-head-t">
              <strong>{p(S.title)}</strong>
              <span className="rda-status">
                <i />
                {p(S.online)}
              </span>
            </div>
            <button
              type="button"
              className="rda-x"
              aria-label={p(S.close)}
              onClick={() => setOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="rda-msgs" ref={msgsRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`rda-msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="rda-msg bot rda-typing" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>

          <form className="rda-inrow" onSubmit={send}>
            <input
              ref={inputRef}
              className="rda-field"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={p(S.placeholder)}
              maxLength={500}
            />
            <button
              type="submit"
              className="rda-send"
              aria-label={p(S.send)}
              disabled={!draft.trim()}
            >
              <Icon name="send" width={2} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="rda-bot"
        aria-label={p(S.open)}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="rda-ground" aria-hidden="true" />
        <span className="rda-bob">
          <Logo3D />
        </span>
      </button>
    </div>
  );
}
