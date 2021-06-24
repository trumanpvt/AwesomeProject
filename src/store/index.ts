import {createContext, useContext} from 'react';

import UserStore from './userStore';
import FooterStore from './footerStore';
import ModalAuthStore from './modalAuthStore';
import LocaleStore from './localeStore';
import NewsStore from './newsStore';
import BlogStore from './blogStore';
import StateStore from './stateStore';

const storesContext = createContext({
  userStore: new UserStore(),
  footerStore: new FooterStore(),
  modalAuthStore: new ModalAuthStore(),
  localeStore: new LocaleStore(),
  newsStore: new NewsStore(),
  blogStore: new BlogStore(),
  stateStore: new StateStore(),
});

export const useStores = () => useContext(storesContext);
