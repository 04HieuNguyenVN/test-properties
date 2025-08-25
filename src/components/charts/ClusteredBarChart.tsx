import React, { useMemo } from "react";
import { Bar as AntPlotBar } from "@ant-design/plots";

/**
 * ClusteredBarChart (Bar NHÓM / Grouped)
 * - Hỗ trợ LONG (xField + legendField/seriesField + valueField) & WIDE (xField + yFields[])
 * - Tối ưu hiển thị khi có legend (group): tăng độ dày hàng và giảm khoảng trống danh mục.
 * - Có thể override qua config:
 *    • config.barHeight: number (độ dày mỗi thanh/hàng, px)
 *    • config.bandPadding: number (0 → 1) khoảng cách giữa các danh mục (band scale padding)
 *    • config.direction: 'horizontal' | 'vertical' (mặc định: vertical như demo AntV)
 */
interface ClusteredBarChartProps {
  config?: any;
  data: any[];
}

const prettify = (key: string) =>
  key
    ? key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]/g, " ")
        .replace(/^./, (c) => c.toUpperCase())
    : "";

const toNumber = (v: any) =>
  (Number.isFinite(v) ? (v as number) : Number(v ?? 0)) || 0;

export const ClusteredBarChart: React.FC<ClusteredBarChartProps> = ({
  config,
  data,
}) => {
  const cfg = config ?? {};
  const direction: "vertical" | "horizontal" =
    cfg.direction === "horizontal" ? "horizontal" : "vertical";

  // ---- Mapping từ config (không hard-code) ----
  const xKey: string | undefined = cfg.xField; // danh mục (label)
  let yKeys: string[] | undefined = cfg.yFields; // WIDE
  const seriesKey: string | undefined = cfg.seriesField ?? cfg.legendField; // LONG
  const valueKey: string | undefined = cfg.valueField; // LONG
  const labels: Record<string, string> = cfg.labels ?? {};

  const raw: any[] = Array.isArray(data) ? data : [];
  if (raw.length === 0)
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
        No data
      </div>
    );
  if (!xKey && !(seriesKey && valueKey)) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
        Thiếu cấu hình dữ liệu. Cần tối thiểu:
        <div style={{ fontSize: 12, color: "#999", marginTop: 6 }}>
          • LONG: xField + (legendField/seriesField) + valueField
          <br />• hoặc WIDE: xField + yFields[]
        </div>
      </div>
    );
  }

  // ---- 1) Chuẩn hoá về { category, type, value } ----
  const transformed = useMemo(() => {
    if (seriesKey && valueKey) {
      // LONG
      return raw.map((r) => ({
        category: String(r?.[xKey as string] ?? ""),
        type: String(r?.[seriesKey] ?? ""),
        value: toNumber(r?.[valueKey]),
      }));
    }
    // WIDE
    if (!yKeys || yKeys.length === 0) {
      const first = raw[0] ?? {};
      yKeys = Object.keys(first).filter((k) => k !== xKey);
    }
    return raw.flatMap((r) => {
      const category = String(r?.[xKey as string] ?? "");
      return (yKeys as string[]).map((yk) => ({
        category,
        type: labels[yk] ?? prettify(yk),
        value: toNumber(r?.[yk]),
      }));
    });
  }, [raw, xKey, yKeys, seriesKey, valueKey, labels]);

  // ---- 2) Bù đủ (category, type) → tránh mất class khi bật legend ----
  const categories = Array.from(new Set(transformed.map((d) => d.category)));
  const seriesNames = Array.from(new Set(transformed.map((d) => d.type)));
  const normalized: any[] = [];
  for (const c of categories) {
    for (const s of seriesNames) {
      const found = transformed.find((r) => r.category === c && r.type === s);
      normalized.push(found ?? { category: c, type: s, value: 0 });
    }
  }

  // ---- 3) Tối ưu kích thước & khoảng trống (dày hơn, ít khoảng trống hơn) ----
  const groupCount = Math.max(1, seriesNames.length);
  const categoryCount = Math.max(1, categories.length);

  // a) Độ dày mỗi thanh (px) – MẶC ĐỊNH LỚN HƠN: 22~30 tuỳ số series
  const autoBarHeight = Math.max(
    22,
    Math.min(30, 28 - Math.max(0, groupCount - 2) * 2)
  );
  const barHeight = Number.isFinite(cfg.barHeight)
    ? cfg.barHeight
    : autoBarHeight;

  // b) Band padding (khoảng trống giữa CÁC DANH MỤC) – MẶC ĐỊNH NHỎ HƠN
  //    Ít danh mục → để ~0.10; nhiều danh mục → xuống 0.06 ~ 0.08
  const autoBandPadding =
    categoryCount >= 24 ? 0.06 : categoryCount >= 16 ? 0.08 : 0.1;
  const bandPadding =
    typeof cfg.bandPadding === "number" ? cfg.bandPadding : autoBandPadding;

  // axis fields theo chiều vẽ
  const axisFields =
    direction === "horizontal"
      ? { xField: "value", yField: "category" }
      : { xField: "category", yField: "value" };

  // padding áp theo trục danh mục
  const scalePaddingKey = direction === "horizontal" ? "y" : "x";

  const plotConfig: any = {
    data: normalized,
    ...axisFields,
    colorField: "type",
    group: true,
    // ⬇️ GIẢM KHOẢNG TRỐNG DANH MỤC
    scale: {
      ...(cfg.scale || {}),
      [scalePaddingKey]: {
        ...(cfg.scale?.[scalePaddingKey] || {}),
        padding: bandPadding,
      },
    },
    // ⬆️ TĂNG ĐỘ DÀY HÀNG
    style: { ...(cfg.style || {}), height: cfg.style?.height ?? barHeight },
    axis: cfg.axis,
    legend: cfg.legend ?? { position: "top" },
    tooltip:
      cfg.tooltip ??
      ({
        formatter: (d: any) => ({ name: d.type, value: d.value }),
      } as any),
    autoFit: true,
  };

  // Không chồng trong biểu đồ nhóm
  (["stack", "isStack", "stackField", "adjust"] as const).forEach((p) => {
    if (p in plotConfig) delete (plotConfig as any)[p];
  });

  return <AntPlotBar {...plotConfig} />;
};
