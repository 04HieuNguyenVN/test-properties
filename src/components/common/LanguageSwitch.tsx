import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  const current = i18n.language === "vi" ? "vi" : "en";
  const next = current === "vi" ? "en" : "vi";

  const toggle = () => {
    i18n.changeLanguage(next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  };

  return (
    <div className="lang-switch-container">
      <button
        className="lang-switch-btn"
        aria-label={`Switch language to ${current.toUpperCase()}`}
        onClick={toggle}
      >
        {current.toUpperCase()}
      </button>
    </div>
  );
};

export default LanguageSwitch;
