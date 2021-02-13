import React from 'react';
import {Modal, View} from 'react-native';
import styles from './style';
import {Form} from 'native-base';
import CreatePassword from './createPassword';
import Auth from './auth';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

const ModalContainer = observer(() => {
  const {modal, setModal, setCloseModal} = useStores().modalStore;

  const renderModal = () => {
    console.log('ModalContainer', modal);
    switch (modal) {
      case 'auth': {
        return <Auth setCloseModal={setCloseModal} setModal={setModal} />;
      }
      case 'createPassword': {
        return (
          <CreatePassword setCloseModal={setCloseModal} setModal={setModal} />
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal !== null}
      // onRequestClose={() => props.setShowModal(!props.showModal)}
    >
      <View style={styles.centeredView}>
        <Form style={styles.form}>{renderModal()}</Form>
      </View>
    </Modal>
  );
});

export default ModalContainer;