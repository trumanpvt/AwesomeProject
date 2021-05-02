import React, {useEffect, useState} from 'react';

import {View} from 'react-native';
import {
  Button,
  DefaultTabBar,
  Form,
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
import styles from './style';
import {useStores} from '../../store';
import {SocialIcon} from 'react-native-elements';
import ButtonCustom from '../Button';

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
          <SocialIcon
            title="Google"
            button
            type="google"
            onPress={handleGoogleSignIn}
            raised
            iconType="font-awesome"
            iconSize={20}
            iconColor="white"
            fontStyle={styles.socialButtonTitle}
            style={styles.socialButton}
          />
          <SocialIcon
            title="Facebook"
            button
            type="facebook"
            onPress={handleFacebookSignIn}
            raised
            iconType="font-awesome"
            iconSize={20}
            iconColor="white"
            fontStyle={styles.socialButtonTitle}
            style={styles.socialButton}
          />
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
        <ButtonCustom
          rounded
          color="success"
          disabled={!email || !password}
          onPress={handlePasswordSignIn}
          buttonStyle={styles.button}
          title="Sign In"
        />
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
          <ButtonCustom
            rounded
            color="success"
            disabled={!email || !password || !confirmPassword}
            onPress={handleSignUp}
            buttonStyle={styles.button}
            title="Sign Up"
          />
        </>
      </>
    );
  };

  return (
    <>
      {renderChangeModeTabs()}
      <Form style={styles.form}>
        {isSignUp ? renderSignUp() : renderSignIn()}
        <ButtonCustom
          rounded
          color="error"
          onPress={setCloseModal}
          buttonStyle={styles.button}
          title="Cancel"
        />
      </Form>
    </>
  );
};

export default ModalAuth;
