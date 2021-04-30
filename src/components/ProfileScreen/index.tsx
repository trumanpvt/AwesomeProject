import React, {useEffect, useState} from 'react';

import {useStores} from '../../store';

import {View, Text} from 'react-native';

import ProfileAvatar from './avatar';
import {observer} from 'mobx-react-lite';
import {getCurrentUser, reloadCurrentUser} from '../../util/auth';

import {useNavigation} from '@react-navigation/native';

import {Button, Input, useTheme} from 'react-native-elements';

import styleSheet from './style';
import ButtonCustom from '../Button';

const ProfileScreen = () => {
  const {userStore, modalStore} = useStores();
  const {user, changeUser, setUser} = userStore;
  const {setModal} = modalStore;

  const [displayName, setDisplayName] = useState(
    (user && user.displayName) || '',
  );
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const {theme} = useTheme();

  const styles = styleSheet(theme.colors);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (user && !user.emailVerified) {
        reloadCurrentUser()?.then(() => {
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
    return user && setDisplayName(user.displayName || '');
  };

  const handleChangeUser = () => {
    return changeUser({
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

  return user && user.emailVerified ? (
    <View style={styles.container}>
      <>
        <Text style={styles.heading}>Profile</Text>
        <ProfileAvatar user={user} changeUser={changeUser} />
        <View style={styles.form}>
          <Input
            placeholder="Username"
            value={displayName}
            onChangeText={setDisplayName}
            leftIcon={{type: 'material', name: 'email'}}
          />
          <View style={styles.buttons}>
            <ButtonCustom
              onPress={handleChangeUser}
              buttonStyle={styles.button}
              title="Save"
            />
            <ButtonCustom
              color="error"
              onPress={handleCancelChangeUser}
              buttonStyle={{...styles.button, ...styles.buttonCancel}}
              title="Cancel"
            />
          </View>
          <Text style={styles.heading}>
            {isPasswordProvider() ? 'Change password' : 'Create password'}
          </Text>
          {isPasswordProvider() && (
            <Input
              placeholder="Old password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              leftIcon={{type: 'material', name: 'lock'}}
            />
          )}
          <Input
            placeholder="New password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            leftIcon={{type: 'material', name: 'lock'}}
          />
          <Input
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon={{type: 'material', name: 'lock'}}
          />
          <View style={styles.buttons}>
            <ButtonCustom
              onPress={handlePasswordChange}
              buttonStyle={{...styles.button, ...styles.buttonSave}}
              title="Save"
            />
            <ButtonCustom
              color="error"
              onPress={handleCancelPasswordChange}
              buttonStyle={{...styles.button, ...styles.buttonCancel}}
              title="Cancel"
            />
          </View>
        </View>
      </>
    </View>
  ) : null;
};

export default observer(ProfileScreen);
