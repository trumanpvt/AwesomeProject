import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useStores} from '../../store/';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {Tab} from 'react-native-elements';

import styleSheet from './style';

const AppFooter = () => {
  const {mode, setFooterMode} = useStores().footerStore;

  const footerModes = ['ARTICLES', 'NEWS', 'PODCASTS'];

  const {t} = useTranslation();

  const styles = styleSheet();

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']}>
      <Tab
        onChange={(number) => setFooterMode(footerModes[number])}
        value={footerModes.indexOf(mode)}
        indicatorStyle={styles.indicator}>
        <Tab.Item
          title={t('footer.articles')}
          active={mode === 'ARTICLES'}
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title={t('footer.news')}
          active={mode === 'NEWS'}
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title={t('footer.podcasts')}
          active={mode === 'PODCASTS'}
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
      </Tab>
    </SafeAreaView>
  );
};

export default observer(AppFooter);
