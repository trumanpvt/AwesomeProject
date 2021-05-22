import React, {useEffect, useState} from 'react';

import {useStores} from '../../store';

import {Text, View} from 'react-native';

import ProfileAvatar from './avatar';
import {observer} from 'mobx-react-lite';
import {getCurrentUser, reloadCurrentUser} from '../../util/auth';

import {useNavigation} from '@react-navigation/native';

import {Input} from 'react-native-elements';

import styleSheet from './style';
import ButtonCustom from '../Button';
import {useTranslation} from 'react-i18next';

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

  const {t} = useTranslation();

  const styles = styleSheet();

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
        <ProfileAvatar user={user} changeUser={changeUser} />
        <View style={styles.form}>
          <Input
            autoCapitalize="none"
            placeholder={t('profile.placeholder.username')}
            value={displayName}
            onChangeText={setDisplayName}
            leftIcon={{type: 'material', name: 'person'}}
          />
          <View style={styles.buttons}>
            <ButtonCustom
              rounded
              onPress={handleChangeUser}
              containerStyle={styles.button}
              title={t('misc.save')}
            />
            <ButtonCustom
              rounded
              color="error"
              onPress={handleCancelChangeUser}
              containerStyle={styles.button}
              title={t('misc.cancel')}
            />
          </View>
          <Text style={styles.heading}>
            {isPasswordProvider()
              ? t('profile.changePassword')
              : t('profile.createPassword')}
          </Text>
          {isPasswordProvider() && (
            <Input
              autoCapitalize="none"
              textContentType="password"
              placeholder={t('profile.placeholder.passwordOld')}
              value={password}
              onChangeText={setPassword}
              leftIcon={{type: 'material', name: 'lock'}}
            />
          )}
          <Input
            autoCapitalize="none"
            textContentType="password"
            placeholder={t('profile.placeholder.passwordNew')}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            leftIcon={{type: 'material', name: 'lock'}}
          />
          <Input
            autoCapitalize="none"
            textContentType="password"
            placeholder={t('profile.placeholder.passwordConfirm')}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon={{type: 'material', name: 'lock'}}
          />
          <View style={styles.buttons}>
            <ButtonCustom
              rounded
              onPress={handlePasswordChange}
              containerStyle={styles.button}
              title={t('misc.save')}
            />
            <ButtonCustom
              rounded
              color="error"
              onPress={handleCancelPasswordChange}
              containerStyle={styles.button}
              title={t('misc.cancel')}
            />
          </View>
        </View>
      </>
    </View>
  ) : null;
};

export default observer(ProfileScreen);
