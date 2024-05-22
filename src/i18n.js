import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './utils/en/translation.json'; 
import translationIT from './utils/it/translation.json';

i18n
  .use(LanguageDetector) //! Rilevatore di lingua
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      it: {
        translation: translationIT,
      },
    },
    fallbackLng: 'en', // Lingua di fallback nel caso in cui una traduzione non sia disponibile
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  });


export default i18n;
