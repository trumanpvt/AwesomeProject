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

import {useStores} from '../../store';

import styles from './style.js';
import {View} from 'react-native';

import Avatar from './avatar';
import {observer} from 'mobx-react-lite';
import {getCurrentUser} from '../../util/auth';

const ProfileScreen = observer(({navigation}) => {
  const {userStore, modalStore} = useStores();
  const {user, changeUser, setUser} = userStore;
  const {setModal} = modalStore;

  const [displayName, setDisplayName] = useState(user ? user.displayName : '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    return navigation.addListener('focus', () => {
      console.log('user checking', user);
      if (user && !user.emailVerified) {
        // const reloadedUser = getCurrentUser();
        // reloadedUser.reload().then(() => {
        //   console.log('reloaded user', reloadedUser);
        //   if (!reloadedUser.emailVerified) {
        //     setModal({
        //       type: 'confirmEmail',
        //     });
        //     navigation.navigate('HomeScreen');
        //   } else {
        //     setUser(reloadedUser);
        //   }
        // });
        handleReloadUser();
      }
    });
  }, [handleReloadUser, navigation, setModal, setUser, user]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleReloadUser = () => {
    const reloadedUser = getCurrentUser();
    reloadedUser.reload().then(() => {
      console.log('reloaded user', reloadedUser);
      if (!reloadedUser.emailVerified) {
        return handleReloadUser();
      } else {
        setUser(reloadedUser);
      }
    });
  };

  const handleCancelChangeUser = () => {
    setDisplayName(user.displayName);
  };

  const handleChangeUser = () => {
    changeUser({
      displayName,
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

  const isPasswordProvider = () => {
    return user.providerData.some((item) => item.providerId === 'password');
  };

  return (
    <Container style={styles.container}>
      {user && user.emailVerified ? (
        <Content>
          <Text style={styles.heading}>Profile</Text>
          <Avatar
            user={user}
            photoURL={user.photoURL}
            changeUser={changeUser}
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
                onPress={handleChangeUser}>
                <Text>Save</Text>
              </Button>
              <Button
                full
                rounded
                danger
                style={styles.button}
                onPress={handleCancelChangeUser}>
                <Text>Cancel</Text>
              </Button>
            </View>
            <Text style={styles.heading}>
              {isPasswordProvider() ? 'Change password' : 'Create password'}
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
      ) : null}
    </Container>
  );
});

export default ProfileScreen;
