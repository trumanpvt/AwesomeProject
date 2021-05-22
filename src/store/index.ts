import {createContext, useContext} from 'react';

import UserStore from './userStore';
import FooterStore from './footerStore';
import ModalStore from './modalStore';
import LocaleStore from './localeStore';
import NewsStore from './newsStore';
import BlogStore from './blogStore';
import StateStore from './stateStore';

const storesContext = createContext({
  userStore: new UserStore(),
  footerStore: new FooterStore(),
  modalStore: new ModalStore(),
  localeStore: new LocaleStore(),
  newsStore: new NewsStore(),
  blogStore: new BlogStore(),
  stateStore: new StateStore(),
});

export const useStores = () => useContext(storesContext);
