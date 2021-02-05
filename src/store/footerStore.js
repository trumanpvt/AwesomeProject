import {action, makeAutoObservable, observable} from 'mobx';

export default class FooterStore {
  @observable mode = 'ARTICLES';

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setMode = (newMode) => {
    console.log('setMode');
    this.mode = newMode;
  };
}
