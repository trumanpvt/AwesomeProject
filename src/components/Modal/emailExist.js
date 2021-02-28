import React, {useState} from 'react';
import {Button, Form, Icon, Input, Item, Text} from 'native-base';
import styles from './style.js';
import {
  facebookSignIn,
  googleSignIn,
  linkWithCredential,
  passwordSignIn,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '../../util/auth';
import {View} from 'react-native';
import {useStores} from '../../store';

const ModalEmailExist = (props) => {
  const {credential, setCredential} = useStores().userStore;

  const [email, setEmail] = useState(props.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log('handleGoogleSignIn success', res);
        linkWithCredential(credential).then(() => {
          props.setCloseModal();
        });
      })
      .catch((e) => {
        console.log('handleGoogleSignIn failed', e);
        setError(e.message || e);
      });
  };

  const handlePasswordSignIn = () => {
    passwordSignIn(email, password)
      .then((cred) => linkWithCredential(credential))
      .then(() => {
        if (cred.user && !cred.user.emailVerified) {
          sendEmailVerification().then(() => {
            props.setModal({
              type: 'confirmEmail',
            });
          });
        } else {
          props.setCloseModal();
        }
      })
      .catch((err) => {
        console.log('passwordSignIn error', err);
        setError(err.message);
      });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn(setCredential)
      .then((res) => {
        console.log('handleFacebookSignIn success', res);
        props.setCloseModal();
      })
      .catch((e) => {
        console.log('handleFacebookSignIn failed', e);
        if (e.code === 'auth/account-exists-with-different-credential') {
          // setCredential({provider: 'facebook', credential});
          props.setModal({type: 'emailExist'});
        } else {
          setError(e.message || e);
        }
      });
  };

  return (
    <Form style={styles.form}>
      <Text style={styles.headerText}>
        Account already exist for provided email.
      </Text>
      <Text style={styles.messageText}>Please first login with Google</Text>
      <Button
        full
        rounded
        style={[styles.socialButtonExist, styles.googleButton]}
        onPress={handleGoogleSignIn}>
        <Icon name="google" type="FontAwesome" />
        <Text style={styles.textStyle}>Google</Text>
      </Button>
      <Text style={styles.messageText}>Or with email/password</Text>
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
        success
        style={styles.button}
        disabled={!email || !password}
        onPress={handlePasswordSignIn}>
        <Text style={styles.textStyle}>Sign In</Text>
      </Button>
      <Text style={styles.messageText}>Or choose another Facebook user</Text>
      <Button
        full
        rounded
        primary
        style={[styles.socialButtonExist, styles.facebookButton]}
        onPress={handleFacebookSignIn}>
        <Icon name="facebook" type="FontAwesome" />
        <Text style={styles.textStyle}>Facebook</Text>
      </Button>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        full
        rounded
        danger
        style={styles.button}
        onPress={() => props.setModal({type: 'auth'})}>
        <Text style={styles.textStyle}>Cancel</Text>
      </Button>
    </Form>
  );
};

export default ModalEmailExist;
