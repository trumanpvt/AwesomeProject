import React, {useState, useEffect} from 'react';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
  Badge,
  Thumbnail,
  Icon,
} from 'native-base';

import styles from './style.js';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../actions';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Avatar = (props) => {
  // const [displayName, setDisplayName] = useState(user.displayName);
  const [photoURL, setPhotoURL] = useState(props.user.photoURL);
  // const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [email, setEmail] = useState(user.email);

  // useEffect(() => {
  //   setDisplayName(user.displayName);
  //   setPhotoURL(user.photoURL);
  // }, [user]);

  // const dispatch = useDispatch();
  // const setUserData = (userData) => dispatch(setUser(userData));

  const handleChangePhoto = () => {
    console.log('handleChangePhoto');
    launchImageLibrary();
  };

  return (
    <TouchableOpacity
      transparent
      style={styles.imageContainer}
      onPress={handleChangePhoto}>
      <Thumbnail large source={{uri: photoURL}} />
      <Badge success style={styles.imageChange}>
        <Text style={styles.imageChangePlus}>+</Text>
        {/*<Icon style={styles.imageChange} name="plus" type="FontAwesome" />*/}
      </Badge>
    </TouchableOpacity>
  );
};

Avatar.propTypes = {};
export default Avatar;
