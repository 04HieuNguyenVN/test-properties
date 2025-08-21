import React from "react";
import { Typography, Switch } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const LABEL_KEYS: Record<string, string> = {
  visualInformation: "generalTab.icons.visualInformation",
  visualWarning: "generalTab.icons.visualWarning",
  visualError: "generalTab.icons.visualError",
  drillOnDropdown: "generalTab.icons.drillOnDropdown",
  drillUp: "generalTab.icons.drillUp",
  drillDown: "generalTab.icons.drillDown",
  showNextLevel: "generalTab.icons.showNextLevel",
  expandToNextLevel: "generalTab.icons.expandToNextLevel",
  pin: "generalTab.icons.pin",
  focusMode: "generalTab.icons.focusMode",
  seeDataLayout: "generalTab.icons.seeDataLayout",
  moreOptions: "generalTab.icons.moreOptions",
  filter: "generalTab.icons.filter",
  helpTooltip: "generalTab.icons.helpTooltip",
  commentButton: "generalTab.icons.commentButton",
  copyIcon: "generalTab.icons.copyIcon",
  smartNarrative: "generalTab.icons.smartNarrative",
  seeAlertButton: "generalTab.icons.seeAlertButton",
};

export default function IconsSection({
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
  const icons = settings.headerIcons.icons;

  return (
    <ConfigSection
      title={t("generalTab.icons.title", "Icons")}
      isExpanded={expanded.headerIconsIcons}
      onToggle={() => toggle("headerIconsIcons")}
    >
      <div className="section-content">
        {Object.keys(LABEL_KEYS).map((key) => (
          <div key={key} className="form-group">
            <div className="checkbox-row">
              <Typography.Text className="form-label">
                {t(LABEL_KEYS[key])}
              </Typography.Text>
              <Switch
                size="small"
                checked={!!icons[key]}
                onChange={(checked) =>
                  setSettings((p) => ({
                    ...p,
                    headerIcons: {
                      ...p.headerIcons,
                      icons: { ...p.headerIcons.icons, [key]: checked },
                    },
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </ConfigSection>
  );
}
