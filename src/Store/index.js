import {action, observable} from 'mobx';
import auth from '@react-native-firebase/auth';

export class User {
  @observable user = auth().currentUser;

  // constructor(text: string) {
  //   // this.text = text;
  // }

  @action
  setUserData = (userData) => {
    this.user = userData;
  };
}
