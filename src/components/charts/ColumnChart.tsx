import React from "react";
import { Column as AntColumn } from "@ant-design/charts";

interface ColumnChartProps {
  data: any[];
  config: any;
}

export const ColumnChart: React.FC<ColumnChartProps> = ({ data, config }) => {
  const columnData = data.map((item) => ({
    letter: item.name,
    frequency: item.population / 10000000, // Convert to percentage-like value
  }));

  const columnConfig = {
    data: columnData,
    xField: "letter",
    yField: "frequency",
    label: {
      text: (d: any) => `${(d.frequency * 100).toFixed(1)}%`,
      textBaseline: "bottom",
    },
    axis: {
      y: {
        labelFormatter: ".0%",
      },
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
      fill: "#0078D4",
    },
  };

  return <AntColumn {...columnConfig} />;
};
