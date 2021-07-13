import React, {useEffect} from 'react';

import {GiftedChat} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';

import {Modal, SafeAreaView} from 'react-native';

// import {useTranslation} from 'react-i18next';
import {SingleChat} from './index';

import styles from './style';
import {IMessage} from 'react-native-gifted-chat/lib/Models';
import {useStores} from '../../store';
import moment from 'moment';
import 'dayjs/locale/';
import {Icon, useTheme} from 'react-native-elements';

interface ChatProps {
  chat: SingleChat | undefined;
  onClose: () => void;
}
const Chat = ({chat, onClose}: ChatProps) => {
  // const {t} = useTranslation();

  const {user} = useStores().userStore;

  const {theme} = useTheme();

  const onSend = (messagesNew: IMessage[]) => {
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
          latestMessage: messagesFormatted[messagesFormatted.length - 1].text,
          latestMessageDate: moment().format(),
        })
        .then(() => {
          console.log('MESSAGE_THREADS updated!');
        });
    }
  };

  return (
    <Modal supportedOrientations={['portrait', 'landscape']}>
      <SafeAreaView style={styles.chatContainer}>
        <Icon
          raised
          size={25}
          name="close"
          color={theme.colors?.error}
          onPress={onClose}
          containerStyle={styles.closeChatBtn}
        />
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
