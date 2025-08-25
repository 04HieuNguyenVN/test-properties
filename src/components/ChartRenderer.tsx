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
  config: any; // chartConfig đến từ Provider (có xField/yFields/legendField)
  data: any[]; // dữ liệu đã xử lý (processed) từ Provider
};

/** Suy ra danh sách yFields từ data đã pivot (mọi key khác xField) */
function deriveYFieldsFromData(data: any[], xField?: string) {
  if (!Array.isArray(data) || data.length === 0 || !xField) return [];
  const set = new Set<string>();
  for (const row of data) {
    Object.keys(row || {}).forEach((k) => {
      if (k !== xField) set.add(k);
    });
  }
  return Array.from(set);
}

const ChartRenderer: React.FC<Props> = ({ chartType, config, data }) => {
  if (chartType === "stackedColumn") {
    const xField = config?.xField;
    const hasLegend = Boolean(config?.legendField);
    let nextConfig = { ...(config || {}) };

    if (hasLegend && xField) {
      // Khi có legend, processed đã pivot: suy ra cột Y thực tế từ data
      const yFromData = deriveYFieldsFromData(data, xField);
      if (yFromData.length) nextConfig.yFields = yFromData;
      // Chạy wide-mode (nhiều yFields) nên KHÔNG dùng seriesField
      if ("seriesField" in nextConfig) delete (nextConfig as any).seriesField;
    }

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
    case "stackedBar":
      return <StackedBarChart config={config} data={data} />;
    case "clusteredBar":
      return <ClusteredBarChart config={config} data={data} />;
    default:
      return null;
  }
};

export default ChartRenderer;
