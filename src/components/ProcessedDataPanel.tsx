import React from "react";
import { Card, Typography, Space, Tooltip } from "antd";
import { Database } from "lucide-react";

const { Title } = Typography;

// ===== Panel hiển thị dữ liệu đã xử lý (COUNT, SUM, ...) =====
const ProcessedDataPanel: React.FC = () => {
  return (
    <Card className="data-panel processed-data-panel">
      <div className="panel-header">
        <Space>
          {/* Icon dữ liệu đã xử lý */}
          <Tooltip title="Xem dữ liệu đã xử lý, tổng hợp (COUNT, SUM, ...)">
            <Database size={16} />
          </Tooltip>
          {/* Tiêu đề panel */}
          <Tooltip title="Bảng dữ liệu đã xử lý, tổng hợp từ dữ liệu gốc">
            <Title level={5} className="panel-title">
              PROCESSED DATA (COUNT, SUM,...)
            </Title>
          </Tooltip>
        </Space>
      </div>
      {/* Chưa có nội dung trong panel body */}
    </Card>
  );
};

export default ProcessedDataPanel;
