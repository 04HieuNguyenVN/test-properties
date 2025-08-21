import React from "react";
import { Typography } from "antd";
import ConfigSection from "../../common/ConfigSection";
import NumberSlider from "../../common/NumberSlider";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

export default function ColorsSection({
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
  const c = settings.headerIcons.colors;

  return (
    <ConfigSection
      title="Colors"
      isExpanded={expanded.headerIconsColors}
      onToggle={() => toggle("headerIconsColors")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Background</Typography.Text>
          <CustomColorPicker
            label=""
            value={c.background}
            onChange={(color) =>
              setSettings((p) => ({
                ...p,
                headerIcons: {
                  ...p.headerIcons,
                  colors: { ...p.headerIcons.colors, background: color },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">Border</Typography.Text>
          <CustomColorPicker
            label=""
            value={c.border}
            onChange={(color) =>
              setSettings((p) => ({
                ...p,
                headerIcons: {
                  ...p.headerIcons,
                  colors: { ...p.headerIcons.colors, border: color },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">Icon</Typography.Text>
          <CustomColorPicker
            label=""
            value={c.icon}
            onChange={(color) =>
              setSettings((p) => ({
                ...p,
                headerIcons: {
                  ...p.headerIcons,
                  colors: { ...p.headerIcons.colors, icon: color },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">Transparency</Typography.Text>
          <NumberSlider
            value={c.transparency}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                headerIcons: {
                  ...p.headerIcons,
                  colors: { ...p.headerIcons.colors, transparency: v },
                },
              }))
            }
            min={0}
            max={100}
            asPercent
          />
        </div>
      </div>
    </ConfigSection>
  );
}
