import {action, makeObservable, observable} from 'mobx';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default class UserStore {
  user = auth().currentUser;

  credential: FirebaseAuthTypes.AuthCredential | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      credential: observable,
      setUser: action,
      changeUser: action,
      setCredential: action,
    });
  }

  setUser = (userData: FirebaseAuthTypes.User | null) => {
    console.log('userData', userData);
    this.user = userData;
  };

  changeUser = (data: FirebaseAuthTypes.UpdateProfile) => {
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