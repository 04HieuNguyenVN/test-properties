import React, { useState } from "react";
import { Card, Typography, Button, Space, Tooltip } from "antd";
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
        return chartData.monthlyData;
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
          <Tooltip title="Xem dữ liệu gốc dạng JSON">
            <Code size={16} />
          </Tooltip>
          <Tooltip title="Bảng dữ liệu gốc của biểu đồ, có thể copy hoặc xem chi tiết">
            <Title level={5} className="panel-title">
              JSON DATA{" "}
              {selectedData && selectedData.length > 0 && "(Selected)"}
            </Title>
          </Tooltip>
          <Tooltip title="Ẩn/hiện dữ liệu JSON">
            <Button
              type="text"
              size="small"
              icon={showRawData ? <EyeOff size={14} /> : <Eye size={14} />}
              onClick={() => setShowRawData(!showRawData)}
            />
          </Tooltip>
          {selectedData && selectedData.length > 0 && (
            <Tooltip title="Đặt lại về dữ liệu gốc">
              <Button
                type="text"
                size="small"
                icon={<RotateCcw size={14} />}
                onClick={handleReset}
                title="Reset to default data"
              />
            </Tooltip>
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
