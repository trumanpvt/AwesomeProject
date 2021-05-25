import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {en} from './en/en.js';
import {ru} from './ru/ru.js';
import {getTranslatedArray} from '../util/translate';

const resources = {
  en: {
    default: en,
  },
  ru: {
    default: ru,
  },
} as const;

export const changeLanguage = (language: string) => {
  if (i18n.hasResourceBundle(language, 'default')) {
    return i18n.changeLanguage(language);
  } else {
    return getTranslatedArray(language, en).then(json => {
      i18n.addResourceBundle(language, 'default', json);
      return i18n.changeLanguage(language);
    });
  }
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['default'],
    defaultNS: 'default',
    resources: resources,
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  })
  .then();

export default i18n;
