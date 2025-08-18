import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface StackedColumnChartProps {
  data: any[];
  config: any;
}

export const StackedColumnChart: React.FC<StackedColumnChartProps> = ({
  data,
  config,
}) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {config.gridlines?.enabled && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={config.gridlines.color}
            strokeWidth={config.gridlines.strokeWidth}
          />
        )}
        <XAxis
          dataKey="city"
          tick={{
            fontSize: config.xAxis.fontSize,
            fill: config.xAxis.color,
            fontWeight: config.xAxis.bold ? "bold" : "normal",
          }}
        />
        <YAxis
          tick={{
            fontSize: config.yAxis.fontSize,
            fill: config.yAxis.color,
            fontWeight: config.yAxis.bold ? "bold" : "normal",
          }}
        />
        <Tooltip />
        {config.legend?.enabled && <Legend />}
        <Bar dataKey="<10" stackId="a" fill="#0088FE" name="<10" />
        <Bar dataKey="10-19" stackId="a" fill="#00C49F" name="10-19" />
        <Bar dataKey="20-29" stackId="a" fill="#FFBB28" name="20-29" />
        <Bar dataKey="30-39" stackId="a" fill="#FF8042" name="30-39" />
        <Bar dataKey="40-49" stackId="a" fill="#8884d8" name="40-49" />
        <Bar dataKey="50-59" stackId="a" fill="#82ca9d" name="50-59" />
        <Bar dataKey="60-69" stackId="a" fill="#ffc658" name="60-69" />
        <Bar dataKey="70-79" stackId="a" fill="#ff7300" name="70-79" />
        <Bar dataKey="≥80" stackId="a" fill="#8dd1e1" name="≥80" />
      </BarChart>
    </ResponsiveContainer>
  );
};
