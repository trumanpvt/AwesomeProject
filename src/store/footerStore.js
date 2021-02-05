import {makeAutoObservable} from 'mobx';

export default class FooterStore {
  mode = 'ARTICLES';

  constructor() {
    makeAutoObservable(this);
  }

  setMode = (newMode) => {
    this.mode = newMode;
  };
}
