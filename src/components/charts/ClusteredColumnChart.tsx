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

// ===== Props cho biểu đồ cột nhóm dọc =====
// Thêm prop data để nhận dữ liệu từ ngoài vào
interface ClusteredColumnChartProps {
  config: any;
  data: any[];
}

// ===== Biểu đồ cột nhóm dọc (Clustered Column Chart) =====
export const ClusteredColumnChart: React.FC<ClusteredColumnChartProps> = ({
  config,
  data,
}) => {
  // Nhận dữ liệu từ prop data
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {/* Hiển thị lưới nếu có cấu hình */}
        {config.gridlines?.enabled && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={config.gridlines.color}
            strokeWidth={config.gridlines.strokeWidth}
          />
        )}
        {/* Cấu hình trục X */}
        <XAxis
          dataKey="month"
          tick={{
            fontSize: config.xAxis.fontSize,
            fill: config.xAxis.color,
            fontWeight: config.xAxis.bold ? "bold" : "normal",
          }}
        />
        {/* Cấu hình trục Y */}
        <YAxis
          tick={{
            fontSize: config.yAxis.fontSize,
            fill: config.yAxis.color,
            fontWeight: config.yAxis.bold ? "bold" : "normal",
          }}
        />
        <Tooltip />
        {/* Hiển thị chú giải nếu có cấu hình */}
        {config.legend?.enabled && <Legend />}
        {/* Cột dữ liệu visitors */}
        <Bar dataKey="visitors" fill="#0088FE" name="Visitors" />
        {/* Cột dữ liệu revenue */}
        <Bar dataKey="revenue" fill="#00C49F" name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};
