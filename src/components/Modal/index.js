import React from 'react';
import {Modal, View} from 'react-native';
import styles from './style';
import ModalResetPassword from './resetPassword';
import ModalAuth from './auth';
// import ModalSignUp from './signup';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

const ModalContainer = observer(() => {
  const {
    modal,
    setModal,
    setCloseModal,
    setModalAdditionalInfo,
  } = useStores().modalStore;

  const renderModal = () => {
    switch (modal) {
      case 'auth': {
        return (
          <ModalAuth
            setCloseModal={setCloseModal}
            setModal={setModal}
            setModalAdditionalInfo={setModalAdditionalInfo}
          />
        );
      }
      case 'resetPassword': {
        return <ModalResetPassword setModal={setModal} />;
      }
      case 'resetPassword': {
        return <ModalConfirmEmail setCloseModal={setModal} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modal !== null}>
      <View style={styles.centeredView}>
        <View style={styles.modalWrap}>{renderModal()}</View>
      </View>
    </Modal>
  );
});

export default ModalContainer;
