import React from "react";
import {
  StackedColumnChart,
  ClusteredColumnChart,
  PieChart as CustomPieChart,
  LineChart as CustomLineChart,
  LineAndColumnChart,
  StackedBarChart,
  ClusteredBarChart,
} from "./charts";

type Props = {
  chartType:
    | "stackedColumn"
    | "clusteredColumn"
    | "lineAndColumn"
    | "pie"
    | "line"
    | "stackedBar"
    | "clusteredBar";
  config: any;
  data: any[];
};

function deriveYFieldsFromData(data: any[], xField?: string) {
  if (!Array.isArray(data) || data.length === 0 || !xField) return [];
  const set = new Set<string>();
  for (const row of data)
    Object.keys(row || {}).forEach((k) => {
      if (k !== xField) set.add(k);
    });
  return Array.from(set);
}

const ChartRenderer: React.FC<Props> = ({ chartType, config, data }) => {
  // Với bar & stackedColumn, sau pivot cần suy ra yFields theo dữ liệu thực tế
  if (
    chartType === "clusteredBar" ||
    chartType === "stackedColumn" ||
    chartType === "stackedBar"
  ) {
    const nextConfig = { ...(config || {}) };
    if (!nextConfig.yFields || nextConfig.yFields.length === 0) {
      const yFromData = deriveYFieldsFromData(data, nextConfig?.xField);
      if (yFromData.length) nextConfig.yFields = yFromData;
    }
    if ("seriesField" in nextConfig) delete (nextConfig as any).seriesField;

    if (chartType === "clusteredBar")
      return <ClusteredBarChart config={nextConfig} data={data} />;
    if (chartType === "stackedBar")
      return <StackedBarChart config={nextConfig} data={data} />;
    return <StackedColumnChart config={nextConfig} data={data} />;
  }

  switch (chartType) {
    case "clusteredColumn":
      return <ClusteredColumnChart config={config} data={data} />;
    case "lineAndColumn":
      return <LineAndColumnChart config={config} data={data} />;
    case "pie":
      return <CustomPieChart config={config} data={data} />;
    case "line":
      return <CustomLineChart config={config} data={data} />;
    default:
      return null;
  }
};

export default ChartRenderer;
