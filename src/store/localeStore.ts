import {makeAutoObservable} from 'mobx';
import RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocaleStore {
  language: string = 'en';

  loading: boolean = false;

  country: string = RNLocalize.getCountry();

  constructor() {
    makeAutoObservable(this);

    this.getLanguage().then(language => {
      this.setLanguage(language);
    });
  }

  setLanguage = (language: string) => {
    this.language = language;
  };

  getLanguage = async () => {
    let language = await AsyncStorage.getItem('language');

    return language || RNLocalize.getLocales()[0].languageCode;
  };

  setCountry = (country: string) => {
    this.country = country;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };
}
