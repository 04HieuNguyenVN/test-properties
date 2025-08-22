import React from "react";
import { InputNumber, Select, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import { CustomColorPicker } from "../../../../common/CustomColorPicker";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const { Option } = Select;

export default function DividerSection({
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
  const d = settings.title.divider;
  const { t } = useTranslation("generalTab");

  return (
    <ConfigSection
      title={"divider.title"}
      isExpanded={expanded.divider}
      onToggle={() => toggle("divider")}
      hasToggle
      toggleValue={d.enabled}
      onToggleChange={(checked) =>
        setSettings((p) => ({
          ...p,
          title: {
            ...p.title,
            divider: { ...p.title.divider, enabled: checked },
          },
        }))
      }
    >
      <div className="section-content">
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("divider.color")}
          </Typography.Text>
          <CustomColorPicker
            label=""
            value={d.color}
            onChange={(color) =>
              setSettings((p) => ({
                ...p,
                title: { ...p.title, divider: { ...p.title.divider, color } },
              }))
            }
            size="small"
            showLabel={false}
          />
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("divider.lineStyle")}
          </Typography.Text>
          <Select
            size="small"
            value={d.lineStyle}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  divider: { ...p.title.divider, lineStyle: v },
                },
              }))
            }
            style={{ width: "100%" }}
          >
            <Option value="Solid">{t("divider.lineStyleSolid")}</Option>
            <Option value="Dashed">{t("divider.lineStyleDashed")}</Option>
            <Option value="Dotted">{t("divider.lineStyleDotted")}</Option>
          </Select>
        </div>
        <div className="form-group">
          <Typography.Text className="form-label">
            {t("divider.width")}
          </Typography.Text>
          <InputNumber
            size="small"
            value={d.width}
            min={0}
            onChange={(v) =>
              setSettings((p) => ({
                ...p,
                title: {
                  ...p.title,
                  divider: { ...p.title.divider, width: v ?? d.width },
                },
              }))
            }
            style={{ width: "100%" }}
          />
        </div>
        <div className="form-group">
          <div className="checkbox-row">
            <Typography.Text className="form-label">
              {t("divider.ignorePadding")}
            </Typography.Text>
            <Switch
              size="small"
              checked={d.ignorePadding}
              onChange={(checked) =>
                setSettings((p) => ({
                  ...p,
                  title: {
                    ...p.title,
                    divider: { ...p.title.divider, ignorePadding: checked },
                  },
                }))
              }
            />
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
