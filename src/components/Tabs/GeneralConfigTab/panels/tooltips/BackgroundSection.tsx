import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import NumberSlider from "../../common/NumberSlider";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

export default function BackgroundSection({
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
  const b = settings.tooltips.background;
  const { t } = useTranslation("generalTab");

  return (
    <ConfigSection
      title={"tooltipsBackground.title"}
      isExpanded={expanded.tooltipsBackground}
      onToggle={() => toggle("tooltipsBackground")}
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("tooltipsBackground.color")}
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={b.color}
            onChange={(c) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  background: { ...p.tooltips.background, color: c },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("tooltipsBackground.transparency")}
          </Typography.Text>
          <NumberSlider
            value={b.transparency}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                tooltips: {
                  ...p.tooltips,
                  background: { ...p.tooltips.background, transparency: v },
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
