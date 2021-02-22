import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button, Form, Input, Item, Tab, Tabs, Text, Icon} from 'native-base';

import {
  confirmSignUp,
  forgotPassword,
  passwordSignIn,
  resendConfirmationCode,
  signUp,
  socialSignIn,
} from '../../util/auth';
import styles from './style.js';
import {useStores} from '../../store';

const ModalAuth = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');

  useEffect(() => {
    setError(null);
    setIsConfirmCode(false);
  }, [email]);

  const handlePasswordSignIn = () => {
    passwordSignIn(email, password)
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        if (err.code === 'UserNotConfirmedException') {
          handleResendConfirmCode();
          setIsConfirmCode(true);
        } else {
          console.log('passwordSignIn error', err);
          setError(err.message);
        }
      });
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      signUp(email, password)
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
      .then((res) => {
        console.log('user confirmed', res);
        return passwordSignIn(email, password);
      })
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSocialSignIn = (provider) => {
    socialSignIn(provider).catch((err) => {
      console.log('socialSignIn err', err);
      setError(err.message);
    });
  };

  const handleResendConfirmCode = () => {
    resendConfirmationCode(email).catch((e) => {
      console.log('resendConfirmationCode error', e);
    });
  };

  const handleForgotPassword = () => {
    props.setModalAdditionalInfo({email});
    props.setModal('resetPassword');
  };

  const changeSignMode = () => {
    setError(null);
    setIsConfirmCode(false);
    setPassword('');
    setConfirmPassword('');
    setIsSignUp(!isSignUp);
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

  const renderSignIn = () => {
    return (
      <>
        <View>
          <Button
            full
            rounded
            style={{...styles.socialButton, backgroundColor: '#db4437'}}
            onPress={() => handleSocialSignIn('Google')}>
            <Icon name="google" type="FontAwesome" />
            <Text style={styles.textStyle}>Google</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{...styles.socialButton, backgroundColor: '#3b5998'}}
            onPress={() => handleSocialSignIn('Facebook')}>
            <Icon name="facebook" type="FontAwesome" />
            <Text style={styles.textStyle}>Facebook</Text>
          </Button>
        </View>
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
        <Item style={styles.input} key={'signInPassword'}>
          <Input
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
        </Item>
        <Button
          full
          rounded
          transparent
          style={styles.button}
          onPress={handleForgotPassword}>
          <Text>Forgot password</Text>
        </Button>
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          success
          style={styles.button}
          disabled={!email || !password || isConfirmCode}
          onPress={handlePasswordSignIn}>
          <Text style={styles.textStyle}>Sign In</Text>
        </Button>
      </>
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
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          danger
          style={styles.button}
          disabled={!confirmCode}
          onPress={handleConfirmSignUp}>
          <Text style={styles.textStyle}>Confirm registration</Text>
        </Button>
        <Button
          full
          rounded
          danger
          style={styles.button}
          onPress={handleResendConfirmCode}>
          <Text style={styles.textStyle}>Resend confirm code</Text>
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
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
        </Item>
        <Item style={styles.input} key={'signUpPassword'}>
          <Input
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
        </Item>
        <Item style={styles.input}>
          <Input
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
          />
        </Item>

        {!isConfirmCode && (
          <>
            {error && <Text style={styles.error}>{error}</Text>}
            <Button
              full
              rounded
              success
              style={styles.button}
              disabled={!email || !password || isConfirmCode}
              onPress={handleSignUp}>
              <Text style={styles.textStyle}>Sign Up</Text>
            </Button>
          </>
        )}
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
      </Form>
    </>
  );
};

export default ModalAuth;
