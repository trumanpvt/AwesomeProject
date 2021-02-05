import React, {useState} from 'react';
import {useDataStore} from '../../Store/context';
import {Modal, View} from 'react-native';
import {Button, Form, Input, Item, Text} from 'native-base';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {webClientId} from '../../constants';

import styles from './style.js';

const ModalAuth = (props) => {
  const userStore = useDataStore().userStore;
  const {setUser} = userStore;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [authProviderLoginSuccess, setAuthProviderLoginSuccess] = useState(
    false,
  );

  // const dispatch = useDispatch();
  // const setUserData = (user) => dispatch(setUser(user));

  const handlePasswordLogin = () => {
    auth()
      .signInWithEmailAndPassword(username, password)
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
      auth()
        .createUserWithEmailAndPassword(username, password)
        .then((UserCredential) => {
          setError(null);
          setUser(UserCredential.user);
          props.setShowModal(false);
          // props.navigation.navigate('ProfileScreen');
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
    }
  };

  const handleGoogleLogin = async () => {
    GoogleSignin.configure({
      webClientId,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      auth()
        .signInWithCredential(googleCredential)
        .then((UserCredential) => {
          setError(null);
          setUser(UserCredential.user);
          props.setShowModal(false);
        });
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('login failed:', e);
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
          {/*<Item>*/}
          <GoogleSigninButton
            style={styles.googleButton}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleLogin}
            // disabled={isSigninInProgress}
          />
          {/*</Item>*/}
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
            onPress={signUp ? handleSignUp : handlePasswordLogin}>
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
