import {action, makeAutoObservable, observable} from 'mobx';
import auth from '@react-native-firebase/auth';

export default class FooterStore {
  @observable user = auth().currentUser;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setUser = (userData) => {
    this.user = userData;
  };
}
