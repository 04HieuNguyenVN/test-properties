import React from "react";
import { Typography, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { CustomColorPicker } from "../../../common/CustomColorPicker";

const GridlinesPanel: React.FC<{
  cfg: any;
  onUpdate: (section: string, key: string, value: any) => void;
}> = ({ cfg, onUpdate }) => {
  const { t } = useTranslation("formatTab");
  return (
    <div className="section-content">
      <CustomColorPicker
        label={t("gridlines.color", "Color")}
        value={cfg.color}
        onChange={(c) => onUpdate("gridlines", "color", c)}
      />
      <div className="form-group">
        <Typography.Text className="form-label">
          {t("gridlines.strokeWidth", "Stroke Width")}
        </Typography.Text>
        <InputNumber
          size="small"
          value={cfg.strokeWidth || 1}
          min={1}
          max={10}
          onChange={(v) => onUpdate("gridlines", "strokeWidth", v)}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default GridlinesPanel;
