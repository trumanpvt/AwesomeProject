import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en/en.json';
import ru from './ru/ru.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
} as const;

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    resources,

    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  })
  .then();

export default i18n;
