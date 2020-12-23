import React, {useState} from 'react';
import {Modal, View} from 'react-native';
import {Button, Form, Input, Item, Text} from 'native-base';
import auth from '@react-native-firebase/auth';

import styles from './style.js';

const ModalAuth = (props) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(userName, password)
      .then((res) => {
        console.log(res);
      });
    // props.setShowModal(!props.showModal);
    // props.navigation.navigate('ProfileScreen');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.showModal}
      onRequestClose={() => props.setShowModal(!props.showModal)}>
      <View style={styles.centeredView}>
        <Form style={styles.form}>
          <Item>
            <Input
              textContentType="username"
              value={userName}
              onChangeText={setUserName}
              placeholder="Username"
            />
          </Item>
          <Item last>
            <Input
              textContentType="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </Item>
          <Button full rounded style={styles.button} onPress={handleLogin}>
            <Text style={styles.textStyle}>Sign In</Text>
          </Button>
          <Button
            full
            rounded
            danger
            style={styles.button}
            onPress={() => props.setShowModal(!props.showModal)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Button>
        </Form>
      </View>
    </Modal>
  );
};

export default ModalAuth;
