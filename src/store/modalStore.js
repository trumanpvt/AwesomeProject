import {action, makeObservable, observable} from 'mobx';

export default class ModalStore {
  modal = {type: ''};

  constructor() {
    makeObservable(this, {
      modal: observable,
      setModal: action,
      setCloseModal: action,
    });
  }

  setModal = (modalData) => {
    this.modal = modalData;
  };

  setCloseModal = () => {
    this.modal = {type: null};
  };
}
