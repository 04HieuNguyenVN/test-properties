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
import chartData from "../data/chartData.json";

interface ChartRendererProps {
  chartType: string;
  config: any;
}

const chartMap: Record<string, { Component: React.FC<any>; data: any }> = {
  stackedColumn: { Component: StackedColumnChart, data: chartData.monthlyData },
  clusteredColumn: { Component: ClusteredColumnChart, data: chartData.monthlyData },
  lineAndColumn: { Component: LineAndColumnChart, data: chartData.monthlyData },
  pie: { Component: CustomPieChart, data: chartData.categories },
  line: { Component: CustomLineChart, data: chartData.monthlyData },
  stackedBar: { Component: StackedBarChart, data: chartData.stackedData },
  clusteredBar: { Component: ClusteredBarChart, data: chartData.monthlyData },
};

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartType, config }) => {
  const chart = chartMap[chartType];
  if (!chart) return null;
  const { Component, data } = chart;
  return <Component config={config} data={data} />;
};

export default ChartRenderer;
