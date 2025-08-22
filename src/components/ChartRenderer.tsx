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
  data: any;
};

const ChartRenderer: React.FC<Props> = ({ chartType, config, data }) => {
  switch (chartType) {
    case "stackedColumn":
      return <StackedColumnChart config={config} data={data} />;
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
