import {action, makeObservable, observable} from 'mobx';
import {NativeModules, Platform} from 'react-native';
import RNLocalize from 'react-native-localize';

export default class LocaleStore {
  locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  country = RNLocalize.getCountry();

  constructor() {
    makeObservable(this, {
      locale: observable,
      country: observable,
      setLocale: action,
    });
  }

  setLocale = (locale: string) => {
    this.locale = locale;
  };
}
