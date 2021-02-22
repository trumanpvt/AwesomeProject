import React, {useState} from 'react';
import {Button, Form, Input, Item, Text} from 'native-base';
import styles from './style.js';
import {
  forgotPassword,
  forgotPasswordSubmit,
  passwordSignIn,
} from '../../util/auth';
import {useStores} from '../../store';

const ModalResetPassword = (props) => {
  const {additionalInfo} = useStores().modalStore;

  const [email, setEmail] = useState(additionalInfo.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const [error, setError] = useState(null);

  const handleForgotPassword = () => {
    forgotPassword(email)
      .then(() => {
        setIsConfirmCode(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleResendCode = () => {
    forgotPassword(email).catch((err) => {
      setError(err.message);
    });
  };

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      forgotPasswordSubmit(email, confirmCode, password)
        .then(() => {
          // props.setCloseModal();
          return passwordSignIn(email, password);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
    }
  };

  const renderPasswordInputs = () => {
    return (
      <>
        <Text style={styles.error}>Confirm code was sent to email</Text>
        <Item style={styles.input}>
          <Input
            textContentType="none"
            value={confirmCode}
            onChangeText={setConfirmCode}
            placeholder="Confirm code"
            keyboardType="number-pad"
          />
        </Item>
        <Item style={styles.input}>
          <Input
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="New password"
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
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          success
          style={styles.button}
          onPress={handleChangePassword}>
          <Text style={styles.textStyle}>Change password</Text>
        </Button>
        <Button
          full
          rounded
          danger
          style={styles.button}
          onPress={handleResendCode}>
          <Text style={styles.textStyle}>Resend confirm code</Text>
        </Button>
      </>
    );
  };

  const renderSendCode = () => {
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
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          primary
          style={styles.button}
          onPress={handleForgotPassword}>
          <Text style={styles.textStyle}>Reset password</Text>
        </Button>
      </>
    );
  };

  return (
    <>
      <Form style={styles.form}>
        <Text style={styles.headerText}>Reset password</Text>
        {isConfirmCode ? renderPasswordInputs() : renderSendCode()}
        <Button
          full
          rounded
          danger
          style={styles.button}
          onPress={() => props.setModal('auth')}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Button>
      </Form>
    </>
  );
};

export default ModalResetPassword;
