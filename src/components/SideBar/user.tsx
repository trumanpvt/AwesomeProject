import React from 'react';

import {View, Text} from 'react-native';
import {Badge, Button, Thumbnail} from 'native-base';

import {observer} from 'mobx-react-lite';

import {signOut} from '../../util/auth';
import {useStores} from '../../store';

import styles from './style.js';

interface Props {
  navigation: any;
}

const User = observer(({navigation}: Props) => {
  const {modalStore, userStore, localeStore, newsStore} = useStores();
  const {setModal} = modalStore;

  const {user} = userStore;

  const handleSignOut = () => {
    signOut()
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const renderUser = () => {
    const {displayName, email, photoURL} = user || {};

    const userName = displayName || email || '';

    return (
      <View style={styles.userInfo}>
        <Button
          transparent
          onPress={() => navigation.navigate('ProfileScreen')}>
          {photoURL ? (
            <Thumbnail small source={{uri: photoURL}} />
          ) : (
            <Badge style={styles.userPic}>
              <Text>{userName[0].toUpperCase()}</Text>
            </Badge>
          )}
          <Text style={styles.userName}>{userName}</Text>
        </Button>
      </View>
    );
  };

  const showStores = () => {
    console.log('modalStore', modalStore);
    console.log('userStore', userStore);
    console.log('localeStore', localeStore);
    console.log('newsStore', newsStore);
  };

  return (
    <View style={styles.userContent}>
      {!user ? (
        <Button onPress={() => setModal({type: 'auth'})}>
          <Text style={styles.buttonText}>SignIn/SignUp</Text>
        </Button>
      ) : (
        <>
          {renderUser()}
          <Button onPress={handleSignOut} danger>
            <Text style={styles.buttonText}>SignOut</Text>
          </Button>
        </>
      )}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Button style={{marginTop: 20}} onPress={showStores}>
        <Text style={styles.buttonText}>Show stores</Text>
      </Button>
    </View>
  );
});

export default User;
