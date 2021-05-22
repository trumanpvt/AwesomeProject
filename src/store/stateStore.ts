import {makeAutoObservable} from 'mobx';

export default class StateStore {
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (isLoading: boolean) => {
    console.log(isLoading);
    this.loading = isLoading;
  };
}
