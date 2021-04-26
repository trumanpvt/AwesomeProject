import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en/en.json';
import ru from './ru/ru.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    resources: {
      en,
      ru,
    },

    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  })
  .catch((e) => {
    console.log('i18n init error', e);
  });

export default i18n;
