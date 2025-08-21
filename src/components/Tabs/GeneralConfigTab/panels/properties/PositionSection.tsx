import React from "react";
import { InputNumber, Typography } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import type {
  GeneralSettings,
  ExpandedState,
  UpdateFn,
  ToggleFn,
} from "../../types";

export default function PositionSection({
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
  const { t } = useTranslation();
  return (
    <ConfigSection
      title={t("generalTab.position", "Position")}
      isExpanded={expanded.position}
      onToggle={() => toggle("position")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("generalTab.horizontal", "Horizontal")}
          </Typography.Text>
          <InputNumber
            size="small"
            value={settings.position.horizontal}
            onChange={(v) => update("position", "horizontal", v)}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("generalTab.vertical", "Vertical")}
          </Typography.Text>
          <InputNumber
            size="small"
            value={settings.position.vertical}
            onChange={(v) => update("position", "vertical", v)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </ConfigSection>
  );
}
