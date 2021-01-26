import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal, View} from 'react-native';
import {Button, Form, Input, Item, Text} from 'native-base';
import auth from '@react-native-firebase/auth';
import {setUser} from '../../actions';

import styles from './style.js';

const ModalAuth = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const setUserData = (user) => dispatch(setUser(user));

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then((UserCredential) => {
        setError(null);
        setUserData(UserCredential.user);
        props.setShowModal(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      auth()
        .createUserWithEmailAndPassword(username, password)
        .then((UserCredential) => {
          setError(null);
          setUserData(UserCredential.user);
          props.setShowModal(false);
          props.navigation.navigate('ProfileScreen');
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
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
              textContentType="emailAddress"
              value={username}
              onChangeText={setUsername}
              placeholder="Email"
              keyboardType="email-address"
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
          {signUp && (
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
            success
            style={styles.button}
            disabled={!username || !password}
            onPress={signUp ? handleSignUp : handleLogin}>
            <Text style={styles.textStyle}>
              {signUp ? 'Sign Up' : 'Sign In'}
            </Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={styles.button}
            onPress={() => setSignUp(!signUp)}>
            <Text style={styles.textStyle}>
              {signUp ? 'Sign In' : 'Sign Up'}
            </Text>
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
