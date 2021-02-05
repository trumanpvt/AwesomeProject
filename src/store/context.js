import {useLocalObservable} from 'mobx-react-lite';
import React, {createContext, useContext} from 'react';
import createStore from './store';

const StoreContext = createContext();

export const DataStoreProvider = ({children}: any) => {
  const store = useLocalObservable(createStore);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
export const useDataStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
