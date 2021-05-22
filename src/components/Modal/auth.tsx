import React, {useEffect, useState} from 'react';

import {Text, View} from 'react-native';

import {
  facebookSignIn,
  googleSignIn,
  passwordSignIn,
  sendEmailVerification,
  signUp,
} from '../../util/auth';

import {useStores} from '../../store';
import {Input, SocialIcon, Tab} from 'react-native-elements';
import ButtonCustom from '../Button';

import styleSheet from './style';
import {useTranslation} from 'react-i18next';

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

  const {t} = useTranslation();

  const styles = styleSheet();

  const handlePasswordSignIn = (): void => {
    passwordSignIn(email, password)
      .then(cred => {
        if (cred.user && !cred.user.emailVerified) {
          handleSendEmailVerification();
        } else {
          setCloseModal();
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const handleSendEmailVerification = (): void => {
    sendEmailVerification()
      ?.then(() => {
        setModal({
          type: 'confirmEmail',
        });
      })
      .catch(err => {
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
        .catch(err => {
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
      .catch(e => {
        setError(e.message || e);
      });
  };

  const handleFacebookSignIn = (): void => {
    facebookSignIn(setCredential)
      .then(res => {
        if (!res.user.emailVerified) {
          setError('');
          setModal({
            type: 'confirmEmail',
          });
        } else {
          setCloseModal();
        }
      })
      .catch(e => {
        if (e.code === 'auth/account-exists-with-different-credential') {
          setModal({type: 'emailExist'});
        }
        setError(e.message || e);
      });
  };

  const changeSignMode = (): void => {
    setError('');
    setPassword('');
    setConfirmPassword('');
    setIsSignUp(!isSignUp);
  };

  const renderChangeModeTabs = (): JSX.Element => {
    return (
      <Tab
        onChange={changeSignMode}
        value={isSignUp ? 1 : 0}
        disableIndicator
        // indicatorStyle={styles.tabIndicator}
      >
        <Tab.Item
          containerStyle={styles.modalTabLeft}
          titleStyle={styles.modalTabTitle}
          title={t('signIn')}
          active={!isSignUp}
          disabled={!isSignUp}
        />
        <Tab.Item
          containerStyle={styles.modalTabRight}
          titleStyle={styles.modalTabTitle}
          title={t('signUp')}
          active={isSignUp}
          disabled={isSignUp}
        />
      </Tab>
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
        <Input
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          leftIcon={{type: 'material', name: 'email'}}
        />
        <Input
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry
          placeholder={t('modal.placeholder.password')}
          value={password}
          onChangeText={setPassword}
          leftIcon={{type: 'material', name: 'lock'}}
        />
        <ButtonCustom
          rounded
          raised={false}
          type="clear"
          onPress={handlePasswordReset}
          title={t('modal.button.forgotPassword')}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <ButtonCustom
          rounded
          color="success"
          disabled={!email || !password}
          onPress={handlePasswordSignIn}
          containerStyle={styles.button}
          title={t('signIn')}
        />
      </>
    );
  };

  const renderSignUp = (): JSX.Element => {
    return (
      <>
        <Input
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          leftIcon={{type: 'material', name: 'email'}}
        />
        <Input
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry
          placeholder={t('modal.placeholder.password')}
          value={password}
          onChangeText={setPassword}
          leftIcon={{type: 'material', name: 'lock'}}
        />
        <Input
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry
          placeholder={t('modal.placeholder.passwordConfirm')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          leftIcon={{type: 'material', name: 'lock'}}
        />
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <ButtonCustom
            rounded
            color="success"
            disabled={!email || !password || password !== confirmPassword}
            onPress={handleSignUp}
            containerStyle={styles.button}
            title={t('signUp')}
          />
        </>
      </>
    );
  };

  return (
    <>
      {renderChangeModeTabs()}
      <View style={styles.form}>
        {isSignUp ? renderSignUp() : renderSignIn()}
        <ButtonCustom
          rounded
          color="error"
          onPress={setCloseModal}
          containerStyle={styles.button}
          title={t('misc.cancel')}
        />
      </View>
    </>
  );
};

export default ModalAuth;
