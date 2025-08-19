import { Column } from "@ant-design/plots";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRawChartData } from "../../store/chartSlice";
import chartData from "../../data/chartData.json";

// Props cho biểu đồ cột chồng dọc
interface StackedColumnChartProps {
  config?: any;
}

// Biểu đồ cột chồng dọc (Stacked Column Chart)
const StackedColumnChart: React.FC<StackedColumnChartProps> = ({ config }) => {
  const dispatch = useDispatch();
  // Lấy dữ liệu từ file chartData.json
  const rawData = chartData.stackedData;
  // Chuyển đổi dữ liệu thành dạng phù hợp cho biểu đồ chồng
  const transformedData = rawData.flatMap((item) => [
    { category: item.category, series: "Series 1", value: item.series1 },
    { category: item.category, series: "Series 2", value: item.series2 },
    { category: item.category, series: "Series 3", value: item.series3 },
  ]);

  // Đẩy dữ liệu gốc lên Redux khi mount
  useEffect(() => {
    dispatch(setRawChartData(rawData));
  }, [dispatch, rawData]);

  // Cấu hình mặc định cho biểu đồ cột chồng dọc
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

  // Gộp cấu hình custom nếu có
  const mergedConfig = config ? { ...defaultConfig, ...config } : defaultConfig;

  // Render biểu đồ
  return <Column {...mergedConfig} />;
};

export default StackedColumnChart;
