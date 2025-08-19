import React from "react";
import { Card, Typography, Space } from "antd";
import { Tooltip } from "antd";
import { Database } from "lucide-react";

const { Title } = Typography;

const ProcessedDataPanel: React.FC = () => {
  return (
    <Card className="data-panel processed-data-panel">
      <div className="panel-header">
        <Space>
          <Tooltip title="Xem dữ liệu đã xử lý, tổng hợp (COUNT, SUM, ...)">
            <Database size={16} />
          </Tooltip>
          <Tooltip title="Bảng dữ liệu đã xử lý, tổng hợp từ dữ liệu gốc">
            <Title level={5} className="panel-title">
              PROCESSED DATA (COUNT, SUM,...)
            </Title>
          </Tooltip>
        </Space>
      </div>
      {/* No content inside the panel body */}
    </Card>
  );
};

export default ProcessedDataPanel;
