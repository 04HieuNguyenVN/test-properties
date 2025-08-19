import { Column } from "@ant-design/plots";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRawChartData } from "../../store/chartSlice";
import chartData from "../../data/chartData.json";

interface StackedColumnChartProps {
  config?: any;
}

const StackedColumnChart: React.FC<StackedColumnChartProps> = ({ config }) => {
  const dispatch = useDispatch();
  // Dùng trực tiếp stackedData trong chartData.json
  const rawData = chartData.stackedData;
  const transformedData = rawData.flatMap((item) => [
    { category: item.category, series: "Series 1", value: item.series1 },
    { category: item.category, series: "Series 2", value: item.series2 },
    { category: item.category, series: "Series 3", value: item.series3 },
  ]);

  useEffect(() => {
    dispatch(setRawChartData(rawData));
  }, [dispatch, rawData]);

  const defaultConfig = {
    data: transformedData,
    encode: {
      x: "category",
      y: "value",
      color: "series",
    },
    transform: [{ type: "stackY" }],
    legend: { position: "top" },
    axis: {
      x: { title: "Danh mục" },
      y: { title: "Giá trị" },
    },
    tooltip: {
      title: (d: any) => d.category,
      items: (d: any) => [{ name: d.series, value: d.value }],
    },
  };

  // Merge custom config if provided
  const mergedConfig = config ? { ...defaultConfig, ...config } : defaultConfig;

  return <Column {...mergedConfig} />;
};

export default StackedColumnChart;
