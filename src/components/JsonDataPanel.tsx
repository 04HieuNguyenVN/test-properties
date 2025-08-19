import React, { useState } from "react";
import { Card, Typography, Button, Space } from "antd";
import { Code, Eye, EyeOff, RotateCcw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

import chartData from "../data/chartData.json";
import { setSelectedData } from "../store/chartSlice";
import "../styles/data-display.css";

const { Title } = Typography;

const JsonDataPanel: React.FC = () => {
  const [showRawData, setShowRawData] = useState(true);
  const dispatch = useDispatch();

  const { chartType, selectedData } = useSelector(
    (state: RootState) => state.chart
  );

  // Map chartType to the correct data array from chartData.json
  const getChartDataArray = () => {
    switch (chartType) {
      case "stackedColumn":
      case "stackedBar":
        return chartData.stackedData;
      case "clusteredColumn":
      case "lineAndColumn":
      case "line":
      case "clusteredBar":
        return chartData.monthlyData;
      case "pie":
        return chartData.categories;
      default:
        return [];
    }
  };

  // Show selectedData if available, else show the correct chart data array
  const rawData =
    selectedData && selectedData.length > 0
      ? selectedData
      : getChartDataArray();

  const handleReset = () => {
    dispatch(setSelectedData([]));
  };

  return (
    <Card className="data-panel json-data-panel">
      <div className="panel-header">
        <Space>
          <Code size={16} />
          <Title level={5} className="panel-title">
            JSON DATA {selectedData && selectedData.length > 0 && "(Selected)"}
          </Title>
          <Button
            type="text"
            size="small"
            icon={showRawData ? <EyeOff size={14} /> : <Eye size={14} />}
            onClick={() => setShowRawData(!showRawData)}
          />
          {selectedData && selectedData.length > 0 && (
            <Button
              type="text"
              size="small"
              icon={<RotateCcw size={14} />}
              onClick={handleReset}
              title="Reset to default data"
            />
          )}
        </Space>
      </div>

      {showRawData && (
        <div className="panel-content">
          <div className="json-display">
            <pre>{JSON.stringify(rawData, null, 2)}</pre>
          </div>
        </div>
      )}
    </Card>
  );
};

export default JsonDataPanel;
