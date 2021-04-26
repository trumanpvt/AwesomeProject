import {makeAutoObservable} from 'mobx';
import RNLocalize from 'react-native-localize';

export default class LocaleStore {
  language = RNLocalize.getLocales()[0].languageCode;

  country = RNLocalize.getCountry();

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage = (language: string) => {
    this.language = language;
  };

  setCountry = (locale: string) => {
    this.country = locale;
  };
}
