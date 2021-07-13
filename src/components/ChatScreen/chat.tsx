import React from 'react';

import {Text, View} from 'react-native';

import {useTranslation} from 'react-i18next';

import styles from './style';

const Chat = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('chats.text')}</Text>
    </View>
  );
};

export default Chat;
