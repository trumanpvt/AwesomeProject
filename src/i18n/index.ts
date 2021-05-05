import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en/en.json';
import ru from './ru/ru.json';
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
  if (i18n.language !== language) {
    if (i18n.hasResourceBundle(language, 'default')) {
      i18n.changeLanguage(language).then();
    } else {
      getTranslatedArray(language, en).then(json => {
        i18n.addResourceBundle(language, 'default', json);
        i18n.changeLanguage(language).then();
      });
    }
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
