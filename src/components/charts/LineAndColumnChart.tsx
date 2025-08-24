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
// import chartData from "../../data/chartData.json"; // Removed direct import

// Thêm prop data để nhận dữ liệu từ ngoài vào
interface LineAndColumnChartProps {
  config: any;
  data: any[];
}

export const LineAndColumnChart: React.FC<LineAndColumnChartProps> = ({
  config,
  data,
}) => {
  // Nhận dữ liệu từ prop data
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
          dataKey="month"
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
        {/* <Bar yAxisId="left" dataKey="sales" fill="#0088FE" name="Sales" /> */}
        {/* <Line
          yAxisId="right"
          type="monotone"
          dataKey="profit"
          stroke="#00C49F"
          strokeWidth={2}
          name="Profit"
        /> */}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
