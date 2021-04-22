import React from 'react';
import {Button, Form, Text} from 'native-base';
import styles from './style.js';

interface Props {
  message: string | undefined;
  setCloseModal: () => void;
}

const ModalMessage = ({message = '', setCloseModal}: Props) => {
  return (
    <Form style={styles.form}>
      <Text style={styles.headerText}>{message}</Text>
      <Button full rounded danger style={styles.button} onPress={setCloseModal}>
        <Text style={styles.textStyle}>OK</Text>
      </Button>
    </Form>
  );
};

export default ModalMessage;
