import React from 'react';
import {Modal, ScrollView, View} from 'react-native';
import styleSheet from './style';
import ModalResetPassword from './resetPassword';
import ModalAuth from './auth';
import ModalMessage from './message';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';
import ModalConfirmEmail from './confirmEmail';
import ModalEmailExist from './emailExist';

const ModalContainer = () => {
  const {modalStore, stateStore} = useStores();
  const {modal, setModal, setCloseModal} = modalStore;
  const {orientation} = stateStore;

  const styles = styleSheet();

  const renderModal = () => {
    switch (modal.type) {
      case 'auth': {
        return (
          <ModalAuth
            setCloseModal={setCloseModal}
            setModal={setModal}
            orientation={orientation}
          />
        );
      }
      case 'resetPassword': {
        return <ModalResetPassword setModal={setModal} email={modal.email} />;
      }
      case 'confirmEmail': {
        return <ModalConfirmEmail setCloseModal={setCloseModal} />;
      }
      case 'emailExist': {
        return (
          <ModalEmailExist setCloseModal={setCloseModal} setModal={setModal} />
        );
      }
      case 'message': {
        return (
          <ModalMessage setCloseModal={setCloseModal} message={modal.message} />
        );
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!modal.type}
      supportedOrientations={['portrait', 'landscape']}>
      {orientation === 'PORTRAIT' ? (
        <View style={styles.centeredView}>
          <View style={styles.modalWrap}>{renderModal()}</View>
        </View>
      ) : (
        <ScrollView style={styles.modalWrapLandscape}>
          {renderModal()}
        </ScrollView>
      )}
    </Modal>
  );
};

export default observer(ModalContainer);
