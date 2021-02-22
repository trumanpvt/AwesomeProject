import React, {useState} from 'react';
import {Button, Form, Input, Item, Text} from 'native-base';
import styles from './style.js';
import {createNewPassword} from '../../util/auth';
import {useStores} from '../../store';

const ModalCreatePassword = (props) => {
  const userStore = useStores().userStore;
  const {user} = userStore;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleCreateNewPassword = () => {
    if (password === confirmPassword) {
      createNewPassword(password)
        .then(() => {
          props.setCloseModal();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError('Confirm Password');
    }
  };

  return (
    <>
      <Form style={styles.form}>
        <Text style={styles.headerText}>
          You can set your password to login with email/password
        </Text>
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
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          full
          rounded
          success
          style={styles.button}
          onPress={handleCreateNewPassword}>
          <Text style={styles.textStyle}>Set password</Text>
        </Button>
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
