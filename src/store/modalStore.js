import {action, makeObservable, observable} from 'mobx';

export default class ModalStore {
  modal = null;
  additionalInfo = {};

  constructor() {
    makeObservable(this, {
      modal: observable,
      additionalInfo: observable,
      setModal: action,
      setModalAdditionalInfo: action,
      setCloseModal: action,
    });
  }

  setModal = (modalType) => {
    this.modal = modalType;
  };

  setModalAdditionalInfo = (info) => {
    this.additionalInfo = info;
  };

  setCloseModal = () => {
    this.modal = null;
  };
}
