import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, Thumbnail} from 'native-base';
import ModalAuth from '../Modal/auth';
import styles from './style.js';
import auth from '@react-native-firebase/auth';
import {useDataStore} from '../../store/context';
import {observer} from 'mobx-react-lite';

import {signOut} from '../../util/auth';

const User = observer((props) => {
  const [showModal, setShowModal] = useState(false);

  const userStore = useDataStore().userStore;
  const {user, setUser} = userStore;

  const handleSignOut = () => {
    signOut()
      .then(() => {
        props.navigation.navigate('HomeScreen');
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderUser = () => {
    const userName = user.displayName ? user.displayName : user.email;

    return (
      <View style={styles.userInfo}>
        <Button
          transparent
          onPress={() => props.navigation.navigate('ProfileScreen')}>
          <Thumbnail small source={{uri: user.photoURL}} />
          <Text style={styles.userName}>{userName}</Text>
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.userContent}>
      {!Object.keys(user).length ? (
        <Button onPress={() => setShowModal(!showModal)}>
          <Text style={styles.buttonText}>Login/Register</Text>
        </Button>
      ) : (
        <>
          {renderUser()}
          <Button onPress={handleSignOut} danger>
            <Text style={styles.buttonText}>SignOut</Text>
          </Button>
        </>
      )}
      {showModal && (
        <ModalAuth navigation={props.navigation} setShowModal={setShowModal} />
      )}
    </View>
  );
});

export default User;
