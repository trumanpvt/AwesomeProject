import React, {useState} from 'react';
import {Modal, Text, View} from 'react-native';
import styles from './style';
import ButtonCustom from '../../Elements/Button';
import {useTranslation} from 'react-i18next';
import InputCustom from '../../Elements/Input';

interface ModalChatProps {
  onOk: (name: string) => void;
  onCancel: () => void;
}

const ModalChat = ({onOk, onCancel}: ModalChatProps) => {
  const [name, setName] = useState('');

  const {t} = useTranslation();

  const renderModalBody = () => {
    return (
      <View style={styles.form}>
        <Text style={styles.messageText}>{t('chats.createNew')}</Text>
        <InputCustom
          inputStyle={styles.nameInput}
          placeholder={t('chats.placeholder.createNew')}
          value={name}
          onChangeText={setName}
          leftIcon={{name: 'title'}}
        />
        <ButtonCustom
          rounded
          color="primary"
          disabled={!name}
          onPress={() => onOk(name)}
          containerStyle={styles.button}
          title={t('misc.ok')}
        />
        <ButtonCustom
          rounded
          color="error"
          onPress={onCancel}
          containerStyle={styles.button}
          title={t('misc.cancel')}
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.centeredView}>
        <View style={styles.modalWrap}>{renderModalBody()}</View>
      </View>
    </Modal>
  );
};

export default ModalChat;
