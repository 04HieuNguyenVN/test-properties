import React from "react";
import { InputNumber, Select, Typography } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import TextStyleToggles from "../../common/TextStyleToggles";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const { Option } = Select;

export default function TextSection({
  settings,
  setSettings,
  expanded,
  toggle,
}: {
  settings: GeneralSettings;
  setSettings: React.Dispatch<React.SetStateAction<GeneralSettings>>;
  expanded: ExpandedState;
  toggle: ToggleFn;
}) {
  const tt = settings.tooltips.text;
  const { t } = useTranslation("generalTab");

  return (
    <ConfigSection
      title={"tooltipsText.title"}
      isExpanded={expanded.tooltipsText}
      onToggle={() => toggle("tooltipsText")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("tooltipsText.font")}
          </Typography.Text>
          <Select
            size="small"
            value={tt.font}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  text: { ...p.tooltips.text, font: v },
                },
              }))
            }
            style={{ width: "100%" }}
          >
            <Option value="Segoe UI">{t("tooltipsText.fontSegoeUI")}</Option>
            <Option value="DIN">{t("tooltipsText.fontDIN")}</Option>
            <Option value="Arial">{t("tooltipsText.fontArial")}</Option>
          </Select>
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("tooltipsText.fontSize")}
          </Typography.Text>
          <InputNumber
            size="small"
            value={tt.fontSize}
            min={6}
            max={72}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  text: { ...p.tooltips.text, fontSize: v ?? tt.fontSize },
                },
              }))
            }
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <TextStyleToggles
            bold={tt.bold}
            italic={tt.italic}
            underline={tt.underline}
            onChange={(next) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  text: { ...p.tooltips.text, ...next },
                },
              }))
            }
          />
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">
            {t("tooltipsText.labelColor")}
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={tt.labelColor}
            onChange={(c) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  text: { ...p.tooltips.text, labelColor: c },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("tooltipsText.valueColor")}
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={tt.valueColor}
            onChange={(c) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  text: { ...p.tooltips.text, valueColor: c },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("tooltipsText.drillTextAndIconColor")}
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={tt.drillTextAndIconColor}
            onChange={(c) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  text: { ...p.tooltips.text, drillTextAndIconColor: c },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
      </div>
    </ConfigSection>
  );
}
