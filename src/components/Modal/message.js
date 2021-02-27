import React from 'react';
import {Button, Form, Text} from 'native-base';
import styles from './style.js';

const ModalMessage = (props) => {
  return (
    <Form style={styles.form}>
      <Text style={styles.headerText}>{props.message}</Text>
      <Button
        full
        rounded
        danger
        style={styles.button}
        onPress={props.setCloseModal}>
        <Text style={styles.textStyle}>OK</Text>
      </Button>
    </Form>
  );
};

export default ModalMessage;
