import {makeAutoObservable} from 'mobx';
import RNLocalize from 'react-native-localize';

export default class LocaleStore {
  language = RNLocalize.getLocales()[0].languageCode;

  loading = false;

  country = RNLocalize.getCountry();

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage = (language: string) => {
    this.language = language;
  };

  setCountry = (country: string) => {
    this.country = country;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };
}
