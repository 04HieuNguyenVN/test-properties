import React from "react";
import { Typography, Switch } from "antd";
import ConfigSection from "../../common/ConfigSection";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";

const LABELS: Record<string, string> = {
  visualInformation: "Visual information",
  visualWarning: "Visual warning",
  visualError: "Visual error",
  drillOnDropdown: "Drill on dropdown",
  drillUp: "Drill up",
  drillDown: "Drill down",
  showNextLevel: "Show next level",
  expandToNextLevel: "Expand to next level",
  pin: "Pin",
  focusMode: "Focus mode",
  seeDataLayout: "See data layout",
  moreOptions: "More options",
  filter: "Filter",
  helpTooltip: "Help tooltip",
  commentButton: "Comment button",
  copyIcon: "Copy",
  smartNarrative: "Smart narrative",
  seeAlertButton: "See alert",
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
  const icons = settings.headerIcons.icons;

  return (
    <ConfigSection
      title="Icons"
      isExpanded={expanded.headerIconsIcons}
      onToggle={() => toggle("headerIconsIcons")}
    >
      <div className="section-content">
        {Object.keys(LABELS).map((key) => (
          <div key={key} className="form-group">
            <div className="checkbox-row">
              <Typography.Text className="form-label">
                {LABELS[key]}
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
