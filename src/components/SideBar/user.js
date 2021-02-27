import React from 'react';
import {View} from 'react-native';
import {Button, Text, Thumbnail, Badge} from 'native-base';
import styles from './style.js';
import {observer} from 'mobx-react-lite';

import {signOut, reloadUser} from '../../util/auth';
import {useStores} from '../../store';

const User = observer((props) => {
  const {modalStore, userStore} = useStores();
  const {setModal} = modalStore;

  const {user, setUser} = userStore;

  if (user && !user.emailVerified) {
    console.log('not verified');
    // setUser(reloadUser());
  }

  const handleSignOut = () => {
    signOut()
      .then(() => {
        props.navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderUser = () => {
    const {displayName, email, photoURL} = user;

    const userName = displayName || email;

    return (
      <View style={styles.userInfo}>
        <Button
          transparent
          onPress={() => props.navigation.navigate('ProfileScreen')}>
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
      <Button style={{marginTop: 20}} onPress={showStores}>
        <Text style={styles.buttonText}>Show stores</Text>
      </Button>
    </View>
  );
});

export default User;
