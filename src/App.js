import React from 'react';
import {Container, Content} from 'native-base';
import AppFooterContainer from './containers/AppFooterContainer.js';
import AppHeaderContainer from './containers/AppHeaderContainer.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {initialState, reducers} from './reducers';
import MainContainer from './containers/MainContainer.js';

const store = createStore(reducers, initialState);

const App = () => (
  <Provider store={store}>
    <Container>
      <AppHeaderContainer />
      <Content>
        <MainContainer />
      </Content>
      <AppFooterContainer />
    </Container>
  </Provider>
);
export default App;
