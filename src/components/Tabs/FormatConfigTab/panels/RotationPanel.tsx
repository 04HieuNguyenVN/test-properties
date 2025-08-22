import React from "react";
import { Typography, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

const RotationPanel: React.FC<{
  cfg: any;
  onUpdate: (section: string, key: string, value: any) => void;
}> = ({ cfg, onUpdate }) => {
  const { t } = useTranslation("formatTab");
  return (
    <div className="section-content">
      <div className="form-group">
        <Typography.Text className="form-label">
          {t("rotation.angle", "Angle")}
        </Typography.Text>
        <InputNumber
          size="small"
          value={cfg.angle || 0}
          min={0}
          max={360}
          onChange={(v) => onUpdate("rotation", "angle", v)}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default RotationPanel;
