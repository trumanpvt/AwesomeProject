import React, {useEffect, useState} from 'react';

import {View} from 'react-native';
import {
  Button,
  // @ts-ignore
  DefaultTabBar,
  Form,
  Icon,
  Input,
  Item,
  Tab,
  Tabs,
  Text,
} from 'native-base';

import {
  facebookSignIn,
  googleSignIn,
  passwordSignIn,
  sendEmailVerification,
  signUp,
} from '../../util/auth';
import styles from './style.js';
import {useStores} from '../../store';

interface Props {
  setModal: (data: {type?: string; email?: string}) => void;
  setCloseModal: () => void;
}

const ModalAuth = ({setCloseModal, setModal}: Props): JSX.Element => {
  const {setCredential} = useStores().userStore;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [email]);

  const handlePasswordSignIn = (): void => {
    passwordSignIn(email, password)
      .then((cred) => {
        if (cred.user && !cred.user.emailVerified) {
          handleSendEmailVerification();
        } else {
          setCloseModal();
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSendEmailVerification = (): void => {
    sendEmailVerification()
      .then(() => {
        setModal({
          type: 'confirmEmail',
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignUp = (): void => {
    if (password === confirmPassword) {
      signUp(email, password)
        .then(() => {
          setError('');
          setModal({
            type: 'confirmEmail',
          });
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
    }
  };

  const handlePasswordReset = (): void => {
    setModal({type: 'resetPassword', email: email || ''});
  };

  const handleGoogleSignIn = (): void => {
    googleSignIn()
      .then(() => {
        setCloseModal();
      })
      .catch((e) => {
        setError(e.message || e);
      });
  };

  const handleFacebookSignIn = (): void => {
    facebookSignIn(setCredential)
      .then((res) => {
        if (!res.user.emailVerified) {
          setError('');
          setModal({
            type: 'confirmEmail',
          });
        } else {
          setCloseModal();
        }
      })
      .catch((e) => {
        if (e.code === 'auth/account-exists-with-different-credential') {
          setModal({type: 'emailExist'});
        }
        setError(e.message || e);
      });
  };

  const changeSignMode = (): void => {
    setError('');
    // setIsConfirmCode(false);
    setPassword('');
    setConfirmPassword('');
    setIsSignUp(!isSignUp);
  };

  const renderTabBar = (tabsProps: any): JSX.Element => {
    tabsProps.tabStyle = Object.create(tabsProps.tabStyle);
    return <DefaultTabBar {...tabsProps} />;
  };

  const renderChangeModeTabs = (): JSX.Element => {
    return (
      <View style={styles.modalTabsContainer}>
        <Tabs
          renderTabBar={renderTabBar}
          scrollWithoutAnimation
          tabContainerStyle={styles.modalTabs}
          onChangeTab={changeSignMode}>
          <Tab
            tabStyle={styles.modalTab}
            heading={'SignIn'}
            // @ts-ignore
            disabled={!isSignUp}
            activeTabStyle={styles.modalTab}
          />
          <Tab
            tabStyle={styles.modalTab}
            activeTabStyle={styles.modalTab}
            heading={'SignUp'}
            // @ts-ignore
            disabled={isSignUp}
          />
        </Tabs>
      </View>
    );
  };

  const renderSignIn = (): JSX.Element => {
    return (
      <>
        <View>
          <Button
            full
            rounded
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleSignIn}>
            <Icon name="google" type="FontAwesome" />
            <Text style={styles.textStyle}>Google</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={[styles.socialButton, styles.facebookButton]}
            onPress={handleFacebookSignIn}>
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
          onPress={handlePasswordReset}>
          <Text>Forgot password</Text>
        </Button>
        {error ? <Text style={styles.error}>{error}</Text> : null}
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

  const renderSignUp = (): JSX.Element => {
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
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            full
            rounded
            success
            style={styles.button}
            disabled={!email || !password || !confirmPassword}
            onPress={handleSignUp}>
            <Text style={styles.textStyle}>Sign Up</Text>
          </Button>
        </>
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
          onPress={setCloseModal}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Button>
      </Form>
    </>
  );
};

export default ModalAuth;
