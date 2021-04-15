import {action, makeObservable, observable} from 'mobx';

export default class FooterStore {
  mode = 'ARTICLES';

  constructor() {
    makeObservable(this, {
      mode: observable,
      setFooterMode: action,
    });
  }

  setFooterMode = (newMode: string) => {
    this.mode = newMode;
  };
}
