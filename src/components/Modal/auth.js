import React, {useState} from 'react';
import {Button, Input, Item, Text} from 'native-base';

import {
  googleSignIn,
  passwordSignIn,
  signUp,
  checkPasswordProvider,
} from '../../util/auth';

import {GoogleSigninButton} from '@react-native-community/google-signin';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import styles from './style.js';
import {useStores} from '../../store';

const Auth = (props) => {
  const {user, setUser} = useStores().userStore;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordSignIn = () => {
    passwordSignIn(email, password)
      .then((UserCredential) => {
        setError(null);
        setUser(UserCredential.user);
        props.setCloseModal();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      signUp(email, password)
        .then((UserCredential) => {
          setError(null);
          setUser(UserCredential.user);
          props.setCloseModal();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
    }
  };

  const handleGoogleSignIn = async () => {
    googleSignIn()
      .then((UserCredential) => {
        console.log('UserCredential', UserCredential);
        setError(null);
        setUser(UserCredential.user);
        checkIsPasswordUserExists(UserCredential.user);
      })
      .catch((err) => {
        console.log('handleGoogleSignIn error', err);
        setError(err.message || err);
      });
  };

  const checkIsPasswordUserExists = () => {
    if (checkPasswordProvider()) {
      props.setCloseModal();
    } else {
      props.setModal('createPassword');
    }
  };

  const changeSignMode = () => {
    setError(null);
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <Button
        full
        rounded
        success
        style={styles.button}
        onPress={() => {
          // console.log(auth().getUserByEmail('trumanpvt@gmail.com'));
        }}>
        <Text style={styles.textStyle}>Show if user exists</Text>
      </Button>
      <Button
        full
        rounded
        success
        style={styles.button}
        onPress={() => {
          // console.log(auth().currentUser);
        }}>
        <Text style={styles.textStyle}>Show user data</Text>
      </Button>
      {!isSignUp && (
        <GoogleSigninButton
          style={styles.googleButton}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      )}
      <Item style={styles.input}>
        <Input
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
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
        disabled={!email || !password}
        onPress={isSignUp ? handleSignUp : handlePasswordSignIn}>
        <Text style={styles.textStyle}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      </Button>
      <Button
        full
        rounded
        primary
        style={styles.button}
        onPress={changeSignMode}>
        <Text style={styles.textStyle}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
      </Button>
      <Button
        full
        rounded
        danger
        style={styles.button}
        onPress={props.setCloseModal}>
        <Text style={styles.textStyle}>Cancel</Text>
      </Button>
    </>
  );
};

export default Auth;
