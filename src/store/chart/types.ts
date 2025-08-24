import { PayloadAction } from "@reduxjs/toolkit";

export interface DataField {
  name: string;
  type: "sum" | "count" | "average";
}

export interface ChartDataConfig {
  yAxis: DataField[];
  xAxis: DataField[];
  legend: DataField[];
  smallMultiples: DataField[];
  tooltips: DataField[];
  values?: DataField[];
  secondaryYAxis?: DataField[];
  detail?: DataField[];
  drillThrough: {
    crossReport: boolean;
    keepAllFilters: boolean;
  };
}

export interface FormatConfig {
  enabled: boolean;
  title?: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
  font?: string;
  position?: string;
  style?: string;
  maximumHeight?: number;
  concatenateLabels?: boolean;
}

export interface TitleConfig extends FormatConfig {
  text: string;
  style: string;
}

export interface LegendConfig {
  enabled: boolean;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
  font?: string;
  position: string;
  title: {
    enabled: boolean;
    text: string;
  };
}

export interface ChartConfig {
  data: ChartDataConfig;
  format: {
    xAxis: FormatConfig;
    yAxis: FormatConfig;
    values: FormatConfig;
    title: TitleConfig;
    legend: LegendConfig;
    layout?: { minimumCategoryWidth: number };
    gridlines?: { enabled: boolean; color: string; strokeWidth: number };
    dataLabels?: FormatConfig;
    plot?: { innerRadius: number; outerRadius: number };
    slices?: { enabled: boolean };
    detailLabels?: { enabled: boolean };
    rotation?: { enabled: boolean; angle: number };
  };
}

export type ChartType =
  | "line"
  | "pie"
  | "stackedColumn"
  | "clusteredColumn"
  | "lineAndColumn"
  | "stackedBar"
  | "clusteredBar";

export interface ChartState {
  selectedData: any[];
  chartType: ChartType;
  activeTab: "data" | "format";
  activeSubTab: "Visual" | "General";
  expandedSections: Record<string, boolean>;
  chartConfigs: {
    column: ChartConfig;
    pie: ChartConfig;
    line: ChartConfig;
    stackedColumn: ChartConfig;
    clusteredColumn: ChartConfig;
    lineAndColumn: ChartConfig;
    bar: ChartConfig;
    stackedBar: ChartConfig;
    clusteredBar: ChartConfig;
  };
  /** raw data stored per chartType to avoid conflicts between charts */
  rawChartData: Record<string, any[]>;
}

/** Action payload helpers (nếu cần dùng lại ngoài slice) */
export type SetChartTypeAction = PayloadAction<ChartType>;
export type ToggleSectionAction = PayloadAction<string>;
export type UpdateFieldTypeAction = PayloadAction<{
  fieldName: string;
  newType: "sum" | "count" | "average";
  category: string;
}>;
export type RemoveDataItemAction = PayloadAction<{
  category: string;
  fieldName: string;
}>;
export type UpdateFormatConfigAction = PayloadAction<{
  section: string;
  key: string;
  value: any;
}>;
