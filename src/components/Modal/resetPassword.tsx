import React, {useState} from 'react';
import {Button, Form, Input, Item, Text} from 'native-base';
import styles from './style.js';
import {sendPasswordResetEmail} from '../../util/auth';

const ModalResetPassword = (props) => {
  const [email, setEmail] = useState(props.email || '');
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSendPasswordResetEmail = () => {
    sendPasswordResetEmail(email)
      .then(() => {
        setIsLinkSent(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const renderLinkSent = () => {
    return (
      <>
        <Text style={styles.error}>
          Password reset link was sent to your email
        </Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          Warning
          style={styles.button}
          onPress={handleSendPasswordResetEmail}>
          <Text style={styles.textStyle}>Send link again</Text>
        </Button>
      </>
    );
  };

  const renderEmail = () => {
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
          Warning
          style={styles.button}
          onPress={handleSendPasswordResetEmail}>
          <Text style={styles.textStyle}>Reset password</Text>
        </Button>
      </>
    );
  };

  return (
    <Form style={styles.form}>
      <Text style={styles.headerText}>Reset password</Text>
      {isLinkSent ? renderLinkSent() : renderEmail()}
      <Button
        full
        rounded
        danger
        style={styles.button}
        onPress={() => props.setModal({type: 'auth'})}>
        <Text style={styles.textStyle}>{isLinkSent ? 'Close' : 'Cancel'}</Text>
      </Button>
    </Form>
  );
};

export default ModalResetPassword;
