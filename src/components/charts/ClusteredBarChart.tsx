import React from "react";
import { Bar as AntPlotBar } from "@ant-design/plots";

interface ClusteredBarChartProps {
  data: any[];
  config: any;
}

export const ClusteredBarChart: React.FC<ClusteredBarChartProps> = ({
  data,
  config,
}) => {
  const clusteredBarData = data.flatMap((item) => [
    { label: item.month, type: "visitors", value: item.visitors },
    { label: item.month, type: "revenue", value: item.revenue },
  ]);

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

  return <AntPlotBar {...clusteredBarConfig} />;
};
