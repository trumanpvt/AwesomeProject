import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Container,
  Button,
  Form,
  Input,
  Item,
  Text,
  Header,
  Content,
  Tab,
  Tabs,
  Segment,
} from 'native-base';

import {
  checkPasswordProvider,
  confirmSignUp,
  getCurrentUserInfo,
  googleSignIn,
  passwordSignIn,
  signUp,
} from '../../util/auth';

import {GoogleSigninButton} from '@react-native-community/google-signin';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import styles from './style.js';
import {useStores} from '../../store';
import {Auth} from 'aws-amplify';

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
        setUser(user);
        // props.setCloseModal();
      })
      .catch((err) => {
        if (err.code === 'UserNotConfirmedException') {
          setIsConfirmCode(true);
        }
        console.log(err);
        setError(err.message);
      });
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      signUp(email, password, username)
        .then((result) => {
          console.log('handleSignUp result', result);
          console.log(
            'handleSignUp result user',
            result.user.getUserContextData(),
          );
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
        getCurrentUserInfo
          .then((result) => {
            console.log('Auth.currentUserInfo()', result);
            setUser(result);
          })
          .catch((err) => {
            setError(err.message);
          });
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
    setIsConfirmCode(false);
    setPassword('');
    setConfirmPassword('');
  };

  const renderChangeModeTabs = () => {
    return (
      // <View style={styles.modalTabs}>
      //   <Button
      //     full
      //     danger
      //     style={styles.buttonTab}
      //     onPress={() => setIsSignUp(false)}>
      //     <Text style={styles.textStyle}>SignIn</Text>
      //   </Button>
      //   <Button
      //     full
      //     danger
      //     style={styles.buttonTab}
      //     onPress={() => setIsSignUp(true)}>
      //     <Text style={styles.textStyle}>SignUp</Text>
      //   </Button>
      // </View>
      // <View style={styles.modalTabs}>
      //   <Tabs activeTabStyle={{borderBottomColor: '#fff'}}>
      //     <Tab heading={'SignIn'}>{/* <Tab1 /> */}</Tab>
      //     <Tab heading={'SignUp'}>{/* <Tab2 /> */}</Tab>
      //   </Tabs>
      // </View>
      <Segment>
        <Button first>
          <Text>Puppies</Text>
        </Button>
        <Button last active>
          <Text>Cubs</Text>
        </Button>
      </Segment>
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
          <Text style={styles.textStyle}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Text>
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
    </>
  );
};

export default ModalAuth;
