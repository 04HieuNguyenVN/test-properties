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
// Removed direct import of chartData.json

// ===== Props cho biểu đồ tròn =====
// Thêm prop data để nhận dữ liệu từ ngoài vào
interface PieChartProps {
  config: any;
  data: any[];
}

// ===== Biểu đồ tròn (Pie Chart) =====
export const PieChart: React.FC<PieChartProps> = ({ config, data }) => {
  // Nhận dữ liệu từ prop data
  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsPieChart>
        {/* Vẽ các phần tử của biểu đồ tròn */}
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
        {/* Hiển thị chú giải nếu có cấu hình */}
        {config.legend?.enabled && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
