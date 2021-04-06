import React from 'react';
import {Button, Form, Text} from 'native-base';
import styles from './style.js';
import {sendEmailVerification} from '../../util/auth';

const ModalConfirmEmail = (props) => {
  return (
    <Form style={styles.form}>
      <Text style={styles.headerText}>
        Please confirm your email, confirmation link was sent to you
      </Text>
      <Button
        full
        rounded
        Warning
        style={styles.button}
        onPress={sendEmailVerification}>
        <Text style={styles.textStyle}>Send verification again</Text>
      </Button>
      <Button
        full
        rounded
        danger
        style={styles.button}
        onPress={props.setCloseModal}>
        <Text style={styles.textStyle}>Close</Text>
      </Button>
    </Form>
  );
};

export default ModalConfirmEmail;
