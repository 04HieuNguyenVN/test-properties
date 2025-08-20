import React, { useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChartRenderer from "./ChartRenderer";
import { RootState } from "../store/store";
import { setChartType } from "../store/chartSlice";

const ChartRoute: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const dispatch = useDispatch();
  const chartConfigs = useSelector((state: RootState) => state.chart.chartConfigs);

  useEffect(() => {
    if (type) {
      dispatch(setChartType(type as any));
    }
  }, [type, dispatch]);

  if (!type) return null;
  const currentConfig = chartConfigs[type];
  if (!currentConfig) return <div>Chart type not found</div>;

  return <ChartRenderer chartType={type} config={currentConfig.format} />;
};

const ChartRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/stackedColumn" replace />} />
    <Route path=":type" element={<ChartRoute />} />
  </Routes>
);

export default ChartRoutes;
