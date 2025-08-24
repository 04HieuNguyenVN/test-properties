import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartState, ChartType, DataField } from "./types";

/** ===== Helper: lấy chartType từ URL ===== */
let initialChartType: ChartType = "stackedColumn";
if (typeof window !== "undefined") {
  const match = window.location.pathname.match(/^\/([^/]+)/);
  if (
    match &&
    [
      "line",
      "pie",
      "stackedColumn",
      "clusteredColumn",
      "lineAndColumn",
      "stackedBar",
      "clusteredBar",
    ].includes(match[1])
  ) {
    initialChartType = match[1] as ChartType;
  }
}

/** ===== initialState (giữ nguyên nội dung từ file gốc của bạn) ===== */
const initialState: ChartState = {
  selectedData: [],
  chartType: initialChartType,
  activeTab: "data",
  activeSubTab: "Visual",
  expandedSections: {
    properties: true,
    appearance: false,
    axes: false,
    legend: false,
    legendOptions: false,
    legendText: false,
    legendTitle: false,
    options: false,
    text: false,
    title: false,
    slices: false,
    detailLabels: false,
    rotation: false,
    xAxis: false,
    yAxis: false,
    xAxisValues: false,
    xAxisTitle: false,
    xAxisLayout: false,
    xAxisRange: false,
    yAxisRange: false,
    yAxisValues: false,
    yAxisTitle: false,
    yAxisLayout: false,
    values: false,
    layout: false,
    gridlines: false,
    plot: false,
    dataLabels: false,
  },
  // now storing rawChartData per chartType to avoid cross-chart conflicts
  rawChartData: {},
  chartConfigs: {
    column: {
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
          title: { enabled: true, text: "Legend" },
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
        detail: [],
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
          title: { enabled: true, text: "Legend" },
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
          title: { enabled: true, text: "Legend" },
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
    stackedColumn: {
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
          title: { enabled: true, text: "Legend" },
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    clusteredColumn: {
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
          title: { enabled: true, text: "Legend" },
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    lineAndColumn: {
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
          title: { enabled: true, text: "Legend" },
        },
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
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
          { name: "Population", type: "sum" },
          { name: "GDP", type: "sum" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: false },
      },
      format: {
        xAxis: {
          enabled: true,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        yAxis: {
          enabled: true,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        title: {
          enabled: true,
          text: "Bar Chart",
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
          title: { enabled: true, text: "Legend" },
        },
        dataLabels: {
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
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    stackedBar: {
      data: {
        yAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        xAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Population", type: "sum" },
          { name: "GDP", type: "sum" },
          { name: "Revenue", type: "sum" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: false },
      },
      format: {
        xAxis: {
          enabled: true,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        yAxis: {
          enabled: true,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
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
          title: { enabled: true, text: "Legend" },
        },
        dataLabels: {
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
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
    clusteredBar: {
      data: {
        yAxis: [
          { name: "Khu vực", type: "sum" },
          { name: "Tỉnh", type: "count" },
        ],
        xAxis: [{ name: "Sum of GDPGRDP 20...", type: "sum" }],
        legend: [],
        smallMultiples: [],
        tooltips: [
          { name: "Population", type: "sum" },
          { name: "GDP", type: "sum" },
          { name: "Growth", type: "sum" },
        ],
        drillThrough: { crossReport: false, keepAllFilters: false },
      },
      format: {
        xAxis: {
          enabled: true,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
        },
        yAxis: {
          enabled: true,
          fontSize: 9,
          bold: false,
          italic: false,
          underline: false,
          color: "#666666",
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
          title: { enabled: true, text: "Legend" },
        },
        dataLabels: {
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
        layout: { minimumCategoryWidth: 20 },
        gridlines: { enabled: true, color: "#E1E1E1", strokeWidth: 1 },
      },
    },
  },
};

/** ===== Slice & Reducers (không đổi hành vi) ===== */
const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setRawChartDataForChart: (
      state,
      action: PayloadAction<{ chartType: string; data: any[] }>
    ) => {
      const { chartType, data } = action.payload;
      // ensure object exists
      if (!state.rawChartData || typeof state.rawChartData !== "object")
        state.rawChartData = {} as any;
      (state.rawChartData as Record<string, any[]>)[chartType] = data;
    },
    setChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartType = action.payload;
    },
    setSelectedData: (state, action: PayloadAction<any[]>) => {
      state.selectedData = action.payload;
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
  setSelectedData,
  setRawChartDataForChart,
  setActiveTab,
  setActiveSubTab,
  toggleSection,
  removeDataItem,
  updateFieldType,
  updateFormatConfig,
} = chartSlice.actions;

export default chartSlice.reducer;
