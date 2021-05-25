import {makeAutoObservable} from 'mobx';
import RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocaleStore {
  setLanguage = (language: string) => {
    this.language = language;
  };

  getLanguage = async (): Promise<string> => {
    let language = await AsyncStorage.getItem('language');

    setLanguage(language || RNLocalize.getLocales()[0].languageCode);
  };

  language = this.getLanguage();

  loading = false;

  isRTL = false;

  country = RNLocalize.getCountry();

  constructor() {
    makeAutoObservable(this);
  }

  setCountry = (country: string) => {
    this.country = country;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };
}
