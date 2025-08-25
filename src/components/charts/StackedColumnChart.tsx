import { Column } from "@ant-design/plots";
import React from "react";

export interface ChartRow {
  [key: string]: any;
}

interface StackedColumnChartProps {
  config?: any;
  data: ChartRow[];
}

const StackedColumnChart: React.FC<StackedColumnChartProps> = ({
  config,
  data,
}) => {
  // 1) Lấy dữ liệu thô an toàn
  const rawData: ChartRow[] = Array.isArray(data) ? data : [];
  if (rawData.length === 0) {
    const msg = (config && config.noDataMessage) || "No data";
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
        {msg}
      </div>
    );
  }

  // 2) Đọc mapping từ config (xField bắt buộc; yFields/seriesField tuỳ trường hợp)
  const labels: Record<string, string> = (config && config.labels) || {};
  const explicitXKey: string | undefined = config?.xField;
  const explicitYKeys: string[] | undefined = config?.yFields;
  // Hỗ trợ cả seriesField lẫn legendField (alias)
  const explicitSeriesKey: string | undefined =
    config?.seriesField || config?.legendField;

  if (!explicitXKey) {
    const hint = `Thiếu xField trong config. Nhận được: ${JSON.stringify(
      config || {}
    )}`;
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
        <div>Hãy chọn cột trục X (config.xField).</div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#999" }}>{hint}</div>
      </div>
    );
  }

  // 3) Nếu không chỉ định yFields & cũng không có seriesKey (data có thể là WIDE),
  //    suy luận yKeys từ row đầu (loại bỏ cột xField)
  let yKeys = explicitYKeys;
  const firstRow = rawData[0];
  if (!explicitSeriesKey) {
    const candidates = Object.keys(firstRow ?? {}).filter(
      (k) => k !== explicitXKey
    );
    if (!yKeys || yKeys.length === 0) yKeys = candidates;
  }

  if (!explicitSeriesKey && (!yKeys || yKeys.length === 0)) {
    const hint = `xField=${explicitXKey}, yFields=${JSON.stringify(
      yKeys
    )}, seriesField=${String(explicitSeriesKey)}`;
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
        <div>
          Hãy chọn ít nhất 1 cột Y (config.yFields) hoặc cung cấp
          legendField/seriesField cho dạng LONG.
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#999" }}>{hint}</div>
      </div>
    );
  }

  // 4) Helper làm nhãn đẹp từ tên cột
  const prettify = (key: string) => {
    if (!key) return "";
    const spaced = key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ");
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };
  const toNumber = (v: any) =>
    Number.isFinite(v) ? (v as number) : Number(v) || 0;

  // 5) TRANSFORM: đưa về { category, series, value } — hỗ trợ LONG & WIDE
  const transformed = rawData.flatMap((row) => {
    const catRaw = row[explicitXKey];
    const category =
      catRaw == null
        ? ""
        : Array.isArray(catRaw)
        ? catRaw.join(",")
        : typeof catRaw === "object"
        ? String(catRaw)
        : String(catRaw);

    // LONG: có seriesKey trong row
    if (explicitSeriesKey && row[explicitSeriesKey] !== undefined) {
      const valField = yKeys?.[0]; // lấy yField đầu tiên
      const value = toNumber(valField ? row[valField] : undefined); // undefined → 0
      const series =
        row[explicitSeriesKey] != null ? String(row[explicitSeriesKey]) : "";
      return [{ category, series, value }];
    }

    // WIDE: mỗi yKey là một series
    return (yKeys || []).map((yk) => {
      const value = toNumber(row[yk]);
      const series = labels[yk] || prettify(yk);
      return { category, series, value };
    });
  });

  // 6) NORMALIZE: bù mọi (category, series) bị thiếu = 0
  const categories = Array.from(new Set(transformed.map((d) => d.category)));
  const seriesNames = Array.from(new Set(transformed.map((d) => d.series)));
  const normalized: any[] = [];
  for (const c of categories) {
    for (const s of seriesNames) {
      const found = transformed.find((r) => r.category === c && r.series === s);
      normalized.push(found ?? { category: c, series: s, value: 0 });
    }
  }

  // 7) Cấu hình cuối cùng cho Column – ép stack, vô hiệu hoá group/dodge
  const plotConfig: any = {
    data: normalized,
    xField: "category",
    yField: "value",
    colorField: "series",
    stack: true, // ⬅️ ép chồng
    autoFit: true,
    legend: config?.legend || { position: "top" },
    xAxis: config?.xAxis,
    yAxis: config?.yAxis,
    tooltip: config?.tooltip || {
      formatter: (d: any) => ({ name: d.series, value: d.value }),
    },
  };

  // Xoá prop “nhóm” nếu lỡ merge từ ngoài (tránh xung đột với stack)
  (["isGroup", "group", "groupField", "grouped", "adjust"] as const).forEach(
    (p) => {
      if (p in plotConfig) delete (plotConfig as any)[p];
    }
  );

  return <Column {...plotConfig} />;
};

export default StackedColumnChart;
