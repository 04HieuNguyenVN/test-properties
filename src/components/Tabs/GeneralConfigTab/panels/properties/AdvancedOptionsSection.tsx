import React from "react";
import { Select, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("generalTab");
  return (
    <ConfigSection
      title={"advanced.title"}
      isExpanded={expanded.advanced}
      onToggle={() => toggle("advanced")}
    >
      <div className="section-content">
        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">
              {t("advanced.responsive")}
            </Typography.Text>
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
              {t("advanced.maintainLayerOrder")}
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
  const { t } = useTranslation("generalTab");
  return (
    <>
      <div className="form-group">
        <Typography.Text className="form-label">
          {t("dataFormat.applySettingsTo")}
        </Typography.Text>
        <Select
          size="small"
          value={settings.dataFormat.applySettingsTo}
          onChange={(v) => update("dataFormat", "applySettingsTo", v)}
          style={{ width: "100%" }}
        >
          <Select.Option value="Khu vực">
            {t("dataFormat.applySettingsToArea", "Khu vực")}
          </Select.Option>
          <Select.Option value="Tất cả">
            {t("dataFormat.applySettingsToAll", "Tất cả")}
          </Select.Option>
          <Select.Option value="Tùy chọn">
            {t("dataFormat.applySettingsToCustom", "Tùy chọn")}
          </Select.Option>
        </Select>
      </div>
      <ConfigSection
        title={"dataFormat.title"}
        isExpanded={false}
        onToggle={() => {}}
      >
        <div className="section-content">
          <div className="form-group">
            <Typography.Text className="form-label">
              {t("dataFormat.format")}
            </Typography.Text>
            <Select
              size="small"
              value={settings.dataFormat.format}
              onChange={(v) => update("dataFormat", "format", v)}
              style={{ width: "100%" }}
              placeholder={t("dataFormat.selectFormat", "Select format")}
            >
              <Select.Option value="General">
                {t("dataFormat.formatGeneral", "General")}
              </Select.Option>
              <Select.Option value="Number">
                {t("dataFormat.formatNumber", "Number")}
              </Select.Option>
              <Select.Option value="Currency">
                {t("dataFormat.formatCurrency", "Currency")}
              </Select.Option>
              <Select.Option value="Percentage">
                {t("dataFormat.formatPercentage", "Percentage")}
              </Select.Option>
              <Select.Option value="Date">
                {t("dataFormat.formatDate", "Date")}
              </Select.Option>
              <Select.Option value="Custom">
                {t("dataFormat.formatCustom", "Custom")}
              </Select.Option>
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
