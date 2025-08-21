import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from "antd";
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
  const { chartType } = useSelector((s: RootState) => s.chart) as ChartState;

  const btn = (
    key: ChartState["chartType"],
    title: string,
    icon: React.ReactNode
  ) => (
    <Button
      onClick={() => dispatch(setChartType(key))}
      className={`chart-type-button ${chartType === key ? "active" : ""}`}
      title={title}
    >
      {icon}
    </Button>
  );

  return (
    <Space>
      {btn("stackedColumn", "Stacked Column", <BarChart4 size={20} />)}
      {btn("clusteredColumn", "Clustered Column", <BarChart2 size={20} />)}
      {btn("lineAndColumn", "Line & Column", <LineChartIcon size={20} />)}
      {btn("pie", "Pie Chart", <PieChartIcon size={20} />)}
      {btn("line", "Line Chart", <TrendingUp size={20} />)}
      {btn(
        "stackedBar",
        "Stacked Bar",
        <BarChart4 size={20} style={{ transform: "rotate(90deg)" }} />
      )}
      {btn(
        "clusteredBar",
        "Clustered Bar",
        <BarChart2 size={20} style={{ transform: "rotate(90deg)" }} />
      )}
    </Space>
  );
};

export default ChartToolbar;
