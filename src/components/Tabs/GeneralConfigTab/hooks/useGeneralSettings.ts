import { useState } from "react";
import type {
  ExpandedState,
  GeneralSettings,
  ToggleFn,
  UpdateFn,
} from "../types";

/** giữ nguyên default state & keys theo file gốc (GeneralConfigTab.tsx) */
export function useGeneralSettings() {
  const [settings, setSettings] = useState<GeneralSettings>({
    size: { height: 542, width: 595, lockAspectRatio: false },
    position: { horizontal: 293, vertical: 82 },
    padding: { top: 0, right: 5, bottom: 5, left: 5 },
    advanced: { responsive: false, maintainLayerOrder: false },
    title: {
      title: {
        enabled: true,
        text: "Sum of GDPGRDP 2",
        heading: "Heading 3",
        font: "DIN",
        fontSize: 14,
        bold: false,
        italic: false,
        underline: false,
        textColor: "#000000",
        backgroundColor: "#ffffff",
        horizontalAlignment: "left",
        textWrap: true,
      },
      subtitle: {
        enabled: false,
        text: "",
        heading: "Heading 4",
        font: "Segoe UI",
        fontSize: 10,
        bold: false,
        italic: false,
        underline: false,
        textColor: "#000000",
        horizontalAlignment: "left",
        textWrap: false,
      },
      divider: {
        enabled: false,
        color: "#000000",
        lineStyle: "Solid",
        width: 1,
        ignorePadding: false,
      },
      spacing: { customizeSpacing: false, spaceBetweenLabelAndValue: 5 },
    },
    effects: {
      background: { enabled: true, color: "#ffffff", transparency: 0 },
      visualBorder: {
        enabled: false,
        color: "#000000",
        roundedCorners: 0,
        width: 1,
      },
      shadow: {
        enabled: false,
        color: "#000000",
        offset: "Outside",
        position: "Bottom right",
      },
    },
    dataFormat: { applySettingsTo: "Khu vực", format: "" },
    headerIcons: {
      colors: {
        background: "#ffffff",
        border: "#000000",
        icon: "#000000",
        transparency: 0,
      },
      icons: {
        visualInformation: true,
        visualWarning: true,
        visualError: true,
        drillOnDropdown: true,
        drillUp: true,
        drillDown: true,
        showNextLevel: true,
        expandToNextLevel: true,
        pin: true,
        focusMode: true,
        seeDataLayout: true,
        moreOptions: true,
        filter: true,
        helpTooltip: false,
        commentButton: true,
        copyIcon: true,
        smartNarrative: false,
        seeAlertButton: true,
      },
    },
    tooltips: {
      options: { text: "Report page settings and configurations..." },
      text: {
        font: "Segoe UI",
        fontSize: 10,
        bold: false,
        italic: false,
        underline: false,
        labelColor: "#000000",
        valueColor: "#000000",
        drillTextAndIconColor: "#000000",
      },
      background: { color: "#ffffff", transparency: 0 },
    },
  });

  const [expanded, setExpanded] = useState<ExpandedState>({
    properties: false,
    title: false,
    effects: false,
    dataFormat: false,
    headerIcons: false,
    tooltips: false,
    size: false,
    position: false,
    padding: false,
    advanced: false,
    titleSection: false,
    subtitle: false,
    divider: false,
    spacing: false,
    background: false,
    visualBorder: false,
    shadow: false,
    applySettingsTo: false,
    formatOptions: false,
    headerIconsColors: false,
    headerIconsIcons: false,
    tooltipsOptions: false,
    tooltipsText: false,
    tooltipsBackground: false,
  });

  const update: UpdateFn = (category, key, value) => {
    setSettings(
      (prev) =>
        ({
          ...prev,
          [category]: { ...(prev as any)[category], [key]: value },
        } as GeneralSettings)
    );
  };

  const toggle: ToggleFn = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return { settings, setSettings, expanded, setExpanded, update, toggle };
}
