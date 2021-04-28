import React from 'react';
import {useTranslation} from 'react-i18next';
import {Header} from 'react-native-elements';

import styles from './style';
import {useStores} from '../../store';

interface Props {
  openDrawer: () => void;
  name: string;
}

const AppHeader = ({openDrawer, name}: Props) => {
  const {modalStore, userStore, localeStore, newsStore} = useStores();
  const showStores = () => {
    console.log('modalStore', modalStore);
    console.log('userStore', userStore);
    console.log('localeStore', localeStore);
    console.log('newsStore', newsStore);
  };

  const {t} = useTranslation();

  return (
    <Header
      containerStyle={styles.header}
      leftComponent={{
        icon: 'menu',
        size: 32,
        color: '#fff',
        onPress: openDrawer,
      }}
      centerComponent={{
        text: t(`routes.${name}`),
        style: styles.headerTitle,
      }}
      centerContainerStyle={styles.headerCenterContainer}
      rightComponent={{
        icon: 'info',
        size: 32,
        color: '#fff',
        onPress: showStores,
      }}
    />
  );
};

export default AppHeader;
