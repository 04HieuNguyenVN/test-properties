import React, { useMemo } from "react";
import { Bar as AntPlotBar } from "@ant-design/plots";

/**
 * StackedBarChart (dựa theo ví dụ @ant-design/plots bạn gửi):
 *  - Hỗ trợ 2 dạng dữ liệu:
 *    + WIDE:  xField + yFields[]  (mỗi y là 1 series)
 *    + LONG:  xField + legendField/seriesField + valueField
 *  - Luôn chuẩn hoá đủ (category, series) để bật legend không mất lớp.
 *  - stack = true (chồng).
 *  - Có sort, axis tương thích ví dụ.
 *
 *  Mặc định vẽ theo "vertical" như snippet (x = danh mục, y = giá trị).
 *  Nếu muốn BAR NGANG, truyền config.direction = 'horizontal'
 *  => khi đó x = value, y = category.
 */
export interface StackedBarChartProps {
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

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  config,
  data,
}) => {
  const cfg = config ?? {};
  const direction: "vertical" | "horizontal" =
    cfg.direction === "horizontal" ? "horizontal" : "vertical";

  // Mapping từ config
  const xKey: string | undefined = cfg.xField; // danh mục
  let yKeys: string[] | undefined = cfg.yFields; // WIDE
  const seriesKey: string | undefined = cfg.seriesField ?? cfg.legendField; // LONG
  const valueKey: string | undefined = cfg.valueField; // LONG
  const labels: Record<string, string> = cfg.labels ?? {};

  // Bảo vệ an toàn dữ liệu
  const raw: any[] = Array.isArray(data) ? data : [];
  if (raw.length === 0) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
        No data
      </div>
    );
  }
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

  // 1) Chuyển mọi thứ về { category, series, value }
  const transformed = useMemo(() => {
    // Dạng LONG
    if (seriesKey && valueKey) {
      return raw.map((r) => ({
        category: String(r?.[xKey as string] ?? ""),
        series: String(r?.[seriesKey] ?? ""),
        value: toNumber(r?.[valueKey]),
      }));
    }
    // Dạng WIDE
    if (!yKeys || yKeys.length === 0) {
      const first = raw[0] ?? {};
      yKeys = Object.keys(first).filter((k) => k !== xKey);
    }
    return raw.flatMap((r) => {
      const category = String(r?.[xKey as string] ?? "");
      return (yKeys as string[]).map((yk) => ({
        category,
        series: labels[yk] ?? prettify(yk),
        value: toNumber(r?.[yk]),
      }));
    });
  }, [raw, xKey, yKeys, seriesKey, valueKey, labels]);

  // 2) Chuẩn hoá đủ mọi cặp (category, series)
  const categories = Array.from(new Set(transformed.map((d) => d.category)));
  const seriesNames = Array.from(new Set(transformed.map((d) => d.series)));
  const normalized: any[] = [];
  for (const c of categories) {
    for (const s of seriesNames) {
      const found = transformed.find((r) => r.category === c && r.series === s);
      normalized.push(found ?? { category: c, series: s, value: 0 });
    }
  }

  // 3) Lập cấu hình Bar theo ví dụ (stack + sort + axis)
  // - Theo snippet mẫu: x = danh mục, y = giá trị (vertical bar).
  // - Nếu muốn bar ngang: đảo trục khi direction === 'horizontal'.
  const fields =
    direction === "horizontal"
      ? { xField: "value", yField: "category" }
      : { xField: "category", yField: "value" };

  const plotConfig: any = {
    data: normalized,
    ...fields,
    colorField: "series",
    stack: true,
    // sort & axis giống ví dụ, cho phép override từ config
    sort: cfg.sort ?? { reverse: true, by: "y" },
    axis:
      cfg.axis ??
      ({
        y: { labelFormatter: "~s" },
        x: {
          labelSpacing: 4,
          style: { labelTransform: "rotate(90)" },
        },
      } as any),
    legend: cfg.legend ?? { position: "top" },
    tooltip:
      cfg.tooltip ??
      ({
        formatter: (d: any) => ({
          name: d.series,
          value: d.value,
        }),
      } as any),
    autoFit: true,
  };

  return <AntPlotBar {...plotConfig} />;
};

export default StackedBarChart;
