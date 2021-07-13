import React, {useState, useEffect, useMemo} from 'react';

import firestore from '@react-native-firebase/firestore';

import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

// import {useTranslation} from 'react-i18next';

import styles from './style';
import {getLocaleDate} from '../../util/date';
import {useStores} from '../../store';
import Chat from './chat';

import {IMessage} from 'react-native-gifted-chat/lib/Models';
export interface ChatProps {
  name: string;
  messages: IMessage[];
  latestMessage: string;
  latestMessageDate: string;
  id: string;
}

const ChatScreen = () => {
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [openedChatId, setOpenedChatId] = useState('');

  const {language} = useStores().localeStore;

  useEffect(() => {
    const subscriber = firestore()
      .collection('MESSAGE_THREADS')
      .onSnapshot(querySnapshot => {
        let updatedChats: any[] = [];

        querySnapshot.forEach(documentSnapshot => {
          console.log('Chat: ', documentSnapshot.id, documentSnapshot.data());
          updatedChats.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setChats(updatedChats);
      });

    return () => subscriber();
  }, []);

  // const {t} = useTranslation();

  const renderChat = (chat: ChatProps, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.chat}
        onPress={() => setOpenedChatId(chat.id)}>
        <Text style={styles.chatTitle}>{chat.name}</Text>
        <View key={index} style={styles.chatBody}>
          <Text style={styles.chatMessage}>{chat.latestMessage}</Text>
          <Text style={styles.chatDate}>
            {getLocaleDate(chat.latestMessageDate, language)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/*<Text style={styles.text}>{t('chats.text')}</Text>*/}
      {chats.map(renderChat)}
      {chats.length && openedChatId ? (
        <Chat chat={chats.find(chat => chat.id === openedChatId)} />
      ) : null}
    </ScrollView>
  );
};

export default ChatScreen;
