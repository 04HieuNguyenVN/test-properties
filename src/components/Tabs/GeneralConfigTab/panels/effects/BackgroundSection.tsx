import React from "react";
import { Typography, Switch } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import NumberSlider from "../../common/NumberSlider";
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
  const { t } = useTranslation("generalTab");
  const bg = settings.effects.background;

  return (
    <ConfigSection
      title={"background"}
      isExpanded={expanded.background}
      onToggle={() => toggle("background")}
      hasToggle
      toggleValue={bg.enabled}
      onToggleChange={(checked) =>
        setSettings((p) => ({
          ...p,
          effects: {
            ...p.effects,
            background: { ...p.effects.background, enabled: checked },
          },
        }))
      }
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("color", "Color")}
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={bg.color}
            onChange={(c) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  background: { ...p.effects.background, color: c },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("transparency", "Transparency")}
          </Typography.Text>
          <NumberSlider
            value={bg.transparency}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  background: { ...p.effects.background, transparency: v },
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
