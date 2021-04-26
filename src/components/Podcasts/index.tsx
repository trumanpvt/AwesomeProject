import React from 'react';
import {Text} from 'react-native';
import {Container, Content} from 'native-base';

import {useTranslation} from 'react-i18next';

import styles from './style.js';

const Podcasts = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <Content>
        <Text style={styles.text}>{t('podcasts.text')}</Text>
      </Content>
    </Container>
  );
};

export default Podcasts;
