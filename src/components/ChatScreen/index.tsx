import React, {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';

import {ScrollView, Text, View} from 'react-native';

// import {useTranslation} from 'react-i18next';

import styles from './style';
import {getLocaleDate} from '../../util/date';
import {useStores} from '../../store';

const ChatScreen = () => {
  const [chats, setChats] = useState<any[]>([]);

  const {language} = useStores().localeStore;

  useEffect(() => {
    const subscriber = firestore()
      .collection('MESSAGE_THREADS')
      .onSnapshot(querySnapshot => {
        let updatedChats: any[] = [];

        querySnapshot.forEach(documentSnapshot => {
          console.log('Chat: ', documentSnapshot.id, documentSnapshot.data());
          updatedChats.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });

        setChats(updatedChats);
      });

    return () => subscriber();
  }, []);

  // const {t} = useTranslation();

  const renderChat = (chat: any, index: number) => {
    return (
      <View key={index} style={styles.chat}>
        <Text style={styles.chatTitle}>{chat.data.name}</Text>
        <View key={index} style={styles.chatBody}>
          <Text style={styles.chatMessage}>{chat.data.latestMessage}</Text>
          <Text style={styles.chatDate}>
            {getLocaleDate(chat.data.latestMessageDate, language)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/*<Text style={styles.text}>{t('chats.text')}</Text>*/}
      {chats.map(renderChat)}
    </ScrollView>
  );
};

export default ChatScreen;
