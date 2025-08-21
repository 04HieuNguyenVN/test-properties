import React from "react";
import { Typography, Select, InputNumber, Button, Input } from "antd";
import { Bold, Italic, Underline, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_FAMILY_OPTIONS } from "../../../../constants";
import { CustomColorPicker } from "../../../common/CustomColorPicker";
import ConfigSection from "../common/ConfigSection";

type Props = {
  cfg: any;
  expanded: any;
  onToggle: (k: string) => void;
  onUpdate: (section: string, key: string, value: any) => void;
};

const LegendPanel: React.FC<Props> = ({
  cfg,
  expanded,
  onToggle,
  onUpdate,
}) => {
  const { t } = useTranslation();
  return (
    <div className="properties-container">
      <ConfigSection
        title={t("formatTab.legend.options", "Options")}
        isExpanded={expanded.legendOptions}
        onToggle={() => onToggle("legendOptions")}
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">
              {t("formatTab.legend.position", "Position")}
            </Typography.Text>
            <Select
              size="small"
              value={cfg.position || "Top"}
              onChange={(v) => onUpdate("legend", "position", v)}
              style={{ width: "100%" }}
              options={[
                {
                  label: t("formatTab.legend.positionTop", "Top"),
                  value: "Top",
                },
                {
                  label: t("formatTab.legend.positionBottom", "Bottom"),
                  value: "Bottom",
                },
                {
                  label: t("formatTab.legend.positionLeft", "Left"),
                  value: "Left",
                },
                {
                  label: t("formatTab.legend.positionRight", "Right"),
                  value: "Right",
                },
                {
                  label: t(
                    "formatTab.legend.positionCenterRight",
                    "Center right"
                  ),
                  value: "Center right",
                },
              ]}
            />
          </div>
        </div>
      </ConfigSection>

      <ConfigSection
        title={t("formatTab.legend.text", "Text")}
        isExpanded={expanded.legendText}
        onToggle={() => onToggle("legendText")}
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">
              {t("formatTab.legend.font", "Font")}
            </Typography.Text>
            <div className="font-controls">
              <Select
                size="small"
                value={cfg.font || "Segoe UI"}
                onChange={(v) => onUpdate("legend", "font", v)}
                style={{ width: 120 }}
                options={FONT_FAMILY_OPTIONS}
              />
              <InputNumber
                size="small"
                value={cfg.fontSize || 10}
                onChange={(v) => onUpdate("legend", "fontSize", v)}
                style={{ width: 60 }}
                min={8}
                max={72}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="text-format-buttons">
              <Button
                size="small"
                type={cfg.bold ? "primary" : "default"}
                icon={<Bold size={12} />}
                onClick={() => onUpdate("legend", "bold", !cfg.bold)}
                title={t("formatTab.legend.bold", "Bold")}
              />
              <Button
                size="small"
                type={cfg.italic ? "primary" : "default"}
                icon={<Italic size={12} />}
                onClick={() => onUpdate("legend", "italic", !cfg.italic)}
                title={t("formatTab.legend.italic", "Italic")}
              />
              <Button
                size="small"
                type={cfg.underline ? "primary" : "default"}
                icon={<Underline size={12} />}
                onClick={() => onUpdate("legend", "underline", !cfg.underline)}
                title={t("formatTab.legend.underline", "Underline")}
              />
            </div>
          </div>

          <CustomColorPicker
            label={t("formatTab.legend.color", "Color")}
            value={cfg.color}
            onChange={(c) => onUpdate("legend", "color", c)}
          />
        </div>
      </ConfigSection>

      <ConfigSection
        title={t("formatTab.legend.title", "Title")}
        isExpanded={expanded.legendTitle}
        onToggle={() => onToggle("legendTitle")}
        hasToggle
        toggleValue={cfg.title?.enabled !== false}
        onToggleChange={(checked) =>
          onUpdate("legend", "title", { ...cfg.title, enabled: checked })
        }
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">
              {t("formatTab.legend.titleText", "Title text")}
            </Typography.Text>
            <Input
              size="small"
              value={
                cfg.title?.text || t("formatTab.legend.defaultTitle", "Legend")
              }
              onChange={(e) =>
                onUpdate("legend", "title", {
                  ...cfg.title,
                  text: e.target.value,
                })
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </ConfigSection>

      <div className="reset-section">
        <Button
          type="link"
          icon={<RotateCcw size={14} />}
          style={{ padding: 16, fontSize: 12, color: "#0078d4" }}
          onClick={() => {
            onUpdate("legend", "position", "Top");
            onUpdate("legend", "font", "Segoe UI");
            onUpdate("legend", "fontSize", 8);
            onUpdate("legend", "bold", false);
            onUpdate("legend", "italic", false);
            onUpdate("legend", "underline", false);
            onUpdate("legend", "color", "#666666");
            onUpdate("legend", "title", {
              enabled: true,
              text: t("formatTab.legend.defaultTitle", "Legend"),
            });
          }}
        >
          {t("formatTab.reset", "Reset to default")}
        </Button>
      </div>
    </div>
  );
};

export default LegendPanel;
