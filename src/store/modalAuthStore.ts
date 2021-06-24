import {makeAutoObservable} from 'mobx';

export default class modalAuthStore {
  modal: {
    type?: string;
    email?: string;
    message?: string;
  } = {type: '', email: '', message: ''};

  constructor() {
    makeAutoObservable(this);
  }

  setModal = (modalData: {type?: string; email?: string; message?: string}) => {
    this.modal = modalData;
  };

  setCloseModal = () => {
    this.modal = {type: '', email: '', message: ''};
  };
}
