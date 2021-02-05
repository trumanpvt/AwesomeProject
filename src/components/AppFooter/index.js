import React from 'react';
import {Button, Footer, FooterTab, Text} from 'native-base';
import PropTypes from 'prop-types';

import {useDataStore} from '../../store/context';

const AppFooter = () => {
  const footerStore = useDataStore().footerStore;
  const {mode, setMode} = footerStore;

  return (
    <Footer>
      <FooterTab>
        <Button
          active={mode === 'ARTICLES'}
          onPress={() => setMode('ARTICLES')}>
          <Text>Статьи</Text>
        </Button>
        <Button active={mode === 'PODCAST'} onPress={() => setMode('PODCAST')}>
          <Text>Подкасты</Text>
        </Button>
        <Button active={mode === 'FAQ'} onPress={() => setMode('FAQ')}>
          <Text>FAQ</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

AppFooter.propTypes = {
  mode: PropTypes.string,
  setMode: PropTypes.func,
};
export default AppFooter;
