import React from 'react';
import {Text} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './style.js';
import {useTranslation} from 'react-i18next';

const Articles = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <Content>
        <Text style={styles.text}>{t('articles.text')}</Text>
      </Content>
    </Container>
  );
};

export default Articles;
