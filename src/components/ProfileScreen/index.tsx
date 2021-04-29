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

import styles from './style';
import {View} from 'react-native';

import Avatar from './avatar';
import {observer} from 'mobx-react-lite';
import {getCurrentUser, reloadCurrentUser} from '../../util/auth';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {userStore, modalStore} = useStores();
  const {user, changeUser, setUser} = userStore;
  const {setModal} = modalStore;

  const [displayName, setDisplayName] = useState(user && user.displayName);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (user && !user.emailVerified) {
        reloadCurrentUser().then(() => {
          const reloadedUser = getCurrentUser();
          if (reloadedUser && !reloadedUser.emailVerified) {
            setModal({
              type: 'confirmEmail',
            });
            navigation.navigate('HomeScreen');
          } else {
            setUser(reloadedUser);
          }
        });
      }
    });
  }, [navigation, setModal, setUser, user]);

  useEffect(() => {
    if (user && user.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleCancelChangeUser = () => {
    user && setDisplayName(user.displayName);
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
    return (
      user &&
      user.updatePassword(newPassword).catch((error: any) => {
        console.log('updatePassword error', error);
      })
    );
  };

  const isPasswordProvider = () => {
    return (
      user &&
      user.providerData.some(
        (item: {providerId: string}) => item.providerId === 'password',
      )
    );
  };

  return (
    <Container style={styles.container}>
      {user && user.emailVerified ? (
        <Content>
          <Text style={styles.heading}>Profile</Text>
          <Avatar user={user} changeUser={changeUser} />
          <Form style={styles.form}>
            <Item style={styles.input} floatingLabel>
              <Label>Username</Label>
              <Input
                textContentType="username"
                value={displayName || ''}
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
            {isPasswordProvider() && (
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
};

export default observer(ProfileScreen);
