import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  BarChart4,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
} from "lucide-react";
import { setChartType, type ChartState } from "../store/chartSlice";
import type { RootState } from "../store/store";

const ChartToolbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chartType } = useSelector((s: RootState) => s.chart) as ChartState;
  const { t, i18n } = useTranslation("charts");

  // Force re-render on language change
  React.useEffect(() => {}, [i18n.language]);

  const btn = (
    key: ChartState["chartType"],
    chartKey: string,
    icon: React.ReactNode,
    defaultLabel: string
  ) => (
    <Button
      onClick={() => {
        navigate(`/chart/${key}`);
      }}
      className={`chart-type-button ${chartType === key ? "active" : ""}`}
      title={t(chartKey, defaultLabel)}
    >
      {icon}
    </Button>
  );

  return (
    <Space>
      {btn(
        "stackedColumn",
        "stackedColumn",
        <BarChart4 size={20} />,
        "Stacked Column"
      )}
      {btn(
        "clusteredColumn",
        "clusteredColumn",
        <BarChart2 size={20} />,
        "Clustered Column"
      )}
      {btn(
        "lineAndColumn",
        "lineAndColumn",
        <LineChartIcon size={20} />,
        "Line & Column"
      )}
      {btn("pie", "pie", <PieChartIcon size={20} />, "Pie")}
      {btn("line", "line", <TrendingUp size={20} />, "Line")}
      {btn(
        "stackedBar",
        "stackedBar",
        <BarChart4 size={20} style={{ transform: "rotate(90deg)" }} />,
        "Stacked Bar"
      )}
      {btn(
        "clusteredBar",
        "clusteredBar",
        <BarChart2 size={20} style={{ transform: "rotate(90deg)" }} />,
        "Clustered Bar"
      )}
    </Space>
  );
};

export default ChartToolbar;
