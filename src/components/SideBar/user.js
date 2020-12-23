import React, {useState} from 'react';
import {View, Image, Modal} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import ModalAuth from '../Modal/auth';
import styles from './style.js';

const User = (props) => {
  const [showModal, setShowModal] = useState(false);

  // const handlePressLogin = () => {};

  return (
    <View style={styles.userContent}>
      <Button onPress={() => setShowModal(!showModal)}>
        <Text>Login/Register</Text>
      </Button>
      <Text>User TEXT</Text>
      <ModalAuth navigation={props.navigation} showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

export default User;
