import React from "react";
import { Typography, Switch } from "antd";
import { useTranslation } from "react-i18next";

const SlicesPanel: React.FC<{
  cfg: any;
  onUpdate: (section: string, key: string, value: any) => void;
}> = ({ cfg, onUpdate }) => {
  const { t } = useTranslation("formatTab");
  return (
    <div className="section-content">
      <div className="form-group">
        <Typography.Text className="form-label">
          {t("slices.showSlices", "Show slices")}
        </Typography.Text>
        <Switch
          size="small"
          checked={cfg.enabled !== false}
          onChange={(v) => onUpdate("slices", "enabled", v)}
        />
      </div>
    </div>
  );
};

export default SlicesPanel;
