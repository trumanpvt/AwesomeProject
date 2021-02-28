import React from 'react';
import storage from '@react-native-firebase/storage';

import {Badge, Text, Thumbnail} from 'native-base';

import styles from './style.js';
import {Platform, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const newWidth = 80;
const newHeight = 80;
const compressFormat = 'PNG';
const quality = 100;
const rotation = 0;
const outputPath = null;

const Avatar = ({user, changeUser}) => {
  const handleChangePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      resizePhoto,
    );
  };

  const resizePhoto = (data) => {
    console.log('uploadPhoto response', data);
    if (!data.uri) {
      return null;
    }
    ImageResizer.createResizedImage(
      data.uri,
      newWidth,
      newHeight,
      compressFormat,
      quality,
      rotation,
      outputPath,
    )
      .then((response) => {
        let uri = response.uri;
        let imagePath = user.uid + '/profile/userpic';
        let uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        uploadPhoto(imagePath, uploadUri);
      })
      .catch((err) => {
        console.log('image resizing error => ', err);
      });
  };

  const uploadPhoto = (imagePath, uploadUri) => {
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
