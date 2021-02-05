import UserStore from './userStore';
import FooterStore from './footerStore';

export default function createStore() {
  return {
    userStore: new UserStore(),
    footerStore: new FooterStore(),
  };
}
