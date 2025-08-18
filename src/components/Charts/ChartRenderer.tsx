import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import { Bar as AntBar, Column as AntColumn } from "@ant-design/charts";
import { Bar as AntPlotBar } from "@ant-design/plots";
import { ChartType } from "../../types/interfaces";
import {
  COLORS,
  sampleData,
  monthlyData,
  populationData,
  testStackedData,
} from "../../constants/data";

interface ChartRendererProps {
  chartType: ChartType;
  config?: any;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartType, config }) => {
  const renderChart = () => {
    switch (chartType) {
      case "column": // Column Chart (Vertical)
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sampleData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {config.legend?.enabled && <Legend />}
              <Bar dataKey="population" fill="#8884d8" />
              <Bar dataKey="gdp" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line": // Line Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              {config.legend?.enabled && <Legend />}
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie": // Pie Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={populationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="population"
              >
                {populationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              {config.legend?.enabled && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );

      case "stackedColumn": // Stacked Column Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={testStackedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar dataKey="desktop" stackId="a" fill="#8884d8" />
              <Bar dataKey="mobile" stackId="a" fill="#82ca9d" />
              <Bar dataKey="tablet" stackId="a" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "clusteredColumn": // Clustered Column Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={testStackedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar dataKey="desktop" fill="#8884d8" />
              <Bar dataKey="mobile" fill="#82ca9d" />
              <Bar dataKey="tablet" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "lineAndColumn": // Line and Column Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              {config.legend?.enabled && <Legend />}
              <Bar dataKey="visitors" fill="#8884d8" />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ff7300"
                strokeWidth={3}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case "bar": // Bar Chart (Horizontal)
        const barData = monthlyData.flatMap((item) => [
          { label: item.month, type: "visitors", value: item.visitors },
          { label: item.month, type: "revenue", value: item.revenue },
        ]);

        const barConfig = {
          data: barData,
          xField: "value",
          yField: "label",
          colorField: "type",
          scale: {
            y: {
              padding: 0.5,
            },
          },
          style: {
            height: 10,
          },
          color: {
            visitors: "#0088FE",
            revenue: "#00C49F",
          },
          legend: {
            position: "top",
          },
        };
        return <AntPlotBar {...barConfig} />;

      case "stackedBar": // Stacked Bar Chart (Horizontal)
        const stackedBarConfig = {
          data: populationData,
          xField: "population",
          yField: "age",
          stack: true,
          scale: {
            y: {
              padding: 0.5,
            },
          },
          color: {
            "Series 1": "#1f77b4",
            "Series 2": "#ff7f0e",
            "Series 3": "#2ca02c",
          },
          legend: {
            position: "top",
          },
          tooltip: {
            formatter: (datum: any) => {
              return {
                name: datum.age,
                value: `${datum.population}`,
              };
            },
          },
        };
        return <AntPlotBar {...stackedBarConfig} />;

      case "clusteredBar": // Clustered Bar Chart (Horizontal)
        const clusteredBarData = monthlyData.flatMap((item) => [
          { label: item.month, type: "visitors", value: item.visitors },
          { label: item.month, type: "revenue", value: item.revenue },
        ]);

        const clusteredBarConfig = {
          data: clusteredBarData,
          xField: "value",
          yField: "label",
          colorField: "type",
          scale: {
            y: {
              padding: 0.5,
            },
          },
          group: true,
          style: {
            height: 10,
          },
          color: {
            visitors: "#0088FE",
            revenue: "#00C49F",
          },
          legend: {
            position: "top",
          },
        };
        return <AntPlotBar {...clusteredBarConfig} />;

      default:
        return null;
    }
  };

  return <div className="chart-render-area">{renderChart()}</div>;
};

export default ChartRenderer;
