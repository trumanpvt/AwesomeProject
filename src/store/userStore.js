import {action, makeObservable, observable} from 'mobx';

export default class UserStore {
  user = {};

  constructor() {
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
