import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//! Importa i file di traduzione
import translationEN from './utils/en/translation.json'; 
import translationIT from './utils/it/translation.json';

i18n
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
    lng: 'en', //! Lingua di default
    fallbackLng: 'en', //! Lingua di fallback nel caso in cui una traduzione non sia disponibile
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true, 
    },
  });

export default i18n;
