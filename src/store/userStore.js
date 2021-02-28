import {action, makeObservable, observable} from 'mobx';
import auth from '@react-native-firebase/auth';

export default class UserStore {
  user = auth().currentUser;

  credential = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      credential: observable,
      setUser: action,
      changeUser: action,
      setCredential: action,
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

  setCredential = (credential) => {
    console.log('credentials', credential);
    this.credential = credential;
  };
}
