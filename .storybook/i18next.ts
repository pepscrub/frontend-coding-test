import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en.json';

i18next
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en  } },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

export default i18next;