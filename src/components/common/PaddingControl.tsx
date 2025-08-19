import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SpinButton } from "../common/SpinButton";

interface PaddingValues {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface PaddingControlProps {
  value: PaddingValues;
  onChange: (value: PaddingValues) => void;
}

const PaddingControl: React.FC<PaddingControlProps> = ({ value, onChange }) => {
  const { t, i18n } = useTranslation();
  const [activeDirection, setActiveDirection] = useState<
    keyof PaddingValues | null
  >(null);

  const updatePadding = (side: keyof PaddingValues, v: number) => {
    onChange({ ...value, [side]: v });
  };
  const handleFocus = (direction: keyof PaddingValues) =>
    setActiveDirection(direction);
  const handleBlur = () => setTimeout(() => setActiveDirection(null), 150);

  const handleLangSwitch = () => {
    i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");
  };

  return (
    <div className="custom-padding-control">
      <div
        className="custom-padding-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="custom-padding-title">{t("padding.label")}</span>
        <button
          onClick={handleLangSwitch}
          style={{
            fontSize: 12,
            padding: "2px 8px",
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {i18n.language === "vi" ? "EN" : "VI"}
        </button>
      </div>
      <div className="custom-padding-grid">
        <div></div>
        <div className="custom-padding-center">
          <SpinButton
            value={value.top}
            onChange={(v) => updatePadding("top", v)}
            onFocus={() => handleFocus("top")}
            onBlur={handleBlur}
            label={t("padding.top")}
            name="top"
          />
        </div>
        <div className="custom-padding-center">
          <SpinButton
            value={value.left}
            onChange={(v) => updatePadding("left", v)}
            onFocus={() => handleFocus("left")}
            onBlur={handleBlur}
            label={t("padding.left")}
            name="left"
          />
        </div>
        <div className="custom-padding-svg">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="custom-padding-svgbox"
          >
            <rect
              x="0.5"
              y="0.5"
              width="47"
              height="47"
              fill="#f8f9fa"
              stroke="#d1d5db"
              strokeWidth="1"
            />
            <rect
              x={Math.max(2, value.left * 0.8 + 2)}
              y={Math.max(2, value.top * 0.8 + 2)}
              width={Math.max(
                8,
                44 -
                  Math.max(2, value.left * 0.8) -
                  Math.max(2, value.right * 0.8)
              )}
              height={Math.max(
                8,
                44 -
                  Math.max(2, value.top * 0.8) -
                  Math.max(2, value.bottom * 0.8)
              )}
              fill={activeDirection ? "#f0fdf4" : "white"}
              stroke={activeDirection ? "#22c55e" : "#9ca3af"}
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="custom-padding-center">
          <SpinButton
            value={value.right}
            onChange={(v) => updatePadding("right", v)}
            onFocus={() => handleFocus("right")}
            onBlur={handleBlur}
            label={t("padding.right")}
            name="right"
          />
        </div>
        <div></div>
        <div className="custom-padding-center">
          <SpinButton
            value={value.bottom}
            onChange={(v) => updatePadding("bottom", v)}
            onFocus={() => handleFocus("bottom")}
            onBlur={handleBlur}
            label={t("padding.bottom")}
            name="bottom"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PaddingControl;
