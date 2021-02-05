import {makeAutoObservable} from 'mobx';
import auth from '@react-native-firebase/auth';

export default class UserStore {
  user = auth().currentUser || {};

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (userData) => {
    console.log('setUser', userData);
    this.user = userData;
  };
}
