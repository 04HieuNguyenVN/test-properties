import React from "react";
import { Card, Typography, Space } from "antd";
import { Database } from "lucide-react";

const { Title } = Typography;

const ProcessedDataPanel: React.FC = () => {
  return (
    <Card className="data-panel processed-data-panel">
      <div className="panel-header">
        <Space>
          <Database size={16} />
          <Title level={5} className="panel-title">
            PROCESSED DATA (COUNT, SUM,...)
          </Title>
        </Space>
      </div>
      {/* No content inside the panel body */}
    </Card>
  );
};

export default ProcessedDataPanel;
