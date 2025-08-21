import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

// EN
import enCommon from "./en/common/index.json";
import enDataTab from "./en/dataTab/index.json";
import enFormatTab from "./en/formatTab/index.json";
import enGeneralTab from "./en/generalTab/index.json";
import enCharts from "./en/charts/index.json";
import enPropertiesPanel from "./en/propertiesPanel/index.json";

// VI
import viCommon from "./vi/common/index.json";
import viDataTab from "./vi/dataTab/index.json";
import viFormatTab from "./vi/formatTab/index.json";
import viGeneralTab from "./vi/generalTab/index.json";
import viCharts from "./vi/charts/index.json";
import viPropertiesPanel from "./vi/propertiesPanel/index.json";

const resources: Resource = {
  en: {
    common: enCommon,
    dataTab: enDataTab,
    formatTab: enFormatTab,
    generalTab: enGeneralTab,
    charts: enCharts,
    propertiesPanel: enPropertiesPanel,
  },
  vi: {
    common: viCommon,
    dataTab: viDataTab,
    formatTab: viFormatTab,
    generalTab: viGeneralTab,
    charts: viCharts,
    propertiesPanel: viPropertiesPanel,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // mặc định: vi
  fallbackLng: "vi",
  ns: [
    "common",
    "dataTab",
    "formatTab",
    "generalTab",
    "charts",
    "propertiesPanel",
  ],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
