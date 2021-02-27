import React from 'react';
import {Modal, View} from 'react-native';
import styles from './style';
import ModalResetPassword from './resetPassword';
import ModalAuth from './auth';
import ModalMessage from './message';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

const ModalContainer = observer(() => {
  const {modal, setModal, setCloseModal} = useStores().modalStore;

  const renderModal = () => {
    switch (modal.type) {
      case 'auth': {
        return <ModalAuth setCloseModal={setCloseModal} setModal={setModal} />;
      }
      case 'resetPassword': {
        return <ModalResetPassword setModal={setModal} />;
      }
      case 'message': {
        return (
          <ModalMessage setCloseModal={setCloseModal} message={modal.message} />
        );
      }
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={!!modal.type}>
      <View style={styles.centeredView}>
        <View style={styles.modalWrap}>{renderModal()}</View>
      </View>
    </Modal>
  );
});

export default ModalContainer;
