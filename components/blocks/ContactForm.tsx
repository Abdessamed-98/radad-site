"use client";

import { useState } from "react";
import { Arrow } from "@/components/Icon";
import { Note } from "./Blocks";
import type { DictKey } from "@/lib/dictionary";
import { getT, type Locale } from "@/lib/i18n";

const PLATFORMS = ["Salla", "Zid", "Shopify", "WooCommerce", "—"];

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [sent, setSent] = useState(false);

  const field = (
    id: string,
    label: DictKey,
    type: string,
    extra?: React.InputHTMLAttributes<HTMLInputElement>
  ) => (
    <div className="field" key={id}>
      <label htmlFor={id}>{t(label)}</label>
      {/* RTL/direction browser extensions stamp attributes onto form controls
          before React hydrates; that mismatch is theirs, not ours. */}
      <input className="input" id={id} type={type} {...extra} suppressHydrationWarning />
    </div>
  );

  return (
    <form
      className="surface form rv"
      id="cf"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        // No backend wired yet — this only acknowledges locally.
        setSent(true);
      }}
    >
      {field("fn", "c_name", "text", { autoComplete: "name" })}
      {field("fs", "c_store", "text", { autoComplete: "organization" })}
      {field("fe", "c_email", "email", { autoComplete: "email", dir: "ltr" })}
      {field("fp", "c_phone", "tel", { autoComplete: "tel", dir: "ltr" })}

      <div className="field full">
        <label htmlFor="fpl">{t("c_plat")}</label>
        <select
          className="input"
          id="fpl"
          defaultValue={PLATFORMS[0]}
          suppressHydrationWarning
        >
          {PLATFORMS.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label htmlFor="fm">{t("c_msg")}</label>
        <textarea className="input" id="fm" suppressHydrationWarning />
      </div>

      <div className="field full">
        <button className="btn btn-lg btn-p" type="submit" disabled={sent}>
          {sent
            ? locale === "ar"
              ? "شكراً — وصلتنا رسالتك"
              : "Thanks — message received"
            : t("c_send")}
          {sent ? null : <Arrow />}
        </button>
      </div>

      <div className="field full">
        <Note>{t("c_demo")}</Note>
      </div>
    </form>
  );
}
