import React from "react";
import { Typography, Switch } from "antd";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const LABEL_KEYS: Record<string, string> = {
  visualInformation: "headerIcons.icons.visualInformation",
  visualWarning: "headerIcons.icons.visualWarning",
  visualError: "headerIcons.icons.visualError",
  drillOnDropdown: "headerIcons.icons.drillOnDropdown",
  drillUp: "headerIcons.icons.drillUp",
  drillDown: "headerIcons.icons.drillDown",
  showNextLevel: "headerIcons.icons.showNextLevel",
  expandToNextLevel: "headerIcons.icons.expandToNextLevel",
  pin: "headerIcons.icons.pin",
  focusMode: "headerIcons.icons.focusMode",
  seeDataLayout: "headerIcons.icons.seeDataLayout",
  moreOptions: "headerIcons.icons.moreOptions",
  filter: "headerIcons.icons.filter",
  helpTooltip: "headerIcons.icons.helpTooltip",
  commentButton: "headerIcons.icons.commentButton",
  copyIcon: "headerIcons.icons.copyIcon",
  smartNarrative: "headerIcons.icons.smartNarrative",
  seeAlertButton: "headerIcons.icons.seeAlertButton",
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
      title={"headerIcons.iconsTitle"}
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
