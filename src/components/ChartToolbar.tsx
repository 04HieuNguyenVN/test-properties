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
  const { t } = useTranslation();

  const btn = (
    key: ChartState["chartType"],
    titleKey: string,
    icon: React.ReactNode
  ) => (
    <Button
      onClick={() => {
        navigate(`/chart/${key}`);
      }}
      className={`chart-type-button ${chartType === key ? "active" : ""}`}
      title={t(titleKey)}
    >
      {icon}
    </Button>
  );

  return (
    <Space>
      {btn("stackedColumn", "charts.stackedColumn", <BarChart4 size={20} />)}
      {btn(
        "clusteredColumn",
        "charts.clusteredColumn",
        <BarChart2 size={20} />
      )}
      {btn(
        "lineAndColumn",
        "charts.lineAndColumn",
        <LineChartIcon size={20} />
      )}
      {btn("pie", "charts.pie", <PieChartIcon size={20} />)}
      {btn("line", "charts.line", <TrendingUp size={20} />)}
      {btn(
        "stackedBar",
        "charts.stackedBar",
        <BarChart4 size={20} style={{ transform: "rotate(90deg)" }} />
      )}
      {btn(
        "clusteredBar",
        "charts.clusteredBar",
        <BarChart2 size={20} style={{ transform: "rotate(90deg)" }} />
      )}
    </Space>
  );
};

export default ChartToolbar;
