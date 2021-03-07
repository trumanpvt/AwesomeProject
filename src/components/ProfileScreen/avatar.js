import React from 'react';
import storage from '@react-native-firebase/storage';

import {Badge, Text, Thumbnail} from 'native-base';

import styles from './style.js';
import {Platform, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const maxWidth = 80;
const maxHeight = 80;

const Avatar = ({user, changeUser}) => {
  const handleChangePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth,
        maxHeight,
      },
      uploadPhoto,
    );
  };

  const uploadPhoto = (response) => {
    console.log('uploadPhoto response', response);
    const uri = response.uri;
    const imagePath = user.uid + '/profile/userpic';
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    storage()
      .ref(imagePath)
      .putFile(uploadUri)
      .then((snapshot) => {
        savePhotoUrl(imagePath);
      })
      .catch((e) => console.log('uploading image error => ', e));
  };

  const savePhotoUrl = (imagePath) => {
    storage()
      .ref('/' + imagePath)
      .getDownloadURL()
      .then((url) => {
        changeUser({photoURL: url});
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
  };

  const renderEmptyAvatar = () => {
    const userName = user.displayName || user.email;

    return (
      <View style={styles.imageEmpty}>
        <Text style={styles.imageEmptyText}>{userName[0].toUpperCase()}</Text>
      </View>
    );
  };

  const renderThumbnail = () => {
    return <Thumbnail large source={{uri: user.photoURL}} />;
  };

  return (
    <TouchableOpacity
      transparent
      style={styles.imageContainer}
      onPress={handleChangePhoto}>
      {user.photoURL ? renderThumbnail() : renderEmptyAvatar()}
      <Badge success style={styles.imageChange}>
        <Text style={styles.imageChangePlus}>+</Text>
      </Badge>
    </TouchableOpacity>
  );
};

Avatar.propTypes = {};
export default Avatar;
