import React from 'react';
import {useTranslation} from 'react-i18next';
import {Header} from 'react-native-elements';

import styles from './style';

interface Props {
  openDrawer: () => void;
  name: string;
}

const AppHeader = ({openDrawer, name}: Props) => {
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
    />
  );
};

export default AppHeader;
