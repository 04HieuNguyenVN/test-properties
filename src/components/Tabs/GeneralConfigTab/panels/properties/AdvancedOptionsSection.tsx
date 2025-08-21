import React from "react";
import { Select, Switch, Typography } from "antd";
import ConfigSection from "../../common/ConfigSection";
import type {
  GeneralSettings,
  ExpandedState,
  UpdateFn,
  ToggleFn,
} from "../../types";

function AdvancedOptions({
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
      title="Advanced options"
      isExpanded={expanded.advanced}
      onToggle={() => toggle("advanced")}
    >
      <div className="section-content">
        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">Responsive</Typography.Text>
            <Switch
              size="small"
              checked={settings.advanced.responsive}
              onChange={(v) => update("advanced", "responsive", v)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">
              Maintain layer order
            </Typography.Text>
            <Switch
              size="small"
              checked={settings.advanced.maintainLayerOrder}
              onChange={(v) => update("advanced", "maintainLayerOrder", v)}
            />
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}

/** Nhóm 'Data format' trong file gốc */
function DataFormatRoot({
  settings,
  update,
}: {
  settings: GeneralSettings;
  update: UpdateFn;
}) {
  return (
    <>
      <div className="form-group">
        <Typography.Text className="form-label">
          Apply settings to
        </Typography.Text>
        <Select
          size="small"
          value={settings.dataFormat.applySettingsTo}
          onChange={(v) => update("dataFormat", "applySettingsTo", v)}
          style={{ width: "100%" }}
        >
          <Select.Option value="Khu vực">Khu vực</Select.Option>
          <Select.Option value="Tất cả">Tất cả</Select.Option>
          <Select.Option value="Tùy chọn">Tùy chọn</Select.Option>
        </Select>
      </div>
      <ConfigSection
        title="Format options"
        isExpanded={false}
        onToggle={() => {}}
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">Format</Typography.Text>
            <Select
              size="small"
              value={settings.dataFormat.format}
              onChange={(v) => update("dataFormat", "format", v)}
              style={{ width: "100%" }}
              placeholder="Select format"
            >
              <Select.Option value="General">General</Select.Option>
              <Select.Option value="Number">Number</Select.Option>
              <Select.Option value="Currency">Currency</Select.Option>
              <Select.Option value="Percentage">Percentage</Select.Option>
              <Select.Option value="Date">Date</Select.Option>
              <Select.Option value="Custom">Custom</Select.Option>
            </Select>
          </div>
        </div>
      </ConfigSection>
    </>
  );
}

const AdvancedOptionsSection = Object.assign(AdvancedOptions, {
  DataFormatRoot,
});
export default AdvancedOptionsSection;
