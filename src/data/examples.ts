// Examples data for different chart types
export interface ChartExample {
  id: string;
  title: string;
  description: string;
  chartType: string;
  data: any[];
  config?: any;
}

// Column Chart Examples
export const columnChartExamples: ChartExample[] = [
  {
    id: "column-sales",
    title: "Doanh số bán hàng theo tháng",
    description: "Biểu đồ cột hiển thị doanh số bán hàng từng tháng trong năm",
    chartType: "column",
    data: [
      { month: "T1", sales: 120000, target: 100000 },
      { month: "T2", sales: 150000, target: 120000 },
      { month: "T3", sales: 180000, target: 140000 },
      { month: "T4", sales: 200000, target: 160000 },
      { month: "T5", sales: 220000, target: 180000 },
      { month: "T6", sales: 250000, target: 200000 },
    ],
    config: {
      xAxis: "month",
      yAxis: ["sales", "target"],
      colors: ["#1890ff", "#52c41a"],
    },
  },
  {
    id: "column-products",
    title: "Top sản phẩm bán chạy",
    description: "Biểu đồ cột hiển thị số lượng bán của các sản phẩm hàng đầu",
    chartType: "column",
    data: [
      { product: "Laptop", quantity: 45, revenue: 90000000 },
      { product: "Smartphone", quantity: 78, revenue: 156000000 },
      { product: "Tablet", quantity: 32, revenue: 48000000 },
      { product: "Headphone", quantity: 95, revenue: 47500000 },
      { product: "Smartwatch", quantity: 28, revenue: 42000000 },
    ],
    config: {
      xAxis: "product",
      yAxis: ["quantity"],
      colors: ["#722ed1"],
    },
  },
];

// Bar Chart Examples
export const barChartExamples: ChartExample[] = [
  {
    id: "bar-regions",
    title: "Doanh thu theo khu vực",
    description: "Biểu đồ thanh ngang hiển thị doanh thu của các khu vực",
    chartType: "bar",
    data: [
      { region: "Miền Bắc", revenue: 450000000, customers: 1200 },
      { region: "Miền Trung", revenue: 320000000, customers: 890 },
      { region: "Miền Nam", revenue: 580000000, customers: 1450 },
      { region: "Miền Đông", revenue: 380000000, customers: 1050 },
    ],
    config: {
      xAxis: "region",
      yAxis: ["revenue"],
      colors: ["#fa541c"],
    },
  },
];

// Line Chart Examples
export const lineChartExamples: ChartExample[] = [
  {
    id: "line-growth",
    title: "Tăng trưởng doanh thu theo quý",
    description: "Biểu đồ đường thể hiện xu hướng tăng trưởng doanh thu",
    chartType: "line",
    data: [
      { quarter: "Q1 2023", revenue: 150000000, profit: 30000000 },
      { quarter: "Q2 2023", revenue: 180000000, profit: 38000000 },
      { quarter: "Q3 2023", revenue: 220000000, profit: 48000000 },
      { quarter: "Q4 2023", revenue: 280000000, profit: 62000000 },
      { quarter: "Q1 2024", revenue: 320000000, profit: 75000000 },
      { quarter: "Q2 2024", revenue: 380000000, profit: 88000000 },
    ],
    config: {
      xAxis: "quarter",
      yAxis: ["revenue", "profit"],
      colors: ["#1890ff", "#52c41a"],
    },
  },
  {
    id: "line-traffic",
    title: "Lưu lượng truy cập website",
    description: "Biểu đồ đường theo dõi lưu lượng truy cập hàng ngày",
    chartType: "line",
    data: [
      { date: "01/08", visitors: 1200, pageViews: 3400, bounceRate: 45 },
      { date: "02/08", visitors: 1450, pageViews: 4100, bounceRate: 42 },
      { date: "03/08", visitors: 1680, pageViews: 4800, bounceRate: 38 },
      { date: "04/08", visitors: 1320, pageViews: 3900, bounceRate: 44 },
      { date: "05/08", visitors: 1890, pageViews: 5600, bounceRate: 35 },
      { date: "06/08", visitors: 2100, pageViews: 6300, bounceRate: 32 },
      { date: "07/08", visitors: 1750, pageViews: 5200, bounceRate: 37 },
    ],
    config: {
      xAxis: "date",
      yAxis: ["visitors", "pageViews"],
      colors: ["#722ed1", "#fa8c16"],
    },
  },
];

// Pie Chart Examples
export const pieChartExamples: ChartExample[] = [
  {
    id: "pie-market-share",
    title: "Thị phần theo danh mục sản phẩm",
    description: "Biểu đồ tròn hiển thị tỷ lệ thị phần của các danh mục",
    chartType: "pie",
    data: [
      { category: "Điện thoại", value: 35, revenue: 175000000 },
      { category: "Laptop", value: 28, revenue: 140000000 },
      { category: "Tablet", value: 15, revenue: 75000000 },
      { category: "Phụ kiện", value: 12, revenue: 60000000 },
      { category: "Khác", value: 10, revenue: 50000000 },
    ],
    config: {
      nameField: "category",
      valueField: "value",
      colors: ["#1890ff", "#52c41a", "#722ed1", "#fa541c", "#faad14"],
    },
  },
  {
    id: "pie-age-groups",
    title: "Phân bố khách hàng theo độ tuổi",
    description: "Biểu đồ tròn thể hiện cơ cấu khách hàng theo nhóm tuổi",
    chartType: "pie",
    data: [
      { ageGroup: "18-25", count: 320, percentage: 25 },
      { ageGroup: "26-35", count: 480, percentage: 38 },
      { ageGroup: "36-45", count: 280, percentage: 22 },
      { ageGroup: "46-55", count: 120, percentage: 9 },
      { ageGroup: "55+", count: 80, percentage: 6 },
    ],
    config: {
      nameField: "ageGroup",
      valueField: "percentage",
      colors: ["#13c2c2", "#52c41a", "#722ed1", "#fa541c", "#faad14"],
    },
  },
];

// Stacked Chart Examples
export const stackedChartExamples: ChartExample[] = [
  {
    id: "stacked-quarterly",
    title: "Doanh thu theo quý - Phân tích chi tiết",
    description:
      "Biểu đồ cột chồng hiển thị cơ cấu doanh thu theo từng kênh bán",
    chartType: "stacked",
    data: [
      {
        quarter: "Q1",
        online: 120000000,
        retail: 80000000,
        wholesale: 50000000,
        total: 250000000,
      },
      {
        quarter: "Q2",
        online: 150000000,
        retail: 95000000,
        wholesale: 65000000,
        total: 310000000,
      },
      {
        quarter: "Q3",
        online: 180000000,
        retail: 110000000,
        wholesale: 75000000,
        total: 365000000,
      },
      {
        quarter: "Q4",
        online: 220000000,
        retail: 130000000,
        wholesale: 85000000,
        total: 435000000,
      },
    ],
    config: {
      xAxis: "quarter",
      yAxis: ["online", "retail", "wholesale"],
      colors: ["#1890ff", "#52c41a", "#722ed1"],
    },
  },
];

// Combined examples for easy access
export const allExamples: ChartExample[] = [
  ...columnChartExamples,
  ...barChartExamples,
  ...lineChartExamples,
  ...pieChartExamples,
  ...stackedChartExamples,
];

// Helper functions
export const getExamplesByChartType = (chartType: string): ChartExample[] => {
  return allExamples.filter((example) => example.chartType === chartType);
};

export const getExampleById = (id: string): ChartExample | undefined => {
  return allExamples.find((example) => example.id === id);
};

export const getRandomExample = (chartType?: string): ChartExample => {
  const examples = chartType ? getExamplesByChartType(chartType) : allExamples;
  const randomIndex = Math.floor(Math.random() * examples.length);
  return examples[randomIndex];
};

// Data transformation utilities for examples
export const transformExampleData = {
  // Transform data for chart libraries
  forRecharts: (example: ChartExample) => {
    return example.data;
  },

  // Transform data for Ant Design charts
  forAntdCharts: (example: ChartExample) => {
    if (example.chartType === "pie") {
      return example.data.map((item) => ({
        type: item[example.config?.nameField || "category"],
        value: item[example.config?.valueField || "value"],
      }));
    }
    return example.data;
  },

  // Get summary statistics
  getSummary: (example: ChartExample) => {
    const data = example.data;
    const numericFields = Object.keys(data[0] || {}).filter(
      (key) => typeof data[0][key] === "number"
    );

    const summary: any = {
      totalRecords: data.length,
      fields: numericFields,
      stats: {},
    };

    numericFields.forEach((field) => {
      const values = data
        .map((item) => item[field])
        .filter((val) => typeof val === "number");
      summary.stats[field] = {
        min: Math.min(...values),
        max: Math.max(...values),
        sum: values.reduce((a, b) => a + b, 0),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
      };
    });

    return summary;
  },
};

export default {
  columnChartExamples,
  barChartExamples,
  lineChartExamples,
  pieChartExamples,
  stackedChartExamples,
  allExamples,
  getExamplesByChartType,
  getExampleById,
  getRandomExample,
  transformExampleData,
};
