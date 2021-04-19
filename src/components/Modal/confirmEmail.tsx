import React from 'react';
import {Button, Form, Text} from 'native-base';
import styles from './style.js';
import {sendEmailVerification} from '../../util/auth';

export interface Props {
  setCloseModal: () => void;
}

const ModalConfirmEmail = ({setCloseModal}: Props) => {
  return (
    <Form style={styles.form}>
      <Text style={styles.headerText}>
        Please confirm your email, confirmation link was sent to you
      </Text>
      <Button
        full
        rounded
        style={styles.button}
        onPress={sendEmailVerification}>
        <Text style={styles.textStyle}>Send verification again</Text>
      </Button>
      <Button full rounded danger style={styles.button} onPress={setCloseModal}>
        <Text style={styles.textStyle}>Close</Text>
      </Button>
    </Form>
  );
};

export default ModalConfirmEmail;
