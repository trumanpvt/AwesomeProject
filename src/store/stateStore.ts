import {makeAutoObservable} from 'mobx';

export default class StateStore {
  loading: boolean = false;

  orientation: 'PORTRAIT' | 'LANDSCAPE' = 'PORTRAIT';

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (isLoading: boolean) => {
    this.loading = isLoading;
  };

  setOrientation = ({width, height}: {width: number; height: number}) => {
    if (width > height) {
      this.orientation = 'LANDSCAPE';
    } else {
      this.orientation = 'PORTRAIT';
    }
  };
}
