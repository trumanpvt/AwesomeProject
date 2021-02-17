import React from 'react';
import {View} from 'react-native';
import {Button, Text, Thumbnail, Badge} from 'native-base';
import styles from './style.js';
import {observer} from 'mobx-react-lite';

import {signOut} from '../../util/auth';
import {useStores} from '../../store';

const User = observer((props) => {
  const {modalStore, userStore} = useStores();
  const {setModal} = modalStore;

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
    console.log('renderUser', user);
    const attributes = user.attributes;
    const userName = attributes.name || attributes.email;

    return (
      <View style={styles.userInfo}>
        <Button
          transparent
          onPress={() => props.navigation.navigate('ProfileScreen')}>
          {attributes.photoURL ? (
            <Thumbnail small source={{uri: attributes.photoURL}} />
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

  console.log('before render user', user);
  return (
    <View style={styles.userContent}>
      {!Object.keys(user).length ? (
        <Button onPress={() => setModal('auth')}>
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
      {/*{showModal && (*/}
      {/*  <ModalAuth navigation={props.navigation} setShowModal={setShowModal} />*/}
      {/*)}*/}
    </View>
  );
});

export default User;
