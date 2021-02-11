import React, {useState} from 'react';
import {useDataStore} from '../../store/context';
import {Modal, View} from 'react-native';
import {Button, Form, Input, Item, Text} from 'native-base';

import {passwordSignIn, signUp, googleSignIn} from '../../util/auth';

import {GoogleSigninButton} from '@react-native-community/google-signin';

import styles from './style.js';

const ModalAuth = (props) => {
  const userStore = useDataStore().userStore;
  const {setUser} = userStore;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [isSignInInProgress, setIsSignInInProgress] = useState(false);
  const [showCreatePasswordModal, setShowCreatePasswordModal] = useState(false);

  const handlePasswordSignIn = () => {
    passwordSignIn(username, password)
      .then((UserCredential) => {
        setError(null);
        setUser(UserCredential.user);
        props.setShowModal(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      signUp(username, password)
        .then((UserCredential) => {
          setError(null);
          setUser(UserCredential.user);
          props.setShowModal(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSignInInProgress(true);
    googleSignIn()
      .then((UserCredential) => {
        setError(null);
        setUser(UserCredential.user);
        checkIsPasswordUserExists();
        // props.setShowModal(false);
      })
      .catch((err) => {
        console.log('handleGoogleSignIn error', err);
        setError(err.message || err);
      });
  };

  const checkIsPasswordUserExists = () => {
    props.setShowModal(false);
  };

  const renderSign = () => {
    return (
      <>
        <GoogleSigninButton
          style={styles.googleButton}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
          disabled={isSignInInProgress}
        />
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
        {isSignUp && (
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
          onPress={isSignUp ? handleSignUp : handlePasswordSignIn}>
          <Text style={styles.textStyle}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={styles.button}
          onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.textStyle}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
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
      </>
    );
  };

  const renderCreatePassword = () => {};

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => props.setShowModal(!props.showModal)}>
      <View style={styles.centeredView}>
        <Form style={styles.form}>
          {!showCreatePasswordModal ? renderSign() : renderCreatePassword()}
        </Form>
      </View>
    </Modal>
  );
};

export default ModalAuth;
