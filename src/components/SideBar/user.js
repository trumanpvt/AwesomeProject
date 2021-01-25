import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, Thumbnail, Badge} from 'native-base';
import ModalAuth from '../Modal/auth';
import styles from './style.js';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../actions';
import {isEmpty} from 'lodash';

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
    return (
      <View style={styles.userInfo}>
        {user.photoURL ? (
          <Thumbnail small source={{uri: user.photoURL}} />
        ) : (
          <Badge style={styles.userPic} primary>
            <Text>{(user.displayName && user.displayName[0]) || 'T'}</Text>
          </Badge>
        )}
        <Text style={styles.userName}>{user.displayName || 'Test User'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.userContent}>
      {isEmpty(user) ? (
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
        <ModalAuth
          navigation={props.navigation}
          // showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </View>
  );
};

export default User;
