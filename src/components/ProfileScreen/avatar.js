import React from 'react';
import {Badge, Text, Thumbnail} from 'native-base';

import styles from './style.js';
import {Platform, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const newWidth = 80;
const newHeight = 80;
const compressFormat = 'PNG';
const quality = 100;
const rotation = 0;
const outputPath = null;

const Avatar = (props) => {
  const handleChangePhoto = () => {
    console.log('handleChangePhoto');
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      resizePhoto,
    );
  };

  const resizePhoto = (data) => {
    console.log('uploadPhoto reponse', data);
    if (!data.uri) return null;
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
        let imagePath = props.user.uid + '/profile/userpic';
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
        props.handleDataChange('photoURL', url);
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
  };

  return (
    <TouchableOpacity
      transparent
      style={styles.imageContainer}
      onPress={handleChangePhoto}>
      <Thumbnail large source={{uri: props.photoURL}} />
      <Badge success style={styles.imageChange}>
        <Text style={styles.imageChangePlus}>+</Text>
      </Badge>
    </TouchableOpacity>
  );
};

Avatar.propTypes = {};
export default Avatar;
