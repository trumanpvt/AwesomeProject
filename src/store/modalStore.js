import {action, makeObservable, observable} from 'mobx';

export default class ModalStore {
  modal = null;

  constructor() {
    makeObservable(this, {
      modal: observable,
      setModal: action,
      setCloseModal: action,
    });
  }

  setModal = (modalType) => {
    this.modal = modalType;
  };

  setCloseModal = () => {
    this.modal = null;
  };
}
