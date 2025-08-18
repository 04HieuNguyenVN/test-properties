import React from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { CHART_COLORS } from "../../constants/index";

interface PieChartProps {
  data: any[];
  config: any;
}

export const PieChart: React.FC<PieChartProps> = ({ data, config }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percentage }) => `${name} ${percentage}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        {config.legend?.enabled && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
