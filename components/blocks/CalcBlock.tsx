"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "@/components/Icon";
import type { DictKey } from "@/lib/dictionary";
import { getT, href, type Locale } from "@/lib/i18n";

const DEFAULTS = { conv: 1500, sal: 4500, min: 6, rate: 70 };

/** Always en-US grouping: the site uses Western numerals throughout, never
 *  Arabic-Indic digits, so the locale must not switch the numeral system. */
const nfmt = (n: number) => Math.round(n).toLocaleString("en-US");

const WORKING_HOURS_PER_MONTH = 176; // 22 days x 8 hours

type FieldProps = {
  id: keyof typeof DEFAULTS;
  label: DictKey;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  onChange: (v: number) => void;
  t: ReturnType<typeof getT>;
};

function Field({
  id,
  label,
  min,
  max,
  step,
  value,
  unit,
  onChange,
  t,
}: FieldProps) {
  return (
    <div className="calc-f">
      <span className="calc-lab">
        <span>{t(label)}</span>
        <span className="calc-val">
          {nfmt(value)}
          {unit ? ` ${unit}` : ""}
        </span>
      </span>
      <input
        className="rng"
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={t(label)}
        onChange={(e) => onChange(+e.target.value)}
        suppressHydrationWarning
      />
    </div>
  );
}

export function CalcBlock({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [v, setV] = useState(DEFAULTS);
  const set = (k: keyof typeof DEFAULTS) => (n: number) =>
    setV((prev) => ({ ...prev, [k]: n }));

  const auto = (v.conv * v.rate) / 100;
  const hours = (auto * v.min) / 60;
  const hourly = v.sal / WORKING_HOURS_PER_MONTH;
  const save = hours * hourly;

  return (
    <div className="surface calc rv">
      <div className="calc-in">
        <Field id="conv" label="calc_conv" min={100} max={20000} step={100}
               value={v.conv} onChange={set("conv")} t={t} />
        <Field id="sal" label="calc_sal" min={2000} max={15000} step={250}
               value={v.sal} unit={t("calc_sar")} onChange={set("sal")} t={t} />
        <Field id="min" label="calc_min" min={1} max={20} step={1}
               value={v.min} unit={t("calc_min_u")} onChange={set("min")} t={t} />
        <Field id="rate" label="calc_rate" min={20} max={90} step={5}
               value={v.rate} unit="%" onChange={set("rate")} t={t} />
        <span className="calc-hint">{t("calc_note")}</span>
      </div>

      <div className="calc-out">
        <div className="calc-hero">
          <span className="calc-hero-k">{t("calc_out_k")}</span>
          <span className="calc-hero-v">
            {nfmt(save)}
            <small>{t("calc_sar")}</small>
          </span>
        </div>

        <div className="calc-split">
          <i style={{ width: `${v.rate}%` }} />
        </div>
        <div className="calc-legend">
          <span>
            <i />
            {t("calc_leg_a")}
          </span>
          <span className="dim">
            <i />
            {t("calc_leg_b")}
          </span>
        </div>

        <div className="calc-mini">
          <div className="calc-m">
            <span className="calc-m-k">{t("calc_hours")}</span>
            <span className="calc-m-v">{nfmt(hours)}</span>
          </div>
          <div className="calc-m">
            <span className="calc-m-k">{t("calc_auto")}</span>
            <span className="calc-m-v">{nfmt(auto)}</span>
          </div>
          <div className="calc-m" style={{ gridColumn: "1/-1" }}>
            <span className="calc-m-k">{t("calc_year")}</span>
            <span className="calc-m-v">
              {nfmt(save * 12)} {t("calc_sar")}
            </span>
          </div>
        </div>

        <Link className="btn btn-w" href={href(locale, "contact")}>
          {t("calc_cta")}
          <Arrow />
        </Link>
      </div>
    </div>
  );
}
