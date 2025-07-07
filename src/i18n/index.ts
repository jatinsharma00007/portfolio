import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import hi from './hi.json';
import ja from './ja.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ja: { translation: ja }
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Cache language selection in localStorage
      caches: ['localStorage'],
      
      // localStorage key name
      lookupLocalStorage: 'i18nextLng',
      
      // Only detect from navigator.languages when available
      convertDetectedLanguage: (lng) => lng.split('-')[0]
    }
  });

export default i18n; 