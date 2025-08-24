import { RootState } from "../store";
import { ChartConfig, ChartState } from "./types";

/** Gốc state chart */
export const selectChartState = (s: RootState): ChartState => s.chart;

/** Type hiện tại */
export const selectChartType = (s: RootState) => s.chart.chartType;

/** Tab/Section */
export const selectActiveTab = (s: RootState) => s.chart.activeTab;
export const selectActiveSubTab = (s: RootState) => s.chart.activeSubTab;
export const selectExpandedSections = (s: RootState) =>
  s.chart.expandedSections;

/** Dữ liệu chart */
export const selectSelectedData = (s: RootState) => s.chart.selectedData;
// raw data per chartType
export const selectRawChartDataMap = (s: RootState) => s.chart.rawChartData;

// convenience selector for a specific chartType
export const selectRawChartData = (chartType: string) => (s: RootState) =>
  (s.chart.rawChartData || {})[chartType] ?? [];

/** Config theo type hiện tại */
export const selectCurrentChartConfig = (s: RootState): ChartConfig => {
  const { chartType, chartConfigs } = s.chart;
  // map tên type → key trong chartConfigs nếu cần
  const map: Record<string, keyof ChartState["chartConfigs"]> = {
    line: "line",
    pie: "pie",
    stackedColumn: "stackedColumn",
    clusteredColumn: "clusteredColumn",
    lineAndColumn: "lineAndColumn",
    stackedBar: "stackedBar",
    clusteredBar: "clusteredBar",
  };
  const key = map[chartType] ?? "line";
  return chartConfigs[key];
};

/** Format & Data nhanh */
export const selectCurrentFormat = (s: RootState) =>
  selectCurrentChartConfig(s).format;
export const selectCurrentDataMapping = (s: RootState) =>
  selectCurrentChartConfig(s).data;
