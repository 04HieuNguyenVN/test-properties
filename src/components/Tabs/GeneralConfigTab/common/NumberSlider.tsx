import React from "react";
import { InputNumber, Slider } from "antd";
import { useTranslation } from "react-i18next";

export default function NumberSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  asPercent = false,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  asPercent?: boolean;
}) {
  const { t } = useTranslation("generalTab");
  return (
    <div className="transparency-control">
      <InputNumber
        size="small"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(v) =>
          onChange((typeof v === "number" ? v : value) as number)
        }
        style={{ width: 60 }}
        {...(asPercent
          ? {
              formatter: (val) => `${val}%`,
              parser: (val) => Number(String(val).replace("%", "")),
              placeholder: t("percentPlaceholder", "%"),
            }
          : { placeholder: t("numberPlaceholder", "0") })}
      />
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(v) => onChange(v as number)}
        style={{ flex: 1, marginLeft: 8 }}
        tooltip={{
          formatter: (val) => (asPercent ? `${val}%` : `${val}`),
        }}
      />
    </div>
  );
}
