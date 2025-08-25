import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface LineChartProps {
  config?: any;
  data: any[];
}

const PALETTE = [
  "#0078D4",
  "#00BCF2",
  "#34C759",
  "#F6BD16",
  "#8A2BE2",
  "#FF7A45",
  "#1E9493",
  "#B37FEB",
  "#5CDBD3",
];

export const LineChart: React.FC<LineChartProps> = ({ config, data }) => {
  const cfg = config ?? {};
  const xKey: string | undefined = cfg.xField;

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

  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsLineChart
        data={normalized}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            name={cfg.labels?.[key] ?? key}
            stroke={PALETTE[idx % PALETTE.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
