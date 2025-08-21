import React from "react";
import { Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <ConfigSection
      title={t("generalTab.tooltips.content", "Content")}
      isExpanded={expanded.tooltipsOptions}
      onToggle={() => toggle("tooltipsOptions")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("generalTab.tooltips.text", "Text")}
          </Typography.Text>
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
