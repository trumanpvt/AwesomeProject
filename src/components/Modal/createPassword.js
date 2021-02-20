import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Item, Text} from 'native-base';

import {
  confirmSignUp,
  passwordSignIn,
  resendConfirmationCode,
  signUp,
} from '../../util/auth';
import styles from './style.js';

const ModalCreatePassword = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');

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

  const handleResendConfirmCode = () => {
    resendConfirmationCode(email).catch((e) => {
      console.log('resendConfirmationCode error', e);
    });
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

  return (
    <>
      <Form style={styles.form}>
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
        {isConfirmCode && renderConfirmCode()}
        {error && <Text style={styles.error}>{error}</Text>}
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

export default ModalCreatePassword;
