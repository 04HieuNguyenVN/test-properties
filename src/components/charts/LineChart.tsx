import React from "react";
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
import chartData from "../../data/chartData.json";

// Props cho biểu đồ đường
interface LineChartProps {
  config: any;
}

// Biểu đồ đường (Line Chart)
export const LineChart: React.FC<LineChartProps> = ({ config }) => {
  // Lấy dữ liệu từ file chartData.json
  const data = chartData.monthlyData;
  // Render biểu đồ đường với các đường dữ liệu
  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsLineChart
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
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="#0078D4"
          strokeWidth={2}
          name="Visitors"
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#00BCF2"
          strokeWidth={2}
          name="Revenue"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
