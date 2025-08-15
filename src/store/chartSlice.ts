import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Sample data for Vietnamese cities
const sampleData = [
  { name: "Hà Nội", population: 8000000, area: 3324, gdp: 85.2 },
  { name: "TP.HCM", population: 9000000, area: 2095, gdp: 123.4 },
  { name: "Đà Nẵng", population: 1200000, area: 1285, gdp: 42.1 },
  { name: "Hải Phòng", population: 2000000, area: 1523, gdp: 38.7 },
  { name: "Cần Thơ", population: 1200000, area: 1409, gdp: 28.9 },
];

interface DataField {
  name: string;
  type: "sum" | "count" | "average";
}

interface ChartDataConfig {
  yAxis: DataField[];
  xAxis: DataField[];
  legend: DataField[];
  smallMultiples: DataField[];
  tooltips: DataField[];
  values?: DataField[];
  secondaryYAxis?: DataField[];
  drillThrough: {
    crossReport: boolean;
    keepAllFilters: boolean;
  };
}

interface FormatConfig {
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

interface ChartConfig {
  data: ChartDataConfig;
  format: {
    xAxis: FormatConfig;
    yAxis: FormatConfig;
    values: FormatConfig;
    title: FormatConfig & { text: string; style: string };
    legend: FormatConfig & { position: string };
    layout?: { minimumCategoryWidth: number };
    gridlines?: { enabled: boolean; color: string; strokeWidth: number };
    dataLabels?: FormatConfig;
    plot?: { innerRadius: number; outerRadius: number };
    slices?: { enabled: boolean };
    detailLabels?: { enabled: boolean };
    rotation?: { enabled: boolean; angle: number };
  };
}

interface ChartState {
  data: typeof sampleData;
  chartType:
    | "bar"
    | "line"
    | "pie"
    | "stacked"
    | "clustered"
    | "lineBar"
    | "lineColumn";
  activeTab: "data" | "format";
  activeSubTab: "Visual" | "General";
  expandedSections: {
    [key: string]: boolean;
  };
  chartConfigs: {
    bar: ChartConfig;
    pie: ChartConfig;
    line: ChartConfig;
    stacked: ChartConfig;
    clustered: ChartConfig;
    lineBar: ChartConfig;
    lineColumn: ChartConfig;
  };
}

const initialState: ChartState = {
  data: sampleData,
  chartType: "bar",
  activeTab: "data",
  activeSubTab: "Visual",
  expandedSections: {
    legend: true,
    options: false,
    text: false,
    title: true,
    slices: false,
    detailLabels: true,
    rotation: false,
    xaxis: true,
    yaxis: false,
    values: false,
    layout: false,
    gridlines: false,
    plot: false,
    dataLabels: false,
  },
  chartConfigs: {
    bar: {
      data: {
        yAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        xAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Sum of Dân số (người)", type: "sum" },
          { name: "Sum of Diện tích (km²)", type: "average" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: true },
      },
      format: {
        xAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        yAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        values: {
          enabled: true,
          font: "Segoe UI",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#605E5C",
          maximumHeight: 25,
          concatenateLabels: false,
        },
        title: {
          enabled: true,
          text: "Bar Chart Title",
          style: "Show title only",
          font: "DIN",
          fontSize: 12,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        legend: {
          enabled: true,
          position: "Top",
          fontSize: 8,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    pie: {
      data: {
        legend: [{ name: "Khu vực", type: "sum" }],
        values: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        tooltips: [{ name: "Sum of Dân số (người)", type: "count" }],
        yAxis: [],
        xAxis: [],
        smallMultiples: [],
        drillThrough: { crossReport: false, keepAllFilters: true },
      },
      format: {
        legend: {
          enabled: true,
          position: "Center right",
          fontSize: 8,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        dataLabels: {
          enabled: true,
          font: "Segoe UI",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        title: {
          enabled: true,
          text: "Pie Chart Distribution",
          style: "Show title only",
          font: "DIN",
          fontSize: 12,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        plot: { innerRadius: 0, outerRadius: 80 },
        slices: { enabled: true },
        detailLabels: { enabled: true },
        rotation: { enabled: false, angle: 0 },
        xAxis: {
          enabled: false,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        yAxis: {
          enabled: false,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        values: {
          enabled: false,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
      },
    },
    line: {
      data: {
        xAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        yAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        secondaryYAxis: [],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Sum of Dân số (người)", type: "average" },
          { name: "Sum of Diện tích (km²)", type: "sum" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: true },
      },
      format: {
        xAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        yAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        legend: {
          enabled: true,
          position: "Top",
          fontSize: 8,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        title: {
          enabled: true,
          text: "Line Chart Trends",
          style: "Show title only",
          font: "DIN",
          fontSize: 12,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
        values: {
          enabled: false,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
      },
    },
    stacked: {
      data: {
        yAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        xAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Sum of Dân số (người)", type: "sum" },
          { name: "Sum of Diện tích (km²)", type: "average" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: true },
      },
      format: {
        xAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        yAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        values: {
          enabled: true,
          font: "Segoe UI",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#605E5C",
          maximumHeight: 25,
          concatenateLabels: false,
        },
        title: {
          enabled: true,
          text: "Stacked Bar Chart",
          style: "Show title only",
          font: "DIN",
          fontSize: 12,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        legend: {
          enabled: true,
          position: "Top",
          fontSize: 8,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    clustered: {
      data: {
        yAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        xAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Sum of Dân số (người)", type: "sum" },
          { name: "Sum of Diện tích (km²)", type: "average" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: true },
      },
      format: {
        xAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        yAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        values: {
          enabled: true,
          font: "Segoe UI",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#605E5C",
          maximumHeight: 25,
          concatenateLabels: false,
        },
        title: {
          enabled: true,
          text: "Clustered Bar Chart",
          style: "Show title only",
          font: "DIN",
          fontSize: 12,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        legend: {
          enabled: true,
          position: "Top",
          fontSize: 8,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    lineBar: {
      data: {
        yAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        xAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        secondaryYAxis: [],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Sum of Dân số (người)", type: "sum" },
          { name: "Sum of Diện tích (km²)", type: "average" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: true },
      },
      format: {
        xAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        yAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        values: {
          enabled: true,
          font: "Segoe UI",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#605E5C",
          maximumHeight: 25,
          concatenateLabels: false,
        },
        title: {
          enabled: true,
          text: "Line and Bar Chart",
          style: "Show title only",
          font: "DIN",
          fontSize: 12,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        legend: {
          enabled: true,
          position: "Top",
          fontSize: 8,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    lineColumn: {
      data: {
        yAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        xAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        secondaryYAxis: [],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Sum of Dân số (người)", type: "sum" },
          { name: "Sum of Diện tích (km²)", type: "average" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: true },
      },
      format: {
        xAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        yAxis: {
          enabled: true,
          title: "Auto",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        values: {
          enabled: true,
          font: "Segoe UI",
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#605E5C",
          maximumHeight: 25,
          concatenateLabels: false,
        },
        title: {
          enabled: true,
          text: "Line and Column Chart",
          style: "Show title only",
          font: "DIN",
          fontSize: 12,
          bold: false,
          italic: false,
          underline: false,
          color: "#000000",
        },
        legend: {
          enabled: true,
          position: "Top",
          fontSize: 8,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
  },
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartType: (
      state,
      action: PayloadAction<
        | "bar"
        | "line"
        | "pie"
        | "stacked"
        | "clustered"
        | "lineBar"
        | "lineColumn"
      >
    ) => {
      state.chartType = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<"data" | "format">) => {
      state.activeTab = action.payload;
    },
    setActiveSubTab: (state, action: PayloadAction<"Visual" | "General">) => {
      state.activeSubTab = action.payload;
    },
    toggleSection: (state, action: PayloadAction<string>) => {
      state.expandedSections[action.payload] =
        !state.expandedSections[action.payload];
    },
    removeDataItem: (
      state,
      action: PayloadAction<{ category: string; fieldName: string }>
    ) => {
      const { category, fieldName } = action.payload;
      const currentConfig = state.chartConfigs[state.chartType];
      if (currentConfig.data[category as keyof typeof currentConfig.data]) {
        (currentConfig.data[
          category as keyof typeof currentConfig.data
        ] as DataField[]) = (
          currentConfig.data[
            category as keyof typeof currentConfig.data
          ] as DataField[]
        ).filter((field) => field.name !== fieldName);
      }
    },
    updateFieldType: (
      state,
      action: PayloadAction<{
        fieldName: string;
        newType: "sum" | "count" | "average";
        category: string;
      }>
    ) => {
      const { fieldName, newType, category } = action.payload;
      const currentConfig = state.chartConfigs[state.chartType];
      if (currentConfig.data[category as keyof typeof currentConfig.data]) {
        (currentConfig.data[
          category as keyof typeof currentConfig.data
        ] as DataField[]) = (
          currentConfig.data[
            category as keyof typeof currentConfig.data
          ] as DataField[]
        ).map((field) =>
          field.name === fieldName ? { ...field, type: newType } : field
        );
      }
    },
    updateFormatConfig: (
      state,
      action: PayloadAction<{ section: string; key: string; value: any }>
    ) => {
      const { section, key, value } = action.payload;
      const currentConfig = state.chartConfigs[state.chartType];
      if (currentConfig.format[section as keyof typeof currentConfig.format]) {
        (
          currentConfig.format[
            section as keyof typeof currentConfig.format
          ] as any
        )[key] = value;
      }
    },
  },
});

export const {
  setChartType,
  setActiveTab,
  setActiveSubTab,
  toggleSection,
  removeDataItem,
  updateFieldType,
  updateFormatConfig,
} = chartSlice.actions;

export type { ChartState };
export default chartSlice.reducer;
