import React from 'react';

import {Text, View} from 'react-native';

import {useTranslation} from 'react-i18next';

import styles from './style';

const Articles = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('articles.text')}</Text>
    </View>
  );
};

export default Articles;
