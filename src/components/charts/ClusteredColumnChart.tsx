import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ClusteredColumnChartProps {
  config?: any;
  data: any[];
}

/** Bảng màu mặc định */
const PALETTE = [
  "#5B8FF9",
  "#61DDAA",
  "#65789B",
  "#F6BD16",
  "#7262FD",
  "#78D3F8",
  "#9661BC",
  "#F6903D",
  "#1E9493",
];

export const ClusteredColumnChart: React.FC<ClusteredColumnChartProps> = ({
  config,
  data,
}) => {
  const cfg = config ?? {};
  const xKey: string | undefined = cfg.xField;

  // Suy luận danh sách yKeys (series)
  const yKeys: string[] = useMemo(() => {
    if (Array.isArray(cfg.yFields) && cfg.yFields.length) return cfg.yFields;
    if (!Array.isArray(data) || data.length === 0 || !xKey) return [];
    const set = new Set<string>();
    (data as any[]).forEach((row) => {
      Object.keys(row ?? {}).forEach((k) => {
        if (k !== xKey) set.add(k);
      });
    });
    return Array.from(set);
  }, [cfg.yFields, data, xKey]);

  // Chuẩn hoá số
  const normalized = useMemo(() => {
    if (!Array.isArray(data) || !xKey) return [];
    return (data as any[]).map((row) => {
      const out: any = { ...row };
      yKeys.forEach((k) => {
        const v = out[k];
        out[k] = Number.isFinite(v) ? v : Number(v ?? 0) || 0;
      });
      return out;
    });
  }, [data, yKeys, xKey]);

  if (!xKey || yKeys.length === 0) {
    return (
      <div style={{ padding: 20, color: "#666", textAlign: "center" }}>
        Hãy chọn xField và yFields trong DataTab.
      </div>
    );
  }

  // ==== DENSE LAYOUT: làm dày cột & giảm khoảng trống ====
  const seriesCount = yKeys.length;
  const categoryCount = normalized.length;

  // 1) barSize: Độ rộng mỗi cột (px) — MẶC ĐỊNH LỚN HƠN
  const autoBarSize = Math.max(
    24,
    Math.min(64, 44 - Math.max(0, seriesCount - 2) * 6)
  );
  const barSize = Number.isFinite(cfg.barSize) ? cfg.barSize : autoBarSize;

  // 2) barCategoryGap: khoảng cách giữa CÁC NHÓM (theo % bề rộng 1 category) — NHỎ HƠN
  const autoBarCategoryGap =
    categoryCount >= 16 ? "4%" : categoryCount >= 10 ? "6%" : "8%";
  const barCategoryGap = cfg.barCategoryGap ?? autoBarCategoryGap;

  // 3) barGap: khoảng cách giữa cột TRONG CÙNG 1 NHÓM — SÁT HƠN
  const barGap = cfg.barGap ?? (seriesCount >= 4 ? -6 : -2);

  // 4) maxBarSize: trần bề rộng cột (tránh phình to khi data ít)
  const maxBarSize = Number.isFinite(cfg.maxBarSize) ? cfg.maxBarSize : 64;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={normalized}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
      >
        {cfg.gridlines?.enabled && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={cfg.gridlines?.color ?? "#E5E7EB"}
            strokeWidth={cfg.gridlines?.strokeWidth ?? 1}
          />
        )}
        <XAxis
          dataKey={xKey}
          tick={{
            fontSize: cfg.xAxis?.fontSize ?? 12,
            fill: cfg.xAxis?.color ?? "#666",
            fontWeight: cfg.xAxis?.bold ? "bold" : "normal",
          }}
        />
        <YAxis
          tick={{
            fontSize: cfg.yAxis?.fontSize ?? 12,
            fill: cfg.yAxis?.color ?? "#666",
            fontWeight: cfg.yAxis?.bold ? "bold" : "normal",
          }}
        />
        <Tooltip />
        {cfg.legend?.enabled !== false && <Legend />}
        {yKeys.map((key, idx) => (
          <Bar
            key={key}
            dataKey={key}
            name={cfg.labels?.[key] ?? key}
            fill={PALETTE[idx % PALETTE.length]}
            barSize={barSize}
            maxBarSize={maxBarSize}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
