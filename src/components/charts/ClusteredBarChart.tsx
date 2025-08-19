import React from "react";
import { Bar as AntPlotBar } from "@ant-design/plots";
import chartData from "../../data/chartData.json";

// Props cho biểu đồ cột nhóm ngang
interface ClusteredBarChartProps {
  config: any;
}

// Biểu đồ cột nhóm ngang (Clustered Bar Chart)
export const ClusteredBarChart: React.FC<ClusteredBarChartProps> = ({
  config,
}) => {
  // Lấy dữ liệu từ file chartData.json
  const data = chartData.monthlyData;
  // Chuyển đổi dữ liệu thành dạng phù hợp cho biểu đồ nhóm
  const clusteredBarData = data.flatMap((item) => [
    { label: item.month, type: "visitors", value: item.visitors },
    { label: item.month, type: "revenue", value: item.revenue },
  ]);

  // Cấu hình cho biểu đồ cột nhóm ngang
  const clusteredBarConfig = {
    data: clusteredBarData,
    xField: "value",
    yField: "label",
    colorField: "type",
    scale: {
      y: {
        padding: 0.5,
      },
    },
    group: true,
    style: {
      height: 10,
    },
    color: {
      visitors: "#0088FE",
      revenue: "#00C49F",
    },
    legend: {
      position: "top",
    },
  };

  // Render biểu đồ
  return <AntPlotBar {...clusteredBarConfig} />;
};
