import React, {useState, useEffect, useMemo} from 'react';

import firestore from '@react-native-firebase/firestore';

import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

// import {useTranslation} from 'react-i18next';

import styles from './style';
import {getLocaleDate} from '../../util/date';
import {useStores} from '../../store';
import Chat from './chat';

import {IMessage} from 'react-native-gifted-chat/lib/Models';
import {FAB} from 'react-native-elements';
import {guidGenerator} from '../../util/media';

import ModalChat from './ModalChat';
import {observer} from 'mobx-react-lite';

export interface SingleChat {
  name: string;
  messages: IMessage[];
  latestMessage: string;
  latestMessageDate: string;
  id: string;
}

const ChatScreen = () => {
  const [chats, setChats] = useState<SingleChat[]>([]);
  const [openedChatId, setOpenedChatId] = useState('');
  const [createChatModal, setCreateChatModal] = useState(false);

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

        if (!updatedChats.length) {
          return null;
        }

        setChats(updatedChats);
      });

    return () => subscriber();
  }, []);

  // const {t} = useTranslation();

  const createChat = (name: string) => {
    const newChatId = guidGenerator();

    firestore()
      .collection('MESSAGE_THREADS')
      .doc(newChatId)
      .set({name})
      .then(() => {
        console.log('new chat added!');
        setOpenedChatId(newChatId);
        setCreateChatModal(false);
      });
  };

  const renderChat = (chat: SingleChat, index: number) => {
    console.log(chat);
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
    <View style={styles.container}>
      {/*<Text style={styles.text}>{t('chats.text')}</Text>*/}
      <ScrollView style={styles.chats}>{chats.map(renderChat)}</ScrollView>
      <FAB
        icon={{
          name: 'post-add',
          size: 25,
          color: 'white',
        }}
        onPress={() => setCreateChatModal(true)}
        raised
        buttonStyle={styles.newChatBtn}
      />
      {createChatModal ? (
        <ModalChat
          onCancel={() => setCreateChatModal(false)}
          onOk={createChat}
        />
      ) : null}
      {chats.length && openedChatId ? (
        <Chat
          chat={chats.find(chat => chat.id === openedChatId)}
          onClose={() => setOpenedChatId('')}
        />
      ) : null}
    </View>
  );
};

export default observer(ChatScreen);
