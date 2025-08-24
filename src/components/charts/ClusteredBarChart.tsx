import React from "react";
import { Bar as AntPlotBar } from "@ant-design/plots";
import { useTranslation } from "react-i18next";

// Thêm prop data để nhận dữ liệu từ ngoài vào
interface ClusteredBarChartProps {
  config: any;
  data: any[];
}

export const ClusteredBarChart: React.FC<ClusteredBarChartProps> = ({
  config,
  data,
}) => {
  // Dùng i18n để dịch các nhãn
  const { t } = useTranslation();
  const clusteredBarData = data.flatMap((item) => [
    {
      label: item.month,
      type: t("charts.visitors", "Visitors"),
      value: item.visitors,
    },
    {
      label: item.month,
      type: t("charts.revenue", "Revenue"),
      value: item.revenue,
    },
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

  // Render biểu đồ cột nhóm ngang
  return <AntPlotBar {...clusteredBarConfig} />;
};
