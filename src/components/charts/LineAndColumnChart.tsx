import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface LineAndColumnChartProps {
  config?: any;
  data: any[];
}

const BARS = ["#5B8FF9", "#61DDAA", "#65789B", "#F6BD16"];
const LINES = ["#FF7A45", "#9661BC", "#1E9493", "#78D3F8"];

export const LineAndColumnChart: React.FC<LineAndColumnChartProps> = ({
  config,
  data,
}) => {
  const cfg = config ?? {};
  const xKey: string | undefined = cfg.xField;

  const { columnKeys, lineKeys } = useMemo(() => {
    let col = Array.isArray(cfg.columnY) ? cfg.columnY : [];
    let lin = Array.isArray(cfg.lineY) ? cfg.lineY : [];
    if (
      !col.length &&
      !lin.length &&
      Array.isArray(data) &&
      data.length &&
      xKey
    ) {
      const keys = Object.keys(data[0] ?? {}).filter((k) => k !== xKey);
      if (keys.length) {
        col = [keys[0]];
        lin = keys.slice(1);
      }
    }
    return { columnKeys: col, lineKeys: lin };
  }, [cfg.columnY, cfg.lineY, data, xKey]);

  const normalized = useMemo(() => {
    if (!Array.isArray(data) || !xKey) return [];
    const allY = Array.from(new Set([...columnKeys, ...lineKeys]));
    return (data as any[]).map((row) => {
      const out: any = { ...row };
      allY.forEach((k) => {
        const v = out[k];
        out[k] = Number.isFinite(v) ? v : Number(v ?? 0) || 0;
      });
      return out;
    });
  }, [data, xKey, columnKeys, lineKeys]);

  if (!xKey || (!columnKeys.length && !lineKeys.length)) {
    return (
      <div style={{ padding: 20, color: "#666", textAlign: "center" }}>
        Hãy chọn xField và ít nhất một yField cho cột/đường.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart
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
          yAxisId="left"
          tick={{
            fontSize: cfg.yAxis?.fontSize ?? 12,
            fill: cfg.yAxis?.color ?? "#666",
            fontWeight: cfg.yAxis?.bold ? "bold" : "normal",
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{
            fontSize: cfg.yAxis?.fontSize ?? 12,
            fill: cfg.yAxis?.color ?? "#666",
            fontWeight: cfg.yAxis?.bold ? "bold" : "normal",
          }}
        />
        <Tooltip />
        {cfg.legend?.enabled !== false && <Legend />}

        {/* CỘT (trục trái) */}
        {columnKeys.map((key: string, idx: number) => (
          <Bar
            key={`bar-${key}`}
            yAxisId="left"
            dataKey={key}
            name={cfg.labels?.[key] ?? key}
            fill={BARS[idx % BARS.length]}
          />
        ))}

        {/* ĐƯỜNG (trục phải) */}
        {lineKeys.map((key: string, idx: number) => (
          <Line
            key={`line-${key}`}
            yAxisId="right"
            type="monotone"
            dataKey={key}
            name={cfg.labels?.[key] ?? key}
            stroke={LINES[idx % LINES.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
