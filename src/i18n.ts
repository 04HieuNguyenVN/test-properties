import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      padding: {
        label: "Padding",
        top: "Top padding",
        left: "Left padding",
        right: "Right padding",
        bottom: "Bottom padding",
      },
    },
  },
  vi: {
    translation: {
      padding: {
        label: "Khoảng cách (Padding)",
        top: "Trên",
        left: "Trái",
        right: "Phải",
        bottom: "Dưới",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi", // Đặt mặc định là tiếng Việt, có thể đổi sang 'en'
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
