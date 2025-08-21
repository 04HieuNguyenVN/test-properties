import React from "react";
import { Input, Typography } from "antd";
import ConfigSection from "../../common/ConfigSection";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

export default function ContentSection({
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
  return (
    <ConfigSection
      title="Content"
      isExpanded={expanded.tooltipsOptions}
      onToggle={() => toggle("tooltipsOptions")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Text</Typography.Text>
          <Input.TextArea
            value={settings.tooltips.options.text}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  options: { ...p.tooltips.options, text: e.target.value },
                },
              }))
            }
            rows={3}
          />
        </div>
      </div>
    </ConfigSection>
  );
}
