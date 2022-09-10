import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import backend from "i18next-http-backend";
import arTrans from "./lang/ar.json";
import enTrans from "./lang/en.json";

i18n
  .use(LanguageDetector)
  // .use(backend)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTrans,
      },
      ar: {
        translation: arTrans,
      },
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: [
        "localStorage",
        "cookie",
        "htmlTag",
        "sessionStorage",
        "path",
        "subdomain",
      ],
      caches: ["localStorage"],
    },
  });

export default i18n;
