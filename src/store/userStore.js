import {action, makeObservable, observable} from 'mobx';
import auth from '@react-native-firebase/auth';

export default class UserStore {
  user = auth().currentUser;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
      changeUser: action,
      reloadUser: action,
    });
  }

  setUser = (userData) => {
    console.log('userData', userData);
    this.user = userData;
  };

  changeUser = (data) => {
    this.user
      .updateProfile(data)
      .then(() => {
        this.setUser(auth().currentUser);
      })
      .catch((error) => {
        console.log('updateProfile error', error);
      });
  };

  reloadUser = () => {
    const reloadedUser = auth().currentUser;
    reloadedUser
      .reload()
      .then(() => {
        console.log('user reload success', reloadedUser);
        // this.setUser(reloadedUser);
      })
      .catch((e) => {
        console.log('user reload failed', e);
      });
  };
}
