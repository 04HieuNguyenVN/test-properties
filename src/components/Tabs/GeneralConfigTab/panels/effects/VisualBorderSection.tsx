import React from "react";
import { InputNumber, Typography, Switch } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

export default function VisualBorderSection({
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
  const vb = settings.effects.visualBorder;

  return (
    <ConfigSection
      title={"visualBorder.title"}
      isExpanded={expanded.visualBorder}
      onToggle={() => toggle("visualBorder")}
      hasToggle
      toggleValue={vb.enabled}
      onToggleChange={(checked) =>
        setSettings((p) => ({
          ...p,
          effects: {
            ...p.effects,
            visualBorder: { ...p.effects.visualBorder, enabled: checked },
          },
        }))
      }
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("visualBorder.color", "Color")}
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={vb.color}
            onChange={(c) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  visualBorder: { ...p.effects.visualBorder, color: c },
                },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("visualBorder.roundedCorners", "Rounded corners")}
          </Typography.Text>
          <InputNumber
            size="small"
            value={vb.roundedCorners}
            min={0}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  visualBorder: {
                    ...p.effects.visualBorder,
                    roundedCorners: v ?? vb.roundedCorners,
                  },
                },
              }))
            }
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("visualBorder.width", "Width")}
          </Typography.Text>
          <InputNumber
            size="small"
            value={vb.width}
            min={0}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                effects: {
                  ...p.effects,
                  visualBorder: {
                    ...p.effects.visualBorder,
                    width: v ?? vb.width,
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
