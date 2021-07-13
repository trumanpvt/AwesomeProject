import React from 'react';

import {GiftedChat} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';

import {Modal, SafeAreaView} from 'react-native';

// import {useTranslation} from 'react-i18next';
import {ChatProps} from './index';

import styles from './style';
import {IMessage} from 'react-native-gifted-chat/lib/Models';
import {useStores} from '../../store';

const Chat = ({chat}: {chat: ChatProps | undefined}) => {
  // const {t} = useTranslation();

  const {user} = useStores().userStore;

  const onSend = (messagesNew: IMessage[]) => {
    console.log('messagesNew', messagesNew);
    firestore()
      .collection('MESSAGE_THREADS')
      .doc(chat && chat.id)
      .update({
        messages: chat ? [...chat.messages, ...messagesNew] : messagesNew,
      })
      .then(() => {
        console.log('MESSAGE_THREADS updated!');
      });
  };

  return (
    <Modal supportedOrientations={['portrait', 'landscape']}>
      <SafeAreaView style={styles.chatContainer}>
        <GiftedChat
          messages={chat?.messages}
          onSend={message => onSend(message)}
          user={{
            _id: user ? user.uid : 1,
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default Chat;
