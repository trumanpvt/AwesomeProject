import React from 'react';
import {View} from 'react-native';
import {Badge, Button, Text, Thumbnail} from 'native-base';
import styles from './style.js';
import {observer} from 'mobx-react-lite';

import {signOut} from '../../util/auth';
import {useStores} from '../../store';

const User = observer(({navigation}) => {
  const {modalStore, userStore} = useStores();
  const {setModal} = modalStore;

  const {user} = userStore;

  const handleSignOut = () => {
    signOut()
      .then(() => {
        navigation.navigate('HomeScreen');
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
