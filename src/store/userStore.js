import {action, makeObservable, observable} from 'mobx';
import {getCurrentAuthenticatedUserInfo} from '../util/auth';

export default class UserStore {
  user = {};

  constructor() {
    getCurrentAuthenticatedUserInfo()
      .then((result) => {
        console.log('Auth.currentAuthenticatedUser()', result);
        this.setUser(result);
      })
      .catch((e) => {
        console.log('Auth.currentAuthenticatedUser() error', e);
      });
    makeObservable(this, {
      user: observable,
      setUser: action,
      changeUser: action,
    });
  }

  setUser = (userData) => {
    console.log('userData', userData);
    this.user = userData;
  };

  changeUser = (data) => {
    // this.user
    //   .updateProfile(data)
    //   .then(() => {
    //     this.setUser(auth().currentUser);
    //   })
    //   .catch((error) => {
    //     console.log('updateProfile error', error);
    //   });
  };
}
