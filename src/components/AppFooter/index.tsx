import React from 'react';

import {Text} from 'react-native';
import {Button, Footer, FooterTab} from 'native-base';

import {useStores} from '../../store/';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';

const AppFooter = () => {
  const {mode, setFooterMode} = useStores().footerStore;

  const {t} = useTranslation();

  return (
    <Footer>
      <FooterTab>
        <Button
          active={mode === 'ARTICLES'}
          onPress={() => setFooterMode('ARTICLES')}>
          <Text>{t('footer.articles')}</Text>
        </Button>
        <Button active={mode === 'NEWS'} onPress={() => setFooterMode('NEWS')}>
          <Text>{t('footer.news')}</Text>
        </Button>
        <Button
          active={mode === 'PODCASTS'}
          onPress={() => setFooterMode('PODCASTS')}>
          <Text>{t('footer.podcasts')}</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default observer(AppFooter);
