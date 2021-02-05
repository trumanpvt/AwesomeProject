import React, {useEffect, useState} from 'react';

import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';

import styles from './style.js';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';

import Avatar from './avatar';
import {observer} from 'mobx-react-lite';
import {useDataStore} from '../../store/context';

const ProfileScreen = observer((props) => {
  const userStore = useDataStore().userStore;
  const {user, setUser} = userStore;

  const isPasswordProvider =
    user.providerData &&
    user.providerData.some((item) => item.providerId === 'password');

  const [displayName, setDisplayName] = useState(user.displayName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setDisplayName(user.displayName);
    setPhotoURL(user.photoURL);
  }, [user]);

  const handleCancelDataChange = () => {
    setDisplayName(user.displayName);
    setPhotoURL(user.photoURL);
  };

  const handleDataChange = (dataType, data) => {
    user
      .updateProfile({
        [dataType]: data,
      })
      .then((res) => {
        console.log('updateProfile success', res);
        setUser(auth().currentUser);
      })
      .catch((error) => {
        console.log('updateProfile error', error);
      });
  };

  const handleCancelPasswordChange = () => {
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePasswordChange = () => {
    user
      .updatePassword(newPassword)
      .then(() => {
        // User re-authenticated.
      })
      .catch((error) => {
        console.log('updatePassword error', error);
      });
  };

  // const formatPhone = (value) => {
  //   setPhoneNumber(value);
  // };
  //
  // const isPasswordProvider = () => {
  //   return user.providerData.some((item) => item.providerId === 'password');
  // };

  return (
    <Container style={styles.container}>
      <Content>
        <Text style={styles.heading}>Profile</Text>
        <Avatar
          user={user}
          photoURL={user.photoURL}
          handleDataChange={handleDataChange}
        />
        <Form style={styles.form}>
          <Item style={styles.input} floatingLabel>
            <Label>Username</Label>
            <Input
              textContentType="username"
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Username"
            />
          </Item>
          {/*<Item style={styles.input} floatingLabel>*/}
          {/*  <Label>Phone</Label>*/}
          {/*  <Input*/}
          {/*    textContentType="telephoneNumber"*/}
          {/*    value={phoneNumber}*/}
          {/*    onChangeText={formatPhone}*/}
          {/*    placeholder="Phone"*/}
          {/*    keyboardType="phone-pad"*/}
          {/*  />*/}
          {/*</Item>*/}
          <View style={styles.buttons}>
            <Button
              full
              rounded
              primary
              style={styles.button}
              onPress={handleDataChange}>
              <Text>Save</Text>
            </Button>
            <Button
              full
              rounded
              danger
              style={styles.button}
              onPress={handleCancelDataChange}>
              <Text>Cancel</Text>
            </Button>
          </View>
          <Text style={styles.heading}>
            {isPasswordProvider ? 'Change password' : 'Create password'}
          </Text>
          {isPasswordProvider && (
            <Item style={styles.input} floatingLabel>
              <Label>Old password</Label>
              <Input
                textContentType="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="Old password"
              />
            </Item>
          )}
          <Item style={styles.input} floatingLabel>
            <Label>New password</Label>
            <Input
              textContentType="password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New password"
            />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label>Confirm password</Label>
            <Input
              textContentType="password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
            />
          </Item>
          <View style={styles.buttons}>
            <Button
              full
              rounded
              primary
              style={styles.button}
              onPress={handlePasswordChange}>
              <Text>Save</Text>
            </Button>
            <Button
              full
              rounded
              danger
              style={styles.button}
              onPress={handleCancelPasswordChange}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
});

ProfileScreen.propTypes = {};
export default ProfileScreen;
