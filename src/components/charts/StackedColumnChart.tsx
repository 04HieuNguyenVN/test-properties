import { Column } from "@ant-design/plots";
import React from "react";

// ===== Props cho biểu đồ cột chồng dọc =====
// Thêm prop data để nhận dữ liệu từ ngoài vào
interface StackedColumnChartProps {
  config?: any;
  data: any[];
}

// ===== Biểu đồ cột chồng dọc (Stacked Column Chart) =====

const StackedColumnChart: React.FC<StackedColumnChartProps> = ({
  config,
  data,
}) => {
  // Nhận dữ liệu từ prop data
  const rawData = data;
  // Chuyển đổi dữ liệu sang dạng phù hợp cho stacked column chart
  const transformedData = rawData.flatMap((item) => [
    { category: item.month, series: "Visitors", value: item.visitors },
    { category: item.month, series: "Revenue", value: item.revenue },
    { category: item.month, series: "Sales", value: item.sales },
  ]);

  // Cấu hình mặc định cho biểu đồ cột chồng dọc
  const defaultConfig = {
    data: transformedData,
    encode: {
      x: "category",
      y: "value",
      color: "series",
    },
    transform: [{ type: "stackY" }],
    legend: { position: "top" },
    axis: {
      x: { title: "Danh mục" },
      y: { title: "Giá trị" },
    },
    tooltip: {
      title: (d: any) => d.category,
      items: (d: any) => [{ name: d.series, value: d.value }],
    },
  };

  // Gộp cấu hình custom nếu có truyền vào
  const mergedConfig = config ? { ...defaultConfig, ...config } : defaultConfig;

  // Render biểu đồ cột chồng dọc
  return <Column {...mergedConfig} />;
};

export default StackedColumnChart;
