import {makeAutoObservable} from 'mobx';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default class UserStore {
  user: FirebaseAuthTypes.User | null = auth().currentUser;

  credential: FirebaseAuthTypes.AuthCredential | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (userData: FirebaseAuthTypes.User | null) => {
    console.log('userData', userData);
    this.user = userData;
  };

  changeUser = (data: {}) => {
    if (this.user) {
      this.user
        .updateProfile(data)
        .then(() => {
          this.setUser(auth().currentUser);
        })
        .catch((error) => {
          console.log('updateProfile error', error);
        });
    }
  };

  setCredential = (credential: FirebaseAuthTypes.AuthCredential) => {
    console.log('credential', credential);
    this.credential = credential;
  };
}
