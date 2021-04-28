import React from 'react';

import Articles from '../Articles';
import News from '../News';
import Podcasts from '../Podcasts';
import AppFooter from '../AppFooter';

import {observer} from 'mobx-react-lite';

import {useStores} from '../../store';

import styles from './style.js';
import {View} from 'react-native';

const HomeScreen = () => {
  const {mode} = useStores().footerStore;

  const renderPage = () => {
    switch (mode) {
      case 'PODCASTS': {
        return <Podcasts />;
      }
      case 'NEWS': {
        return <News />;
      }
      default: {
        return <Articles />;
      }
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
      <AppFooter />
    </View>
  );
};

export default observer(HomeScreen);
