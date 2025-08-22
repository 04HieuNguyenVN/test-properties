import React from "react";
import { Typography, Switch } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const LABEL_KEYS: Record<string, string> = {
  visualInformation: "icons.visualInformation",
  visualWarning: "icons.visualWarning",
  visualError: "icons.visualError",
  drillOnDropdown: "icons.drillOnDropdown",
  drillUp: "icons.drillUp",
  drillDown: "icons.drillDown",
  showNextLevel: "icons.showNextLevel",
  expandToNextLevel: "icons.expandToNextLevel",
  pin: "icons.pin",
  focusMode: "icons.focusMode",
  seeDataLayout: "icons.seeDataLayout",
  moreOptions: "icons.moreOptions",
  filter: "icons.filter",
  helpTooltip: "icons.helpTooltip",
  commentButton: "icons.commentButton",
  copyIcon: "icons.copyIcon",
  smartNarrative: "icons.smartNarrative",
  seeAlertButton: "icons.seeAlertButton",
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
  const { t } = useTranslation("generalTab");
  const icons = settings.headerIcons.icons;

  return (
    <ConfigSection
      title={"icons.title"}
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
