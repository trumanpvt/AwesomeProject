import React from 'react';
import {Button, Footer, FooterTab, Text} from 'native-base';

import {useStores} from '../../store/';

const AppFooter = () => {
  const {mode, setFooterMode} = useStores().footerStore;

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

export default AppFooter;