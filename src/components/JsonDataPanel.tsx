import React, { useState } from "react";
import { Card, Typography, Button, Space, Tooltip } from "antd";
import { Code, Eye, EyeOff, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
// ❌ Không import chartData
import { setSelectedData } from "../store/chart";
import "../styles/data/data-display.css";

const { Title } = Typography;

type JsonDataPanelProps = {
  chartType: string;
  rawData: any[];
  selectedData?: any[];
  onReset?: () => void;
};

const JsonDataPanel: React.FC<JsonDataPanelProps> = ({
  chartType,
  rawData,
  selectedData: selectedDataProp,
  onReset,
}) => {
  const [showRawData, setShowRawData] = useState(true);
  const dispatch = useDispatch();

  // Nếu có selectedData từ props thì dùng, không thì để rỗng (panel này chủ yếu để xem rawData)
  const selectedData =
    typeof selectedDataProp !== "undefined" ? selectedDataProp : [];

  const handleReset = () => {
    if (onReset) return onReset();
    dispatch(setSelectedData([]));
  };

  const selectedDataOrRaw =
    selectedData && selectedData.length > 0 ? selectedData : rawData;

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
              />
            </Tooltip>
          )}
        </Space>
      </div>

      {showRawData && (
        <div className="panel-content">
          <div className="json-display">
            <pre>{JSON.stringify(selectedDataOrRaw, null, 2)}</pre>
          </div>
        </div>
      )}
    </Card>
  );
};

export default JsonDataPanel;
