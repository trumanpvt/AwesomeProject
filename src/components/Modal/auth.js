import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal, View} from 'react-native';
import {Button, Form, Input, Item, Text} from 'native-base';
import auth from '@react-native-firebase/auth';
import {setUser} from '../../actions';

import styles from './style.js';

const ModalAuth = (props) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const setUserData = (user) => dispatch(setUser(user));

  const handleLogin = () => {
    setShowConfirmPassword(false);

    auth()
      .signInWithEmailAndPassword(userName, password)
      .then((res) => {
        setError(null);
        setUserData(res.user);
        props.setShowModal(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleRegister = () => {
    if (password.length > 0 && password === confirmPassword) {
      auth()
        .createUserWithEmailAndPassword(userName, password)
        .then((res) => {
          setError(null);
          setUserData(res.user);
          props.setShowModal(false);
          props.navigation.navigate('ProfileScreen');
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      if (!showConfirmPassword) {
        setShowConfirmPassword(true);
      } else {
        setError('Confirm Password');
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => props.setShowModal(!props.showModal)}>
      <View style={styles.centeredView}>
        <Form style={styles.form}>
          <Item style={styles.input}>
            <Input
              autoCapitalize="none"
              textContentType="username"
              value={userName}
              onChangeText={setUserName}
              placeholder="Username"
            />
          </Item>
          <Item style={styles.input}>
            <Input
              textContentType="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </Item>
          {showConfirmPassword && (
            <Item style={styles.input}>
              <Input
                textContentType="password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
              />
            </Item>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
          <Button
            full
            rounded
            primary
            style={styles.button}
            onPress={handleLogin}>
            <Text style={styles.textStyle}>Sign In</Text>
          </Button>
          <Button
            full
            rounded
            success
            style={styles.button}
            onPress={handleRegister}>
            <Text style={styles.textStyle}>Sign Up</Text>
          </Button>
          <Button
            full
            rounded
            danger
            style={styles.button}
            onPress={() => props.setShowModal(false)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Button>
        </Form>
      </View>
    </Modal>
  );
};

export default ModalAuth;
