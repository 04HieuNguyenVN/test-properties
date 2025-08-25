import React from "react";
import { Card, Typography, Space, Tooltip, Button } from "antd";
import { Database, Send } from "lucide-react";

const { Title } = Typography;

type ProcessedDataPanelProps = {
  chartType: string;
  data: any[]; // dữ liệu đã xử lý/chuẩn hoá ban đầu từ Provider
  onUseInChart: (nextData: any[]) => void; // callback đẩy dữ liệu lên Chart
  processSummary?: { key: string; value: number }[]; // các kết quả action (sum/count/etc)
};

import "../styles/processed-data-panel.css";

const ProcessedDataPanel: React.FC<ProcessedDataPanelProps> = ({
  chartType,
  data,
  onUseInChart,
  processSummary = [],
}) => {
  // Ở đây bạn có thể thực hiện các bước xử lý/aggregate/sort...
  // Hiện tại demo: giữ nguyên hoặc có thể biến đổi tuỳ ý.
  const [processed, setProcessed] = React.useState<any[]>(data);

  // Reset khi chartType/data gốc đổi
  React.useEffect(() => {
    setProcessed(data);
  }, [data, chartType]);

  // Tự động đẩy dữ liệu đã xử lý cho Chart mỗi khi processed thay đổi
  React.useEffect(() => {
    onUseInChart(processed);
  }, [processed, onUseInChart]);

  return (
    <Card className="data-panel processed-data-panel">
      <div className="panel-header">
        <Space>
          <Tooltip title="Xem dữ liệu đã xử lý, tổng hợp (COUNT, SUM, ...)">
            <Database size={16} />
          </Tooltip>
          <Title level={5} className="panel-title">
            PROCESSED DATA → CHART
          </Title>

          {/* Nút đẩy thủ công (phòng khi bạn muốn kiểm soát) */}
          <Tooltip title="Dùng dữ liệu này cho biểu đồ">
            <Button
              size="small"
              type="primary"
              icon={<Send size={14} />}
              onClick={() => onUseInChart(processed)}
            >
              Use in chart
            </Button>
          </Tooltip>
        </Space>
      </div>

      {processSummary && processSummary.length > 0 && (
        <div className="process-summary-wrapper">
          <Card size="small" title="Process Summary">
            <ul className="process-summary-list">
              {processSummary.map((p) => (
                <li key={p.key}>
                  <strong>{p.key}:</strong> {p.value}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      <div className="panel-content">
        <div className="json-display">
          <pre>{JSON.stringify(processed, null, 2)}</pre>
        </div>
      </div>
    </Card>
  );
};

export default ProcessedDataPanel;
