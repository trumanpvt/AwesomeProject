import {action, makeObservable, observable} from 'mobx';
import RNLocalize from 'react-native-localize';

export default class LocaleStore {
  language = RNLocalize.getLocales()[0].languageCode;

  country = RNLocalize.getCountry();

  constructor() {
    makeObservable(this, {
      language: observable,
      country: observable,
      setLanguage: action,
      setCountry: action,
    });
  }

  setLanguage = (language: string) => {
    this.language = language;
  };

  setCountry = (locale: string) => {
    this.country = locale;
  };
}
