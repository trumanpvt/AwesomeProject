import {action, makeObservable, observable} from 'mobx';

export default class ModalStore {
  modal: {
    type?: string;
    email?: string;
    message?: string;
  } = {type: '', email: '', message: ''};

  constructor() {
    makeObservable(this, {
      modal: observable,
      setModal: action,
      setCloseModal: action,
    });
  }

  setModal = (modalData: {type?: string; email?: string; message?: string}) => {
    this.modal = modalData;
  };

  setCloseModal = () => {
    this.modal = {type: '', email: '', message: ''};
  };
}
