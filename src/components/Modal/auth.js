import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Form, Input, Item, Tab, Tabs, Text} from 'native-base';

import {
  checkPasswordProvider,
  confirmSignUp,
  getCurrentAuthenticatedUserInfo,
  googleSignIn,
  passwordSignIn,
  resendConfirmationCode,
  signUp,
  socialSignIn,
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
      .then((result) => {
        console.log('sign in user', result);
        setError(null);
        setUser(result);
        props.setCloseModal();
      })
      .catch((err) => {
        if (err.code === 'UserNotConfirmedException') {
          resendConfirmationCode(email)
            .then((res) => {
              console.log('resendConfirmationCode', res);
            })
            .catch((err) => {
              setError(err.message);
            });
          setIsConfirmCode(true);
        }
        console.log(err);
        setError(err.message);
      });
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      signUp(email, password, username)
        .then(() => {
          setError(null);
          setIsConfirmCode(true);
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
        handlePasswordSignIn(email, password);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSocialSignIn = (provider) => {
    socialSignIn(provider)
      .then((res) => {
        // handlePasswordSignIn(email, password);
        console.log('socialSignIn res', res);
        getCurrentAuthenticatedUserInfo()
          .then((res) => {
            console.log(
              'handleSocialSignIn getCurrentAuthenticatedUserInfo',
              res,
            );
            setUser(res);
          })
          .catch((err) => {
            console.log(
              'handleSocialSignIn getCurrentAuthenticatedUserInfo err',
              err,
            );
            setError(err.message);
          });
      })
      .catch((err) => {
        console.log('socialSignIn err', err);
        setError(err.message);
      });
  };

  const getUserInfo = () => {
    getCurrentAuthenticatedUserInfo()
      .then((result) => {
        console.log('Auth.currentAuthenticatedUser()', result);
      })
      .catch((e) => {
        console.log('Auth.currentAuthenticatedUser() error', e);
      });
  };

  // const handleGoogleSignIn = async () => {
  //   googleSignIn()
  //     .then((UserCredential) => {
  //       console.log('UserCredential', UserCredential);
  //       setError(null);
  //       setUser(UserCredential.user);
  //       checkIsPasswordUserExists(UserCredential.user);
  //     })
  //     .catch((err) => {
  //       console.log('handleGoogleSignIn error', err);
  //       setError(err.message || err);
  //     });
  // };

  // const checkIsPasswordUserExists = () => {
  //   if (checkPasswordProvider()) {
  //     props.setCloseModal();
  //   } else {
  //     props.setModal('createPassword');
  //   }
  // };

  const changeSignMode = () => {
    setError(null);
    setIsSignUp(!isSignUp);
    setIsConfirmCode(false);
    setPassword('');
    setConfirmPassword('');
  };

  const renderChangeModeTabs = () => {
    return (
      <View style={styles.modalTabsContainer}>
        <Tabs
          scrollWithoutAnimation
          tabContainerStyle={styles.modalTabs}
          onChangeTab={changeSignMode}>
          <Tab
            tabStyle={styles.modalTab}
            heading={'SignIn'}
            disabled={!isSignUp}
            activeTabStyle={styles.modalTab}
          />
          <Tab
            tabStyle={styles.modalTab}
            activeTabStyle={styles.modalTab}
            heading={'SignUp'}
            disabled={isSignUp}
          />
        </Tabs>
      </View>
    );
  };

  const renderConfirmCode = () => {
    return (
      <>
        <Text style={styles.error}>Please confirm with code sent to email</Text>
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
    );
  };

  const renderSignIn = () => {
    return (
      <>
        {/*<GoogleSigninButton*/}
        {/*  style={styles.googleButton}*/}
        {/*  color={GoogleSigninButton.Color.Dark}*/}
        {/*  onPress={handleGoogleSignIn}*/}
        {/*/>*/}
        <Button
          full
          rounded
          // danger
          style={styles.button}
          onPress={() => handleSocialSignIn('Google')}>
          <Text style={styles.textStyle}>Google</Text>
        </Button>
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
        {isConfirmCode && renderConfirmCode()}
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
        {isConfirmCode && renderConfirmCode()}
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
    <>
      {renderChangeModeTabs()}
      <Form style={styles.form}>
        {isSignUp ? renderSignUp() : renderSignIn()}
        <Button
          full
          rounded
          danger
          style={styles.button}
          onPress={props.setCloseModal}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Button>
        <Button
          full
          rounded
          success
          style={styles.button}
          onPress={getUserInfo}>
          <Text style={styles.textStyle}>getUserInfo</Text>
        </Button>
      </Form>
    </>
  );
};

export default ModalAuth;
