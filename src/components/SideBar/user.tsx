import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, useTheme} from 'react-native-elements';

import {observer} from 'mobx-react-lite';

import {signOut} from '../../util/auth';
import {useStores} from '../../store';

import styles from './style.js';

interface Props {
  navigation: any;
}

const User = ({navigation}: Props) => {
  const {modalStore, userStore} = useStores();
  const {setModal} = modalStore;

  const {user} = userStore;

  const {theme} = useTheme();

  const handleSignOut = () => {
    signOut().then(() => {
      navigation.navigate('HomeScreen');
    });
  };

  const renderUser = () => {
    const {displayName, email, photoURL} = user || {};

    const userName = displayName || email || '';

    return (
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => navigation.navigate('ProfileScreen')}>
        <Avatar
          rounded
          size="small"
          source={
            photoURL
              ? {
                  uri: photoURL,
                }
              : undefined
          }
          title={userName[0].toUpperCase()}
          overlayContainerStyle={{backgroundColor: theme.colors?.error}}
          titleStyle={styles.placeholder}
        />
        <Text style={styles.userName}>{userName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.userContent}>
      {!user ? (
        <Button
          onPress={() => setModal({type: 'auth'})}
          title="SignIn/SignUp"
          containerStyle={styles.signBtn}
          buttonStyle={{backgroundColor: theme.colors?.primary}}
          titleStyle={styles.buttonText}
        />
      ) : (
        <>
          {renderUser()}
          <Button
            onPress={handleSignOut}
            title="SignOut"
            containerStyle={styles.signBtn}
            buttonStyle={{backgroundColor: theme.colors?.error}}
            titleStyle={styles.buttonText}
          />
        </>
      )}
    </View>
  );
};

export default observer(User);
