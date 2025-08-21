export type ExpandKeys =
  | "properties"
  | "size"
  | "position"
  | "padding"
  | "advanced"
  | "title"
  | "titleSection"
  | "subtitle"
  | "divider"
  | "spacing"
  | "effects"
  | "background"
  | "visualBorder"
  | "shadow"
  | "dataFormat"
  | "applySettingsTo"
  | "formatOptions"
  | "headerIcons"
  | "headerIconsColors"
  | "headerIconsIcons"
  | "tooltips"
  | "tooltipsOptions"
  | "tooltipsText"
  | "tooltipsBackground";

export type ExpandedState = Record<ExpandKeys, boolean>;

export interface GeneralSettings {
  size: { height: number; width: number; lockAspectRatio: boolean };
  position: { horizontal: number; vertical: number };
  padding: { top: number; right: number; bottom: number; left: number };
  advanced: { responsive: boolean; maintainLayerOrder: boolean };
  title: {
    title: {
      enabled: boolean;
      text: string;
      heading: string;
      font: string;
      fontSize: number;
      bold: boolean;
      italic: boolean;
      underline: boolean;
      textColor: string;
      backgroundColor: string;
      horizontalAlignment: "left" | "center" | "right";
      textWrap: boolean;
    };
    subtitle: {
      enabled: boolean;
      text: string;
      heading: string;
      font: string;
      fontSize: number;
      bold: boolean;
      italic: boolean;
      underline: boolean;
      textColor: string;
      horizontalAlignment: "left" | "center" | "right";
      textWrap: boolean;
    };
    divider: {
      enabled: boolean;
      color: string;
      lineStyle: string;
      width: number;
      ignorePadding: boolean;
    };
    spacing: { customizeSpacing: boolean; spaceBetweenLabelAndValue: number };
  };
  effects: {
    background: { enabled: boolean; color: string; transparency: number };
    visualBorder: {
      enabled: boolean;
      color: string;
      roundedCorners: number;
      width: number;
    };
    shadow: {
      enabled: boolean;
      color: string;
      offset: "Outside" | "Inside";
      position: "Bottom right" | "Bottom left" | "Top right" | "Top left";
    };
  };
  dataFormat: { applySettingsTo: string; format: string };
  headerIcons: {
    colors: {
      background: string;
      border: string;
      icon: string;
      transparency: number;
    };
    icons: Record<string, boolean>;
  };
  tooltips: {
    options: { text: string };
    text: {
      font: string;
      fontSize: number;
      bold: boolean;
      italic: boolean;
      underline: boolean;
      labelColor: string;
      valueColor: string;
      drillTextAndIconColor: string;
    };
    background: { color: string; transparency: number };
  };
}

export type UpdateFn = (
  category: keyof GeneralSettings,
  key: string,
  value: any
) => void;
export type ToggleFn = (key: ExpandKeys) => void;
