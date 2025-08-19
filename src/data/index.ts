// Utility functions and types for chart data management
import chartDataJson from "./chartData.json";

// Type definitions for the data structures
export interface CityData {
  id: number;
  name: string;
  population: number;
  area: number;
  gdp: number;
  revenue: number;
  growth: number;
  temperature: number;
  humidity: number;
  category: string;
  region: string;
  established: number;
  density: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  visitors: number;
  revenue: number;
  sales: number;
  profit: number;
  expenses: number;
}

export interface PopulationByAgeData {
  city: string;
  under10: number;
  age10to19: number;
  age20to29: number;
  age30to39: number;
  age40to49: number;
  age50to59: number;
  age60to69: number;
  age70to79: number;
  over80: number;
}

export interface BusinessData {
  category: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target: number;
  growth: number;
}

export interface SalesData {
  product: string;
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  profit: number;
  units: number;
}

export interface RegionData {
  region: string;
  population: number;
  area: number;
  gdp: number;
  cities: number;
  averageTemp: number;
  humidity: number;
}

export interface PerformanceData {
  metric: string;
  actual: number;
  target: number;
  previous: number;
  variance: number;
  trend: string;
}

export interface StackedData {
  category: string;
  series1: number;
  series2: number;
  series3: number;
  total: number;
}

// Main data interface
export interface ChartDataCollection {
  cities: CityData[];
  categories: CategoryData[];
  monthlyData: MonthlyData[];
  populationByAge: PopulationByAgeData[];
  businessData: BusinessData[];
  sales: SalesData[];
  regions: RegionData[];
  performance: PerformanceData[];
  stackedData: StackedData[];
}

// Exported data
export const chartData: ChartDataCollection = chartDataJson;

// Helper functions to get specific datasets
export const getChartData = {
  // Get all cities data
  cities: (): CityData[] => chartData.cities,

  // Get categories for pie charts
  categories: (): CategoryData[] => chartData.categories,

  // Get monthly data for line charts
  monthly: (): MonthlyData[] => chartData.monthlyData,

  // Get population by age for stacked charts
  populationByAge: (): PopulationByAgeData[] => chartData.populationByAge,

  // Get business data for quarterly comparisons
  business: (): BusinessData[] => chartData.businessData,

  // Get sales data for product analysis
  sales: (): SalesData[] => chartData.sales,

  // Get regional data for geographic analysis
  regions: (): RegionData[] => chartData.regions,

  // Get performance metrics
  performance: (): PerformanceData[] => chartData.performance,

  // Get simple stacked data
  stacked: (): StackedData[] => chartData.stackedData,

  // Get data by chart type - returns appropriate dataset
  byChartType: (chartType: string): any[] => {
    switch (chartType) {
      case "pie":
        return chartData.categories;
      case "line":
        return chartData.monthlyData;
      case "stackedColumn":
      case "stackedBar":
        return chartData.stackedData;
      case "clusteredColumn":
      case "clusteredBar":
        return chartData.businessData;
      default:
        return chartData.cities;
    }
  },

  // Get sample data for field configuration
  sampleFields: () => ({
    // Numeric fields for Y-axis
    numericFields: [
      "population",
      "area",
      "gdp",
      "revenue",
      "growth",
      "temperature",
      "humidity",
      "density",
      "visitors",
      "sales",
      "profit",
      "expenses",
      "q1",
      "q2",
      "q3",
      "q4",
    ],
    // Category fields for X-axis and Legend
    categoryFields: [
      "name",
      "category",
      "region",
      "month",
      "product",
      "metric",
      "city",
      "trend",
    ],
    // Date/Time fields
    dateFields: ["month"],
    // All available fields
    allFields: [
      "name",
      "population",
      "area",
      "gdp",
      "revenue",
      "growth",
      "temperature",
      "humidity",
      "category",
      "region",
      "established",
      "density",
      "month",
      "visitors",
      "sales",
      "profit",
      "expenses",
      "product",
      "q1",
      "q2",
      "q3",
      "q4",
      "target",
      "metric",
      "actual",
      "previous",
      "variance",
      "trend",
      "series1",
      "series2",
      "series3",
    ],
  }),
};

// Data transformation utilities
export const transformData = {
  // Convert data to format expected by Recharts
  forRecharts: (data: any[], xField: string, yField: string) => {
    return data.map((item) => ({
      [xField]: item[xField],
      [yField]: item[yField],
      ...item, // include all other fields
    }));
  },

  // Group data by field
  groupBy: (data: any[], field: string) => {
    return data.reduce((acc, item) => {
      const key = item[field];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  },

  // Calculate aggregations
  aggregate: (
    data: any[],
    field: string,
    operation: "sum" | "average" | "count" | "min" | "max"
  ) => {
    const values = data
      .map((item) => item[field])
      .filter((val) => typeof val === "number");

    switch (operation) {
      case "sum":
        return values.reduce((sum, val) => sum + val, 0);
      case "average":
        return values.length > 0
          ? values.reduce((sum, val) => sum + val, 0) / values.length
          : 0;
      case "count":
        return values.length;
      case "min":
        return Math.min(...values);
      case "max":
        return Math.max(...values);
      default:
        return 0;
    }
  },

  // Sort data by field
  sortBy: (data: any[], field: string, direction: "asc" | "desc" = "asc") => {
    return [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (direction === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  },
};

// Export default
export default chartData;
