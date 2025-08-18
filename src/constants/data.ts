// Sample data for Vietnamese cities
export const sampleData = [
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
    population: 1235000,
    area: 1409,
    gdp: 28.3,
    revenue: 35.7,
    growth: 6.3,
    temperature: 27.5,
    humidity: 84,
    category: "Thành phố trực thuộc TW",
  },
];

export const categoryData = [
  { category: "Thủ đô", count: 1, avgPopulation: 8000000 },
  { category: "Thành phố trực thuộc TW", count: 4, avgPopulation: 3356250 },
];

export const monthlyData = [
  { month: "Jan", visitors: 4000, revenue: 2400 },
  { month: "Feb", visitors: 3000, revenue: 1398 },
  { month: "Mar", visitors: 2000, revenue: 9800 },
  { month: "Apr", visitors: 2780, revenue: 3908 },
  { month: "May", visitors: 1890, revenue: 4800 },
  { month: "Jun", visitors: 2390, revenue: 3800 },
];

export const populationData = [
  { age: "0-20", population: 2500000 },
  { age: "21-40", population: 3200000 },
  { age: "41-60", population: 2800000 },
  { age: "61+", population: 1500000 },
];

export const testStackedData = [
  { month: "Jan", desktop: 4000, mobile: 2400, tablet: 1200 },
  { month: "Feb", desktop: 3000, mobile: 1398, tablet: 800 },
  { month: "Mar", desktop: 2000, mobile: 9800, tablet: 1500 },
  { month: "Apr", desktop: 2780, mobile: 3908, tablet: 1100 },
  { month: "May", desktop: 1890, mobile: 4800, tablet: 900 },
  { month: "Jun", desktop: 2390, mobile: 3800, tablet: 1300 },
];

// Chart colors
export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Font options
export const FONT_OPTIONS = [
  { label: "Segoe UI", value: "Segoe UI" },
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Calibri", value: "Calibri" },
  { label: "DIN", value: "DIN" },
];

// Position options
export const POSITION_OPTIONS = [
  { label: "Top", value: "Top" },
  { label: "Bottom", value: "Bottom" },
  { label: "Left", value: "Left" },
  { label: "Right", value: "Right" },
  { label: "Center right", value: "Center right" },
];

// Units options
export const UNITS_OPTIONS = [
  { label: "Auto", value: "Auto" },
  { label: "None", value: "None" },
  { label: "Hundreds", value: "Hundreds" },
  { label: "Thousands", value: "Thousands" },
  { label: "Millions", value: "Millions" },
  { label: "Billions", value: "Billions" },
  { label: "Trillions", value: "Trillions" },
];
