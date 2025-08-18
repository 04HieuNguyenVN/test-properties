// Data interfaces
export interface DataField {
  name: string;
  type: "sum" | "count" | "average";
}

export interface DrillThroughConfig {
  crossReport: boolean;
  keepAllFilters: boolean;
}

export interface ChartDataConfig {
  yAxis: DataField[];
  xAxis: DataField[];
  legend: DataField[];
  smallMultiples: DataField[];
  tooltips: DataField[];
  values?: DataField[];
  secondaryYAxis?: DataField[];
  drillThrough: DrillThroughConfig;
}

// Format interfaces
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
  | "column"
  | "line"
  | "pie"
  | "stackedColumn"
  | "clusteredColumn"
  | "lineAndColumn"
  | "bar"
  | "stackedBar"
  | "clusteredBar";

export interface ChartState {
  data: any[];
  categoryData: any[];
  monthlyData: any[];
  populationData: any[];
  testStackedData: any[];
  chartType: ChartType;
  activeTab: "data" | "format";
  activeSubTab: "Visual" | "General";
  expandedSections: {
    [key: string]: boolean;
  };
  chartConfigs: {
    [K in ChartType]: ChartConfig;
  };
}

// Component Props interfaces
export interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (checked: boolean) => void;
}

export interface FontControlsProps {
  config: any;
  section: string;
  onUpdate?: (key: string, value: any) => void;
}

export interface ColorPickerRowProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}
