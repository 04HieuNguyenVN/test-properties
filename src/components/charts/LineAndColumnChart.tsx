import React from "react";
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
  data: any[];
  config: any;
}

export const LineAndColumnChart: React.FC<LineAndColumnChartProps> = ({
  data,
  config,
}) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {config.gridlines?.enabled && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={config.gridlines.color}
            strokeWidth={config.gridlines.strokeWidth}
          />
        )}
        <XAxis
          dataKey="name"
          tick={{
            fontSize: config.xAxis.fontSize,
            fill: config.xAxis.color,
            fontWeight: config.xAxis.bold ? "bold" : "normal",
          }}
        />
        <YAxis
          yAxisId="left"
          tick={{
            fontSize: config.yAxis.fontSize,
            fill: config.yAxis.color,
            fontWeight: config.yAxis.bold ? "bold" : "normal",
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{
            fontSize: config.yAxis.fontSize,
            fill: config.yAxis.color,
            fontWeight: config.yAxis.bold ? "bold" : "normal",
          }}
        />
        <Tooltip />
        {config.legend?.enabled && <Legend />}
        <Bar yAxisId="left" dataKey="area" fill="#FF8042" name="Diện tích" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="population"
          stroke="#0078D4"
          strokeWidth={3}
          name="Dân số"
          dot={{ fill: "#0078D4", strokeWidth: 2, r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
