import React from 'react';

import {useStores} from '../../store/';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {Tab} from 'react-native-elements';

const AppFooter = () => {
  const {mode, setFooterMode} = useStores().footerStore;

  const footerModes = ['ARTICLES', 'NEWS', 'PODCASTS'];

  const {t} = useTranslation();

  return (
    <Tab onChange={(number) => setFooterMode(footerModes[number])}>
      <Tab.Item title={t('footer.articles')} active={mode === 'ARTICLES'} />
      <Tab.Item title={t('footer.news')} active={mode === 'NEWS'} />
      <Tab.Item title={t('footer.podcasts')} active={mode === 'PODCASTS'} />
    </Tab>
  );
};

export default observer(AppFooter);
