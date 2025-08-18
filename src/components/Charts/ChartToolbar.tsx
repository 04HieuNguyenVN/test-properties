import React from "react";
import { Space, Button } from "antd";
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  BarChart4,
  BarChart2,
  LineChart as LineChartIcon,
} from "lucide-react";
import { ChartType } from "../../types/interfaces";

interface ChartToolbarProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

const ChartToolbar: React.FC<ChartToolbarProps> = ({
  chartType,
  onChartTypeChange,
}) => {
  const chartButtons = [
    {
      type: "column" as ChartType,
      title: "Column",
      icon: <BarChart3 size={20} />,
    },
    {
      type: "stackedColumn" as ChartType,
      title: "Stacked Column",
      icon: <BarChart4 size={20} />,
    },
    {
      type: "clusteredColumn" as ChartType,
      title: "Clustered Column",
      icon: <BarChart2 size={20} />,
    },
    {
      type: "lineAndColumn" as ChartType,
      title: "Line and Column Chart",
      icon: <LineChartIcon size={20} />,
    },
    {
      type: "pie" as ChartType,
      title: "Pie Chart",
      icon: <PieChartIcon size={20} />,
    },
    {
      type: "line" as ChartType,
      title: "Line Chart",
      icon: <TrendingUp size={20} />,
    },
    {
      type: "bar" as ChartType,
      title: "Bar Chart",
      icon: <BarChart3 size={20} style={{ transform: "rotate(90deg)" }} />,
    },
    {
      type: "stackedBar" as ChartType,
      title: "Stacked Bar Chart",
      icon: <BarChart4 size={20} style={{ transform: "rotate(90deg)" }} />,
    },
    {
      type: "clusteredBar" as ChartType,
      title: "Clustered Bar Chart",
      icon: <BarChart2 size={20} style={{ transform: "rotate(90deg)" }} />,
    },
  ];

  return (
    <div className="chart-toolbar">
      <Space>
        {chartButtons.map((button) => (
          <Button
            key={button.type}
            onClick={() => onChartTypeChange(button.type)}
            className={`chart-type-button ${
              chartType === button.type ? "active" : ""
            }`}
            title={button.title}
          >
            {button.icon}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default ChartToolbar;
