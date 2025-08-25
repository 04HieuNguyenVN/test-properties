import React from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface PieChartProps {
  config?: any;
  data: any[];
}

const COLORS = [
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

export const PieChart: React.FC<PieChartProps> = ({ config, data }) => {
  const cfg = config ?? {};
  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsPieChart>
        <Pie
          data={Array.isArray(data) ? data : []}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${Math.round((percent ?? 0) * 100)}%`
          }
        >
          {(Array.isArray(data) ? data : []).map((_: any, idx: number) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {cfg.legend?.enabled !== false && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
