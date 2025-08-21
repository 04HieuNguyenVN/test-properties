import React from "react";
import { InputNumber, Select, Switch, Typography } from "antd";
import ConfigSection from "../../common/ConfigSection";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const { Option } = Select;

export default function DividerSection({
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
  const d = settings.title.divider;

  return (
    <ConfigSection
      title="Divider"
      isExpanded={expanded.divider}
      onToggle={() => toggle("divider")}
      hasToggle
      toggleValue={d.enabled}
      onToggleChange={(checked) =>
        setSettings((p) => ({
          ...p,
          title: {
            ...p.title,
            divider: { ...p.title.divider, enabled: checked },
          },
        }))
      }
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Color</Typography.Text>
          <CustomColorPicker
            label=""
            value={d.color}
            onChange={(color) =>
              setSettings((p) => ({
                ...p,
                title: { ...p.title, divider: { ...p.title.divider, color } },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">Line style</Typography.Text>
          <Select
            size="small"
            value={d.lineStyle}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  divider: { ...p.title.divider, lineStyle: v },
                },
              }))
            }
            style={{ width: "100%" }}
          >
            <Option value="Solid">Solid</Option>
            <Option value="Dashed">Dashed</Option>
            <Option value="Dotted">Dotted</Option>
          </Select>
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">Width</Typography.Text>
          <InputNumber
            size="small"
            value={d.width}
            min={0}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  divider: { ...p.title.divider, width: v ?? d.width },
                },
              }))
            }
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">
              Ignore padding
            </Typography.Text>
            <Switch
              size="small"
              checked={d.ignorePadding}
              onChange={(checked) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    divider: { ...p.title.divider, ignorePadding: checked },
                  },
                }))
              }
            />
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
