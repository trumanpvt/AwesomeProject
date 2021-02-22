import React from 'react';
import {Modal, View} from 'react-native';
import styles from './style';
import ModalCreatePassword from './createPassword';
import ModalAuth from './auth';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';
import {Button, Form, Text} from 'native-base';

const ModalContainer = observer(() => {
  const {modalStore, userStore} = useStores();
  const {modal, setModal, setCloseModal} = useStores().modalStore;

  const showStores = () => {
    console.log('modalStore', modalStore);
    console.log('userStore', userStore);
  };

  const renderModal = () => {
    switch (modal) {
      case 'auth': {
        return <ModalAuth setCloseModal={setCloseModal} setModal={setModal} />;
      }
      case 'createPassword': {
        return <ModalCreatePassword setCloseModal={setCloseModal} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modal !== null}>
      <View style={styles.centeredView}>
        <View style={styles.modalWrap}>
          <Button onPress={showStores}>
            <Text style={styles.buttonText}>Show stores</Text>
          </Button>
          {renderModal()}
        </View>
      </View>
    </Modal>
  );
});

export default ModalContainer;
