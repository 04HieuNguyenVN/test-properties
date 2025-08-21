import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <div className="lang-switch-container">
      <button
        className="lang-switch-btn"
        onClick={() =>
          i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
        }
      >
        {i18n.language === "vi" ? "EN" : "VI"}
      </button>
    </div>
  );
};

export default LanguageSwitch;
