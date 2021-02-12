import React, {useState} from 'react';
import {Button, Input, Item, Text} from 'native-base';

import {linkPasswordAccount} from '../../util/auth';

import styles from './style.js';
import {useStores} from '../../store';

const CreatePassword = (props) => {
  const {setUser} = useStores().userStore;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleCreatePassword = () => {
    if (password === confirmPassword) {
      linkPasswordAccount(password)
        .then((UserCredential) => {
          setError(null);
          setUser(UserCredential.user);
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
      <Text>You can create password to login with email and password</Text>
      <Item style={styles.input}>
        <Input
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
      </Item>
      <Item style={styles.input}>
        <Input
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
        disabled={!password || !confirmPassword}
        onPress={handleCreatePassword}>
        <Text style={styles.textStyle}>Create password</Text>
      </Button>
      <Button
        full
        rounded
        danger
        style={styles.button}
        onPress={props.setCloseModal}>
        <Text style={styles.textStyle}>Create later</Text>
      </Button>
    </>
  );
};

export default CreatePassword;
