import React from "react";
import { Bar as AntPlotBar } from "@ant-design/plots";
// Removed direct import of chartData.json

// ===== Props cho biểu đồ cột chồng ngang =====
// Thêm prop data để nhận dữ liệu từ ngoài vào
interface StackedBarChartProps {
  config: any;
  data: any[];
}

// ===== Biểu đồ cột chồng ngang (Stacked Bar Chart) =====
export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  config,
  data,
}) => {
  // Nhận dữ liệu từ prop data
  const stackedBarData = data.flatMap((item) => [
    { state: item.category, population: item.series1, age: "Series 1" },
    { state: item.category, population: item.series2, age: "Series 2" },
    { state: item.category, population: item.series3, age: "Series 3" },
  ]);

  // Cấu hình cho biểu đồ cột chồng ngang
  const stackedBarConfig = {
    data: stackedBarData,
    xField: "state",
    yField: "population",
    colorField: "age",
    stack: true,
    sort: {
      reverse: true,
      by: "y",
    },
    axis: {
      y: { labelFormatter: "~s" },
      x: {
        labelSpacing: 4,
        style: {
          labelTransform: "rotate(90)",
        },
      },
    },
    color: {
      "Series 1": "#1f77b4",
      "Series 2": "#ff7f0e",
      "Series 3": "#2ca02c",
    },
    legend: {
      position: "top",
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.age,
          value: `${datum.population}`,
        };
      },
    },
  };

  // Render biểu đồ cột chồng ngang
  return <AntPlotBar {...stackedBarConfig} />;
};
