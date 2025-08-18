import React from "react";
import { Bar as AntPlotBar } from "@ant-design/plots";

interface BarChartProps {
  data: any[];
  config: any;
}

export const BarChart: React.FC<BarChartProps> = ({ data, config }) => {
  const barConfig = {
    data: data.map((item) => ({
      category: item.name,
      value: item.population,
      series: "Dân số",
    })),
    xField: "value",
    yField: "category",
    colorField: "series",
    label: {
      text: "value",
      formatter: (d: any) => `${(d.value / 1000000).toFixed(1)}M`,
      style: {
        textAlign: "center",
        fill: "#fff",
      },
    },
    color: ["#0078D4"],
  };

  return <AntPlotBar {...barConfig} />;
};
