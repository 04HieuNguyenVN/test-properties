import React from "react";
import { Select, Typography, Switch } from "antd";
import ConfigSection from "../../common/ConfigSection";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const { Option } = Select;

export default function ShadowSection({
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
  const sh = settings.effects.shadow;

  return (
    <ConfigSection
      title="Shadow"
      isExpanded={expanded.shadow}
      onToggle={() => toggle("shadow")}
      hasToggle
      toggleValue={sh.enabled}
      onToggleChange={(checked) =>
        setSettings((p) => ({
          ...p,
          effects: {
            ...p.effects,
            shadow: { ...p.effects.shadow, enabled: checked },
          },
        }))
      }
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Color</Typography.Text>
          <CustomColorPicker
            label=""
            value={sh.color}
            onChange={(c) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  shadow: { ...p.effects.shadow, color: c },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">Offset</Typography.Text>
          <Select
            size="small"
            value={sh.offset}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  shadow: { ...p.effects.shadow, offset: v },
                },
              }))
            }
            style={{ width: "100%" }}
          >
            <Option value="Outside">Outside</Option>
            <Option value="Inside">Inside</Option>
          </Select>
        </div>

        <div className="form-group">
          <Typography.Text className="form-label">Position</Typography.Text>
          <Select
            size="small"
            value={sh.position}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  shadow: { ...p.effects.shadow, position: v },
                },
              }))
            }
            style={{ width: "100%" }}
          >
            <Option value="Bottom right">Bottom right</Option>
            <Option value="Bottom left">Bottom left</Option>
            <Option value="Top right">Top right</Option>
            <Option value="Top left">Top left</Option>
          </Select>
        </div>
      </div>
    </ConfigSection>
  );
}
