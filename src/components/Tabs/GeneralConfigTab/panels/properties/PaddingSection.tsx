import React from "react";
import { useTranslation } from "react-i18next";
import ConfigSection from "../../common/ConfigSection";
import type { GeneralSettings, ExpandedState, ToggleFn } from "../../types";
import PaddingControl from "../../../../common/PaddingControl";

export default function PaddingSection({
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
      title={t("generalTab.padding", "Padding")}
      isExpanded={expanded.padding}
      onToggle={() => toggle("padding")}
    >
      <div className="section-content">
        <PaddingControl
          value={settings.padding}
          onChange={(val) => setSettings((p) => ({ ...p, padding: val }))}
        />
      </div>
    </ConfigSection>
  );
}
