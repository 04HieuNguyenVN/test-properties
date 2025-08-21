import React from "react";
import { InputNumber, Switch, Typography } from "antd";
import ConfigSection from "../../common/ConfigSection";
import type {
  GeneralSettings,
  ExpandedState,
  UpdateFn,
  ToggleFn,
} from "../../types";

export default function SizeSection({
  settings,
  update,
  expanded,
  toggle,
}: {
  settings: GeneralSettings;
  update: UpdateFn;
  expanded: ExpandedState;
  toggle: ToggleFn;
}) {
  return (
    <ConfigSection
      title="Size"
      isExpanded={expanded.size}
      onToggle={() => toggle("size")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">Height</Typography.Text>
          <InputNumber
            size="small"
            value={settings.size.height}
            onChange={(v) => update("size", "height", v)}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">Width</Typography.Text>
          <InputNumber
            size="small"
            value={settings.size.width}
            onChange={(v) => update("size", "width", v)}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">
              Lock aspect ratio
            </Typography.Text>
            <Switch
              size="small"
              checked={settings.size.lockAspectRatio}
              onChange={(checked) => update("size", "lockAspectRatio", checked)}
            />
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
