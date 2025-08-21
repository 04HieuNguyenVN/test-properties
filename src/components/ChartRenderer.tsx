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
};

const ChartRenderer: React.FC<Props> = ({ chartType, config }) => {
  switch (chartType) {
    case "stackedColumn":
      return (
        <StackedColumnChart config={config} data={chartData.monthlyData} />
      );
    case "clusteredColumn":
      return (
        <ClusteredColumnChart config={config} data={chartData.monthlyData} />
      );
    case "lineAndColumn":
      return (
        <LineAndColumnChart config={config} data={chartData.monthlyData} />
      );
    case "pie":
      return <CustomPieChart config={config} data={chartData.categories} />;
    case "line":
      return <CustomLineChart config={config} data={chartData.monthlyData} />;
    case "stackedBar":
      return <StackedBarChart config={config} data={chartData.stackedData} />;
    case "clusteredBar":
      return <ClusteredBarChart config={config} data={chartData.monthlyData} />;
    default:
      return null;
  }
};

export default ChartRenderer;
