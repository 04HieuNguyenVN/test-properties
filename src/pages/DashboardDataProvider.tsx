import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { ChartState } from "../store/chartSlice";
import chartData from "../data/chartData.json";
import ChartRenderer from "../components/ChartRenderer";
import DataDisplayPanels from "../components/DataDisplayPanels";
import PropertiesPanel from "../components/PropertiesPanel";

interface DashboardDataProviderProps {
  children: (data: {
    chartType: string;
    config: any;
    rawData: any;
    data: any;
  }) => React.ReactNode;
}

const DashboardDataProvider: React.FC<DashboardDataProviderProps> = ({
  children,
}) => {
  const { chartType, chartConfigs } = useSelector(
    (state: RootState) => state.chart
  ) as ChartState;
  const config = chartConfigs[chartType]?.format;

  const rawData =
    chartType === "pie"
      ? chartData.categories
      : chartType === "stackedBar"
      ? chartData.stackedData
      : chartData.monthlyData;

  const data =
    chartType === "stackedBar"
      ? chartData.stackedData
      : chartType === "pie"
      ? chartData.categories
      : chartData.monthlyData;

  return <>{children({ chartType, config, rawData, data })}</>;
};

export default DashboardDataProvider;
