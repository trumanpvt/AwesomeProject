import {makeAutoObservable} from 'mobx';
import auth from '@react-native-firebase/auth';

export default class UserStore {
  user = auth().currentUser || {};

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (userData) => {
    this.user = userData;
  };

  changeUser = (data) => {
    this.user
      .updateProfile(data)
      .then((res) => {
        console.log('updateProfile success');
        this.user = auth().currentUser;
      })
      .catch((error) => {
        console.log('updateProfile error', error);
      });
  };
}
