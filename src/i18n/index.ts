import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {en} from './en/en.js';
import {ru} from './ru/ru.js';
import {getTranslatedArray} from '../util/translate';
import {RTLLanguages} from '../constants';
import {DevSettings, I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    return setLanguage(language);
  } else {
    return AsyncStorage.getItem(`language-${language}`).then(res => {
      if (res) {
        i18n.addResourceBundle(language, 'default', JSON.parse(res));
        return setLanguage(language);
      } else {
        return fetchLanguage(language);
      }
    });
  }
};

const fetchLanguage = (language: string) => {
  return getTranslatedArray(language, en).then(json => {
    i18n.addResourceBundle(language, 'default', json);
    setLanguage(language).then(() =>
      AsyncStorage.setItem(`language-${language}`, JSON.stringify(json)),
    );
  });
};

const setLanguage = (language: string) => {
  return i18n.changeLanguage(language).then(() => {
    return AsyncStorage.setItem('language', language);
  });
};

export const setRTL = (language: string) => {
  if (RTLLanguages.includes(language) && !I18nManager.isRTL) {
    I18nManager.forceRTL(true);
    DevSettings.reload();
  } else if (!RTLLanguages.includes(language) && I18nManager.isRTL) {
    I18nManager.forceRTL(false);
    DevSettings.reload();
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
