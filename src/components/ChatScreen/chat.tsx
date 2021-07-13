import React, {useEffect} from 'react';

import {GiftedChat} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';

import {Modal, SafeAreaView} from 'react-native';

// import {useTranslation} from 'react-i18next';
import {ChatProps} from './index';

import styles from './style';
import {IMessage} from 'react-native-gifted-chat/lib/Models';
import {useStores} from '../../store';
import moment from 'moment';
import 'dayjs/locale/';
const Chat = ({chat}: {chat: ChatProps | undefined}) => {
  // const {t} = useTranslation();

  const {user} = useStores().userStore;

  const onSend = (messagesNew: IMessage[]) => {
    console.log('messagesNew', messagesNew);
    if (chat) {
      const messagesFormatted = messagesNew.map((message: IMessage) => {
        return {
          ...message,
          createdAt: moment().format(),
        };
      });
      firestore()
        .collection('MESSAGE_THREADS')
        .doc(chat && chat.id)
        .update({
          // @ts-ignore
          messages: GiftedChat.append(chat.messages, messagesFormatted),
        })
        .then(() => {
          console.log('MESSAGE_THREADS updated!');
        });
    }
  };

  return (
    <Modal supportedOrientations={['portrait', 'landscape']}>
      <SafeAreaView style={styles.chatContainer}>
        <GiftedChat
          messages={chat?.messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: user ? user.uid : '',
            name: user ? user.displayName || user.email || '' : '',
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default Chat;
