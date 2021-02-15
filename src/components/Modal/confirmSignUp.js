import React, {useState} from 'react';
import {Button, Form, Input, Item, Text} from 'native-base';

import {
  checkPasswordProvider,
  confirmSignUp,
  googleSignIn,
  passwordSignIn,
  signUp,
} from '../../util/auth';

import {GoogleSigninButton} from '@react-native-community/google-signin';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import styles from './style.js';
import {useStores} from '../../store';

const ModalAuth = (props) => {
  const {user, setUser} = useStores().userStore;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const [confirmCode, setConfirmCode] = useState(false);

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
      signUp(email, password, username)
        .then((result) => {
          setError(null);
          setUser(result.user);
          setIsConfirmCode(true);
          // props.setCloseModal();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
    }
  };

  const handleConfirmSignUp = () => {
    confirmSignUp(email, confirmCode)
      .then(() => {
        // setError(null);
        // setIsConfirmCode(false);
        props.setCloseModal();
      })
      .catch((err) => {
        setError(err.message);
      });
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

  const renderSignIn = () => {
    return (
      <>
        <GoogleSigninButton
          style={styles.googleButton}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
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
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          success
          style={styles.button}
          disabled={!email || !password}
          onPress={handlePasswordSignIn}>
          <Text style={styles.textStyle}>Sign In</Text>
        </Button>
      </>
    );
  };

  const renderSignUp = () => {
    return (
      <>
        <Item style={styles.input}>
          <Input
            autoCapitalize="none"
            textContentType="name"
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            keyboardType="default"
          />
        </Item>
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
        <Item style={styles.input}>
          <Input
            textContentType="password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
          />
        </Item>
        {isConfirmCode && (
          <>
            <Text style={styles.error}>
              Please confirm with code sent to email
            </Text>
            <Item style={styles.input}>
              <Input
                textContentType="none"
                value={confirmCode}
                onChangeText={setConfirmCode}
                placeholder="Confirm code"
                keyboardType="number-pad"
              />
            </Item>
            <Button
              full
              rounded
              danger
              style={styles.button}
              disabled={!confirmCode}
              onPress={handleConfirmSignUp}>
              <Text style={styles.textStyle}>Send confirm code</Text>
            </Button>
          </>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          success
          style={styles.button}
          disabled={!email || !password}
          onPress={handleSignUp}>
          <Text style={styles.textStyle}>Sign Up</Text>
        </Button>
      </>
    );
  };

  return (
    <Form style={styles.form}>
      <Button full rounded success style={styles.button} onPress={() => {}}>
        <Text style={styles.textStyle}>Show if user exists</Text>
      </Button>
      <Button
        full
        rounded
        success
        style={styles.button}
        onPress={() => {
          console.log(user);
        }}>
        <Text style={styles.textStyle}>Show user data</Text>
      </Button>
      {isSignUp ? renderSignUp() : renderSignIn()}
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
    </Form>
  );
};

export default ModalAuth;