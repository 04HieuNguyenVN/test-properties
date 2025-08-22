import React from "react";
import { InputNumber, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

export default function SpacingSection({
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
  const { t } = useTranslation("generalTab");
  const s = settings.title.spacing;

  return (
    <ConfigSection
      title={"spacing.title"}
      isExpanded={expanded.spacing}
      onToggle={() => toggle("spacing")}
    >
      <div className="section-content">
        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">
              {t("spacing.customizeSpacing")}
            </Typography.Text>
            <Switch
              size="small"
              checked={s.customizeSpacing}
              onChange={(checked) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    spacing: { ...p.title.spacing, customizeSpacing: checked },
                  },
                }))
              }
            />
          </div>
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("spacing.spaceBetweenLabelAndValue")}
          </Typography.Text>
          <InputNumber
            size="small"
            value={s.spaceBetweenLabelAndValue}
            min={0}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  spacing: {
                    ...p.title.spacing,
                    spaceBetweenLabelAndValue: v ?? s.spaceBetweenLabelAndValue,
                  },
                },
              }))
            }
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </ConfigSection>
  );
}
