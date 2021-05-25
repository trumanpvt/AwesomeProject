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
  console.log(language);
  if (i18n.hasResourceBundle(language, 'default')) {
    return setLanguage(language);
  } else {
    return getTranslatedArray(language, en).then(json => {
      i18n.addResourceBundle(language, 'default', json);
      return setLanguage(language);
    });
  }
};
const setLanguage = (language: string) => {
  setRTL(language);
  return i18n.changeLanguage(language).then(() => {
    return AsyncStorage.setItem('language', language);
  });
};

const setRTL = (language: string) => {
  if (RTLLanguages.includes(language) && !I18nManager.isRTL) {
    I18nManager.forceRTL(true);
    DevSettings.reload();
  } else if (I18nManager.isRTL) {
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
