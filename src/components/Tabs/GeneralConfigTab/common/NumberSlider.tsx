import React from "react";
import { InputNumber, Slider } from "antd";

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
            }
          : {})}
      />
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(v) => onChange(v as number)}
        style={{ flex: 1, marginLeft: 8 }}
      />
    </div>
  );
}
