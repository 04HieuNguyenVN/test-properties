import { FormatConfig } from "../types/interfaces";

export const getDefaultFormatConfig = (): FormatConfig => ({
  enabled: true,
  fontSize: 12,
  bold: false,
  italic: false,
  underline: false,
  color: "#000000",
  font: "Segoe UI",
});

export const applyTextFormatting = (
  config: FormatConfig
): React.CSSProperties => ({
  fontSize: config.fontSize,
  fontWeight: config.bold ? "bold" : "normal",
  fontStyle: config.italic ? "italic" : "normal",
  textDecoration: config.underline ? "underline" : "none",
  color: config.color,
  fontFamily: config.font || "Segoe UI",
});

export const formatNumber = (
  value: number,
  units: string,
  precision: number = 0
): string => {
  const formatted = value.toFixed(precision);

  switch (units) {
    case "Hundreds":
      return `${(value / 100).toFixed(precision)}H`;
    case "Thousands":
      return `${(value / 1000).toFixed(precision)}K`;
    case "Millions":
      return `${(value / 1000000).toFixed(precision)}M`;
    case "Billions":
      return `${(value / 1000000000).toFixed(precision)}B`;
    case "Trillions":
      return `${(value / 1000000000000).toFixed(precision)}T`;
    case "None":
      return formatted;
    default: // Auto
      if (value >= 1000000000000)
        return `${(value / 1000000000000).toFixed(1)}T`;
      if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return formatted;
  }
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
