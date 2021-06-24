import React from 'react';
import {Modal, ScrollView, Text, View} from 'react-native';
import styleSheet from './style';
import {useStores} from '../../../store';
import ButtonCustom from '../Button';
import {useTranslation} from 'react-i18next';

interface ModalConfirmProps {
  onOk: () => {};
  onCancel: () => {};
}

const ModalConfirm = ({onOk, onCancel}: ModalConfirmProps) => {
  const {orientation} = useStores().stateStore;

  const styles = styleSheet();

  const {t} = useTranslation();

  const renderModalBody = () => {
    return (
      <View style={styles.form}>
        <Text style={styles.headerText}>
          Account already exist for provided email.
        </Text>
        <Text style={styles.messageText}>Please first login with Google</Text>
        <ButtonCustom
          rounded
          color="primary"
          onPress={onOk}
          buttonStyle={styles.button}
          title={t('misc.ok')}
        />
        <ButtonCustom
          rounded
          color="error"
          onPress={onCancel}
          buttonStyle={styles.button}
          title={t('misc.cancel')}
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      // visible={opeenModal}
      supportedOrientations={['portrait', 'landscape']}>
      {orientation === 'PORTRAIT' ? (
        <View style={styles.centeredView}>
          <View style={styles.modalWrap}>{renderModalBody()}</View>
        </View>
      ) : (
        <ScrollView style={styles.modalWrapLandscape}>
          {renderModalBody()}
        </ScrollView>
      )}
    </Modal>
  );
};

export default ModalConfirm;
