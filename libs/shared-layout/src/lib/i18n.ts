import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import amharic from './translations/home/am.json';
import english from './translations/home/en.json';

const resources = {
  en: {
    translation: english,
  },
  am: {
    translation: amharic,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: ['en'],
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
