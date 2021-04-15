import {createContext, useContext} from 'react';

import UserStore from './userStore';
import FooterStore from './footerStore';
import ModalStore from './modalStore';

const storesContext = createContext({
  userStore: new UserStore(),
  footerStore: new FooterStore(),
  modalStore: new ModalStore(),
});

export const useStores = () => useContext(storesContext);
