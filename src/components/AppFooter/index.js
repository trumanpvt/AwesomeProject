import React from 'react';
import {Button, Footer, FooterTab, Text} from 'native-base';
import PropTypes from 'prop-types';

import {useDataStore} from '../../store/context';

const AppFooter = () => {
  const footerStore = useDataStore().footerStore;
  const {mode, setFooterMode} = footerStore;

  return (
    <Footer>
      <FooterTab>
        <Button
          active={mode === 'ARTICLES'}
          onPress={() => setFooterMode('ARTICLES')}>
          <Text>Статьи</Text>
        </Button>
        <Button
          active={mode === 'PODCAST'}
          onPress={() => setFooterMode('PODCAST')}>
          <Text>Подкасты</Text>
        </Button>
        <Button active={mode === 'FAQ'} onPress={() => setFooterMode('FAQ')}>
          <Text>FAQ</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

AppFooter.propTypes = {};
export default AppFooter;
