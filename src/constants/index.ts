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

// Các tùy chọn Table
export const TABLE_OPTIONS = [
  { label: "Cities", value: "cities" },
  { label: "Countries", value: "countries" },
  { label: "Sales", value: "sales" },
  { label: "Products", value: "products" },
];

// Các tùy chọn Field
export const FIELD_OPTIONS = [
  { label: "Population", value: "population" },
  { label: "Area", value: "area" },
  { label: "GDP", value: "gdp" },
  { label: "Name", value: "name" },
];

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
export const SIMPLE_CHART_TYPES = ["column", "bar", "pie"];

// Fields chỉ cho phép 1 field
export const SINGLE_FIELD_TYPES = [
  "columnY",
  "lineY",
  "columnLegend",
  "detail",
];

// Chart types và field restrictions
export const FIELD_RESTRICTIONS = {
  // Y-axis cho stacked/clustered column charts chỉ 1 field
  yAxis: ["stackedColumn", "clusteredColumn"],
  // X-axis cho stacked/clustered bar charts chỉ 1 field
  xAxis: ["stackedBar", "clusteredBar"],
  // Line chart tất cả fields chỉ 1 field
  allFields: ["line"],
};

// Các màu mặc định
export const DEFAULT_COLORS = {
  primary: "#1890ff",
  text: "#666666",
  gridlines: "#E1E1E1",
  background: "#ffffff",
};

// Bar chart types constant
export const BAR_CHART_TYPES = ["bar", "stackedBar", "clusteredBar"];

// Required sections that cannot be toggled
export const REQUIRED_SECTIONS = ["xAxis", "yAxis"];

// Default available fields for unknown chart types
export const DEFAULT_AVAILABLE_FIELDS = ["yAxis", "xAxis", "legend"];

// Title display options
export const TITLE_DISPLAY_OPTIONS = [
  { value: "Show title only", label: "Show title only" },
  { value: "Show title and units", label: "Show title and units" },
];
