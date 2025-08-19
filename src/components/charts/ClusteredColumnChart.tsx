import React from "react";
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
import chartData from "../../data/chartData.json";

interface ClusteredColumnChartProps {
  config: any;
}

export const ClusteredColumnChart: React.FC<ClusteredColumnChartProps> = ({
  config,
}) => {
  const data = chartData.monthlyData;
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
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
          dataKey="month"
          tick={{
            fontSize: config.xAxis.fontSize,
            fill: config.xAxis.color,
            fontWeight: config.xAxis.bold ? "bold" : "normal",
          }}
        />
        <YAxis
          tick={{
            fontSize: config.yAxis.fontSize,
            fill: config.yAxis.color,
            fontWeight: config.yAxis.bold ? "bold" : "normal",
          }}
        />
        <Tooltip />
        {config.legend?.enabled && <Legend />}
        <Bar dataKey="visitors" fill="#0088FE" name="Visitors" />
        <Bar dataKey="revenue" fill="#00C49F" name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};
