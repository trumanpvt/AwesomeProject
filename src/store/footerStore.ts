import {makeAutoObservable} from 'mobx';

export default class FooterStore {
  mode = 'ARTICLES';

  constructor() {
    makeAutoObservable(this);
  }

  setFooterMode = (newMode: string) => {
    this.mode = newMode;
  };
}
