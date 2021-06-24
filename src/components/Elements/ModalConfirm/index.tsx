import React from 'react';
import {Modal, Text, View} from 'react-native';
import styles from './style';
import ButtonCustom from '../Button';
import {useTranslation} from 'react-i18next';

interface ModalConfirmProps {
  onOk: () => void;
  onCancel: () => void;
  message: string;
}

const ModalConfirm = ({onOk, onCancel, message}: ModalConfirmProps) => {
  const {t} = useTranslation();

  const renderModalBody = () => {
    return (
      <View style={styles.form}>
        <Text style={styles.messageText}>{message}</Text>
        <ButtonCustom
          rounded
          color="primary"
          onPress={onOk}
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

export default ModalConfirm;
