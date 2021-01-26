import React, {useState} from 'react';
import {View} from 'react-native';
import {Badge, Button, Text, Thumbnail} from 'native-base';
import ModalAuth from '../Modal/auth';
import styles from './style.js';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../actions';

const User = (props) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setUser({}));
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
          {user.photoURL ? (
            <Thumbnail small source={{uri: user.photoURL}} />
          ) : (
            <Badge style={styles.userPic} primary>
              <Text>{userName[0].toUpperCase()}</Text>
            </Badge>
          )}
          <Text style={styles.userName}>{userName}</Text>
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.userContent}>
      {!user ? (
        <Button onPress={() => setShowModal(!showModal)}>
          <Text>Login/Register</Text>
        </Button>
      ) : (
        <>
          {renderUser()}
          <Button onPress={signOut} danger>
            <Text>SignOut</Text>
          </Button>
        </>
      )}
      {showModal && (
        <ModalAuth navigation={props.navigation} setShowModal={setShowModal} />
      )}
    </View>
  );
};

export default User;
