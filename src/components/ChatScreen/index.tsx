import React from 'react';

import {Text} from 'react-native';
import {Container, Content} from 'native-base';

import {useTranslation} from 'react-i18next';

import styles from './style.js';

const ChatScreen = () => {
  const {t} = useTranslation();

  return (
    <Container style={styles.container}>
      <Content>
        <Text style={styles.text}>{t('chats.text')}</Text>
      </Content>
    </Container>
  );
};

export default ChatScreen;
