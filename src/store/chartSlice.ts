import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Sample data for Vietnamese cities
const sampleData = [
  {
    name: "Hà Nội",
    population: 8000000,
    area: 3324,
    gdp: 85.2,
    revenue: 120.5,
    growth: 6.8,
    temperature: 23.5,
    humidity: 78,
    category: "Thủ đô",
  },
  {
    name: "TP.HCM",
    population: 9000000,
    area: 2095,
    gdp: 123.4,
    revenue: 145.8,
    growth: 7.2,
    temperature: 28.2,
    humidity: 82,
    category: "Thành phố trực thuộc TW",
  },
  {
    name: "Đà Nẵng",
    population: 1200000,
    area: 1285,
    gdp: 42.1,
    revenue: 55.3,
    growth: 8.1,
    temperature: 26.8,
    humidity: 75,
    category: "Thành phố trực thuộc TW",
  },
  {
    name: "Hải Phòng",
    population: 2000000,
    area: 1523,
    gdp: 38.7,
    revenue: 48.9,
    growth: 5.9,
    temperature: 24.1,
    humidity: 80,
    category: "Thành phố trực thuộc TW",
  },
  {
    name: "Cần Thơ",
    population: 1200000,
    area: 1409,
    gdp: 28.9,
    revenue: 35.2,
    growth: 6.5,
    temperature: 27.5,
    humidity: 85,
    category: "Thành phố trực thuộc TW",
  },
  {
    name: "Nha Trang",
    population: 500000,
    area: 251,
    gdp: 15.3,
    revenue: 22.1,
    growth: 7.8,
    temperature: 26.3,
    humidity: 77,
    category: "Thành phố tỉnh",
  },
  {
    name: "Huế",
    population: 350000,
    area: 71,
    gdp: 12.8,
    revenue: 18.4,
    growth: 6.2,
    temperature: 25.1,
    humidity: 83,
    category: "Thành phố tỉnh",
  },
  {
    name: "Vũng Tàu",
    population: 450000,
    area: 140,
    gdp: 18.6,
    revenue: 28.3,
    growth: 8.5,
    temperature: 27.8,
    humidity: 79,
    category: "Thành phố tỉnh",
  },
];

// Additional data for pie charts (category distribution)
const categoryData = [
  { name: "Thủ đô", value: 1, percentage: 12.5 },
  { name: "TP trực thuộc TW", value: 4, percentage: 50.0 },
  { name: "TP tỉnh", value: 3, percentage: 37.5 },
];

// Population pyramid data for stacked charts
const populationData = [
  {
    city: "Hà Nội",
    "<10": 800000,
    "10-19": 750000,
    "20-29": 900000,
    "30-39": 1200000,
    "40-49": 1100000,
    "50-59": 800000,
    "60-69": 600000,
    "70-79": 400000,
    "≥80": 200000,
  },
  {
    city: "TP.HCM",
    "<10": 950000,
    "10-19": 850000,
    "20-29": 1050000,
    "30-39": 1400000,
    "40-49": 1300000,
    "50-59": 950000,
    "60-69": 700000,
    "70-79": 500000,
    "≥80": 250000,
  },
  {
    city: "Đà Nẵng",
    "<10": 120000,
    "10-19": 110000,
    "20-29": 140000,
    "30-39": 180000,
    "40-49": 160000,
    "50-59": 120000,
    "60-69": 90000,
    "70-79": 60000,
    "≥80": 30000,
  },
  {
    city: "Hải Phòng",
    "<10": 200000,
    "10-19": 180000,
    "20-29": 220000,
    "30-39": 280000,
    "40-49": 260000,
    "50-59": 200000,
    "60-69": 150000,
    "70-79": 100000,
    "≥80": 50000,
  },
  {
    city: "Cần Thơ",
    "<10": 130000,
    "10-19": 120000,
    "20-29": 140000,
    "30-39": 180000,
    "40-49": 170000,
    "50-59": 130000,
    "60-69": 100000,
    "70-79": 70000,
    "≥80": 35000,
  },
  {
    city: "Nha Trang",
    "<10": 55000,
    "10-19": 50000,
    "20-29": 60000,
    "30-39": 75000,
    "40-49": 70000,
    "50-59": 55000,
    "60-69": 40000,
    "70-79": 30000,
    "≥80": 15000,
  },
  {
    city: "Huế",
    "<10": 40000,
    "10-19": 35000,
    "20-29": 45000,
    "30-39": 55000,
    "40-49": 50000,
    "50-59": 40000,
    "60-69": 30000,
    "70-79": 25000,
    "≥80": 12000,
  },
  {
    city: "Vũng Tàu",
    "<10": 50000,
    "10-19": 45000,
    "20-29": 55000,
    "30-39": 70000,
    "40-49": 65000,
    "50-59": 50000,
    "60-69": 38000,
    "70-79": 28000,
    "≥80": 14000,
  },
];

// Test data for stacked charts with simple values
const testStackedData = [
  { category: "A", series1: 100, series2: 200, series3: 150 },
  { category: "B", series1: 150, series2: 180, series3: 120 },
  { category: "C", series1: 200, series2: 160, series3: 180 },
  { category: "D", series1: 120, series2: 220, series3: 140 },
];

// Monthly data for line charts
const monthlyData = [
  { month: "Jan", visitors: 4000, revenue: 2400 },
  { month: "Feb", visitors: 3000, revenue: 1398 },
  { month: "Mar", visitors: 2000, revenue: 9800 },
  { month: "Apr", visitors: 2780, revenue: 3908 },
  { month: "May", visitors: 1890, revenue: 4800 },
  { month: "Jun", visitors: 2390, revenue: 3800 },
  { month: "Jul", visitors: 3490, revenue: 4300 },
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
    legend: FormatConfig & {
      position: string;
      title: {
        enabled: boolean;
        text: string;
      };
    };
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
  categoryData: typeof categoryData;
  monthlyData: typeof monthlyData;
  populationData: typeof populationData;
  testStackedData: typeof testStackedData;
  chartType:
    | "column"
    | "line"
    | "pie"
    | "stackedColumn"
    | "clusteredColumn"
    | "lineAndColumn"
    | "bar"
    | "stackedBar"
    | "clusteredBar";
  activeTab: "data" | "format";
  activeSubTab: "Visual" | "General";
  expandedSections: {
    [key: string]: boolean;
  };
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
}

const initialState: ChartState = {
  data: sampleData,
  categoryData: categoryData,
  monthlyData: monthlyData,
  populationData: populationData,
  testStackedData: testStackedData,
  chartType: "column",
  activeTab: "data",
  activeSubTab: "Visual",
  expandedSections: {
    // Visual tab sections
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
        drillThrough: {
          crossReport: false,
          keepAllFilters: false,
        },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
        drillThrough: {
          crossReport: false,
          keepAllFilters: false,
        },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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
        drillThrough: {
          crossReport: false,
          keepAllFilters: false,
        },
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
          title: {
            enabled: true,
            text: "Legend",
          },
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

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartType: (
      state,
      action: PayloadAction<
        | "column"
        | "line"
        | "pie"
        | "stackedColumn"
        | "clusteredColumn"
        | "lineAndColumn"
        | "bar"
        | "stackedBar"
        | "clusteredBar"
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
