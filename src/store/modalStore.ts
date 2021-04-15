import {action, makeObservable, observable} from 'mobx';

export default class ModalStore {
  modal: {type: string; email: string} = {type: '', email: ''};

  constructor() {
    makeObservable(this, {
      modal: observable,
      setModal: action,
      setCloseModal: action,
    });
  }

  setModal = (modalData: {type: string}) => {
    this.modal = modalData;
  };

  setCloseModal = () => {
    this.modal = {type: ''};
  };
}
