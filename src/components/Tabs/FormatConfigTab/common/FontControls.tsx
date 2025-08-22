import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Select, InputNumber, Button, Space } from "antd";
import { Bold, Italic, Underline } from "lucide-react";
import { CustomColorPicker } from "../../../common/CustomColorPicker";

const FontControls: React.FC<{
  config: any;
  section: string;
  onUpdate: (section: string, key: string, value: any) => void;
}> = ({ config, section, onUpdate }) => {
  const { t } = useTranslation("common");
  return (
    <div className="font-controls">
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div className="font-controls-grid">
          <div>
            <Typography.Text
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              {t("font", "Font")}
            </Typography.Text>
            <Select
              size="small"
              value={config.font || "Segoe UI"}
              onChange={(v) => onUpdate(section, "font", v)}
              style={{ width: "100%" }}
              options={[
                { label: "Segoe UI", value: "Segoe UI" },
                { label: "Arial", value: "Arial" },
                { label: "DIN", value: "DIN" },
                { label: "Calibri", value: "Calibri" },
              ]}
            />
          </div>
          <div>
            <Typography.Text
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              {t("fontSize", "Size")}
            </Typography.Text>
            <InputNumber
              size="small"
              value={config.fontSize || 9}
              min={6}
              max={72}
              onChange={(v) => onUpdate(section, "fontSize", v)}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div>
          <Typography.Text
            style={{ fontSize: 12, display: "block", marginBottom: 4 }}
          >
            {t("formatting", "Formatting")}
          </Typography.Text>
          <Space size="small">
            <Button
              size="small"
              type={config.bold ? "primary" : "default"}
              icon={<Bold size={12} />}
              onClick={() => onUpdate(section, "bold", !config.bold)}
            />
            <Button
              size="small"
              type={config.italic ? "primary" : "default"}
              icon={<Italic size={12} />}
              onClick={() => onUpdate(section, "italic", !config.italic)}
            />
            <Button
              size="small"
              type={config.underline ? "primary" : "default"}
              icon={<Underline size={12} />}
              onClick={() => onUpdate(section, "underline", !config.underline)}
            />
          </Space>
        </div>

        <CustomColorPicker
          label={t("color.label", "Color")}
          value={config.color}
          onChange={(color) => onUpdate(section, "color", color)}
        />
      </Space>
    </div>
  );
};

export default FontControls;
