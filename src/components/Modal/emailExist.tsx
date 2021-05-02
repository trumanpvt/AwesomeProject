import React, {useState} from 'react';

import {Text, View} from 'react-native';

import {
  facebookSignIn,
  googleSignIn,
  linkWithCredential,
  passwordSignIn,
  sendEmailVerification,
} from '../../util/auth';

import {useStores} from '../../store';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {Input, SocialIcon} from 'react-native-elements';
import ButtonCustom from '../Button';
import styleSheet from './style';

interface Props {
  setModal: (data: {type: string}) => void;
  setCloseModal: () => void;
}

const ModalEmailExist = ({setModal, setCloseModal}: Props) => {
  const {credential, setCredential} = useStores().userStore;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const styles = styleSheet();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        linkWithCredential(credential)?.then(() => {
          setCloseModal();
        });
      })
      .catch((e) => {
        setError(e.message || e);
      });
  };

  const handlePasswordSignIn = () => {
    let user: FirebaseAuthTypes.User | null = null;
    passwordSignIn(email, password)
      .then((cred) => {
        user = cred.user;
        return linkWithCredential(credential);
      })
      .then(() => {
        if (user && !user.emailVerified) {
          sendEmailVerification()?.then(() => {
            setModal({
              type: 'confirmEmail',
            });
          });
        } else {
          setCloseModal();
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn(setCredential)
      .then(() => {
        setCloseModal();
      })
      .catch((e) => {
        if (e.code === 'auth/account-exists-with-different-credential') {
          // setCredential({provider: 'facebook', credential});
          setModal({type: 'emailExist'});
        } else {
          setError(e.message || e);
        }
      });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.headerText}>
        Account already exist for provided email.
      </Text>
      <Text style={styles.messageText}>Please first login with Google</Text>
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
        style={styles.socialButtonExist}
      />
      <Text style={styles.messageText}>Or with email/password</Text>
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        leftIcon={{type: 'material', name: 'lock'}}
      />
      <ButtonCustom
        rounded
        color="success"
        disabled={!email || !password}
        onPress={handlePasswordSignIn}
        buttonStyle={styles.button}
        title="Sign In"
      />
      <Text style={styles.messageText}>Or choose another Facebook user</Text>
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
        style={styles.socialButtonExist}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <ButtonCustom
        rounded
        color="error"
        onPress={() => setModal({type: 'auth'})}
        buttonStyle={styles.button}
        title="Cancel"
      />
    </View>
  );
};

export default ModalEmailExist;
