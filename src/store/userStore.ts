import {makeAutoObservable} from 'mobx';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default class UserStore {
  user: FirebaseAuthTypes.User | null = auth().currentUser;

  credential: FirebaseAuthTypes.AuthCredential | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (userData: FirebaseAuthTypes.User | null) => {
    this.user = userData;
  };

  changeUser = (data: {}) => {
    if (this.user) {
      this.user.updateProfile(data).then(() => {
        this.setUser(auth().currentUser);
      });
    }
  };

  setCredential = (credential: FirebaseAuthTypes.AuthCredential) => {
    this.credential = credential;
  };
}
