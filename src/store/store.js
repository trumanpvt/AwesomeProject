import UserStore from './userStore';
import FooterStore from './footerStore';
import ModalStore from './modalStore';

export default function createStore() {
  return {
    userStore: new UserStore(),
    footerStore: new FooterStore(),
    modalStore: new ModalStore(),
  };
}
