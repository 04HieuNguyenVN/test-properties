import React from "react";
import { Typography, Switch } from "antd";

const SlicesPanel: React.FC<{
  cfg: any;
  onUpdate: (section: string, key: string, value: any) => void;
}> = ({ cfg, onUpdate }) => (
  <div className="section-content">
    <div className="form-group">
      <Typography.Text className="form-label">Show slices</Typography.Text>
      <Switch
        size="small"
        checked={cfg.enabled !== false}
        onChange={(v) => onUpdate("slices", "enabled", v)}
      />
    </div>
  </div>
);

export default SlicesPanel;
