import React from "react";
import { InputNumber, Select, Typography } from "antd";
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
  const t = settings.tooltips.text;

  return (
    <ConfigSection
      title="Text"
      isExpanded={expanded.tooltipsText}
      onToggle={() => toggle("tooltipsText")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Font</Typography.Text>
          <Select
            size="small"
            value={t.font}
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
            <Option value="Segoe UI">Segoe UI</Option>
            <Option value="DIN">DIN</Option>
            <Option value="Arial">Arial</Option>
          </Select>
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">Font size</Typography.Text>
          <InputNumber
            size="small"
            value={t.fontSize}
            min={6}
            max={72}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  text: { ...p.tooltips.text, fontSize: v ?? t.fontSize },
                },
              }))
            }
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <TextStyleToggles
            bold={t.bold}
            italic={t.italic}
            underline={t.underline}
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
          <Typography.Text className="form-label">Label color</Typography.Text>
          <CustomColorPicker
            label=""
            value={t.labelColor}
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
          <Typography.Text className="form-label">Value color</Typography.Text>
          <CustomColorPicker
            label=""
            value={t.valueColor}
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
            Drill text & icon color
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={t.drillTextAndIconColor}
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
