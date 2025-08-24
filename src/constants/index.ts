// Constants cho toàn bộ ứng dụng Power BI Dashboard

// Màu sắc mặc định cho charts
export const CHART_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
];

// Các tùy chọn Data Source
export const DATA_SOURCE_OPTIONS = [
  { label: "API", value: "API" },
  { label: "Database", value: "DB" },
  { label: "Formula", value: "Formula" },
  { label: "File", value: "File" },
];

// Các tùy chọn Table - sẽ được load từ chartData.json
export const TABLE_OPTIONS: { label: string; value: string }[] = [];

// Các tùy chọn Field - sẽ được load động dựa trên table đã chọn
export const FIELD_OPTIONS: { label: string; value: string }[] = [];

// Hàm để load table options từ chartData.json
export const loadTableOptions = (chartData: any) => {
  TABLE_OPTIONS.length = 0; // Clear existing options
  if (chartData && typeof chartData === "object") {
    Object.keys(chartData).forEach((key) => {
      TABLE_OPTIONS.push({
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
        value: key,
      });
    });
  }
};

// Hàm để load field options dựa trên table đã chọn
export const loadFieldOptions = (chartData: any, selectedTable: string) => {
  FIELD_OPTIONS.length = 0; // Clear existing options
  if (
    chartData &&
    chartData[selectedTable] &&
    Array.isArray(chartData[selectedTable]) &&
    chartData[selectedTable].length > 0
  ) {
    const firstItem = chartData[selectedTable][0];
    Object.keys(firstItem).forEach((key) => {
      FIELD_OPTIONS.push({
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
        value: key,
      });
    });
  }
};

// Hàm để get available fields cho một table cụ thể (không mutate global array)
export const getFieldOptionsForTable = (
  chartData: any,
  selectedTable: string
): { label: string; value: string }[] => {
  if (
    chartData &&
    chartData[selectedTable] &&
    Array.isArray(chartData[selectedTable]) &&
    chartData[selectedTable].length > 0
  ) {
    const firstItem = chartData[selectedTable][0];
    return Object.keys(firstItem).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: key,
    }));
  }
  return [];
};

// Các tùy chọn Action cho Field
export const FIELD_ACTION_OPTIONS = [
  { label: "No action", value: "no-action" },
  { label: "Sum", value: "sum" },
  { label: "Count", value: "count" },
  { label: "Average", value: "average" },
  { label: "Min", value: "min" },
  { label: "Max", value: "max" },
];

// Tên hiển thị cho các Field Type
export const FIELD_DISPLAY_NAMES: { [key: string]: string } = {
  yAxis: "Y-axis", // Trục Y
  xAxis: "X-axis", // Trục X
  legend: "Legend", // Chú thích
  values: "Values", // Giá trị
  secondaryYAxis: "Secondary Y-axis", // Trục Y phụ
  columnY: "Column Y", // Cột Y
  lineY: "Line Y", // Đường Y
  columnLegend: "Column Legend", // Chú thích cột
  detail: "Detail", // Chi tiết
};

// Các vị trí Legend
export const LEGEND_POSITION_OPTIONS = [
  { label: "Top", value: "Top" },
  { label: "Bottom", value: "Bottom" },
  { label: "Left", value: "Left" },
  { label: "Right", value: "Right" },
  { label: "Center right", value: "Center right" },
];

// Các tùy chọn Font Family
export const FONT_FAMILY_OPTIONS = [
  { label: "Segoe UI", value: "Segoe UI" },
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Georgia", value: "Georgia" },
];

// Các tùy chọn Font Size
export const FONT_SIZE_OPTIONS = Array.from({ length: 49 }, (_, i) => ({
  label: `${i + 8}`,
  value: i + 8,
})); // Tạo options từ 8 đến 56

// Chart Types và tên hiển thị
export const CHART_TYPES = {
  column: "Column Chart",
  stackedColumn: "Stacked Column Chart",
  clusteredColumn: "Clustered Column Chart",
  bar: "Bar Chart",
  stackedBar: "Stacked Bar Chart",
  clusteredBar: "Clustered Bar Chart",
  pie: "Pie Chart",
  line: "Line Chart",
  lineAndColumn: "Line and Column Chart",
};

// Fields có sẵn cho từng loại chart
export const CHART_AVAILABLE_FIELDS: { [key: string]: string[] } = {
  column: ["yAxis", "xAxis", "legend"],
  stackedColumn: ["yAxis", "xAxis", "legend"],
  clusteredColumn: ["yAxis", "xAxis", "legend"],
  bar: ["xAxis", "yAxis", "legend"],
  stackedBar: ["xAxis", "yAxis", "legend"],
  clusteredBar: ["xAxis", "yAxis", "legend"],
  pie: ["legend", "values", "detail"],
  line: ["xAxis", "yAxis", "secondaryYAxis", "legend"],
  lineAndColumn: ["xAxis", "columnY", "lineY", "columnLegend"],
};

// Chart types không cho phép thêm nhiều fields
export const SIMPLE_CHART_TYPES = [""];

// Fields chỉ cho phép 1 field
export const SINGLE_FIELD_TYPES = [
  "columnY",
  "lineY",
  "columnLegend",
  "detail",
];

// Chart types và field restrictions
export const FIELD_RESTRICTIONS = {
  // Tất cả chart types giới hạn 1 field cho mọi phần
  yAxis: [
    "stackedColumn",
    "clusteredColumn",
    "stackedBar",
    "clusteredBar",
    "line",
    "lineAndColumn",
    "pie",
  ],
  xAxis: [
    "stackedColumn",
    "clusteredColumn",
    "stackedBar",
    "clusteredBar",
    "line",
    "lineAndColumn",
    "pie",
  ],
  legend: [
    "stackedColumn",
    "clusteredColumn",
    "stackedBar",
    "clusteredBar",
    "line",
    "lineAndColumn",
    "pie",
  ],
  columnY: ["lineAndColumn"],
  lineY: ["lineAndColumn"],
  columnLegend: ["lineAndColumn"],
  // Tất cả fields chỉ được 1 field
  allFields: [
    "stackedColumn",
    "clusteredColumn",
    "stackedBar",
    "clusteredBar",
    "line",
    "lineAndColumn",
    "pie",
  ],
};

// Các màu mặc định
export const DEFAULT_COLORS = {
  primary: "#1890ff",
  text: "#666666",
  gridlines: "#E1E1E1",
  background: "#ffffff",
};

// Bar chart types constant
export const BAR_CHART_TYPES = ["stackedBar", "clusteredBar"];

// Required sections that cannot be toggled
export const REQUIRED_SECTIONS = ["xAxis", "yAxis"];

// Default available fields for unknown chart types
export const DEFAULT_AVAILABLE_FIELDS = ["yAxis", "xAxis", "legend"];

// Title display options
export const TITLE_DISPLAY_OPTIONS = [
  { value: "Show title only", label: "Show title only" },
  { value: "Show title and units", label: "Show title and units" },
];
