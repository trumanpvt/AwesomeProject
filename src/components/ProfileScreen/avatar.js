import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';

import {Badge, Text, Thumbnail, Spinner, ActionSheet} from 'native-base';

import styles from './style.js';
import {Platform, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const Avatar = ({user, changeUser}) => {
  const [uploading, setUploading] = useState(false);

  const selectPhotoSource = () => {
    ActionSheet.show(
      {
        options: ['Select from gallery', 'Take photo', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Choose image source',
      },
      (buttonIndex) => {
        if (buttonIndex === 2) {
          return null;
        }
        return handleChangeAvatar(!!buttonIndex);
      },
    );
  };

  const handleChangeAvatar = (isPhoto) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 80,
      maxHeight: 80,
    };

    if (isPhoto) {
      return launchCamera(options, uploadPhoto);
    }

    return launchImageLibrary(options, uploadPhoto);
  };

  const uploadPhoto = (response) => {
    if (response.didCancel) {
      return null;
    }

    setUploading(true);
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
        setUploading(false);
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
  };

  const renderEmptyAvatar = () => {
    if (uploading) {
      return <Spinner />;
    }

    const userName = user.displayName || user.email;

    return (
      <View style={styles.imageEmpty}>
        <Text style={styles.imageEmptyText}>{userName[0].toUpperCase()}</Text>
      </View>
    );
  };

  const renderAvatarBody = () => {
    if (uploading) {
      return <Spinner />;
    }

    if (user.photoURL) {
      return <Thumbnail large source={{uri: user.photoURL}} />;
    }

    return renderEmptyAvatar();
  };

  return (
    <TouchableOpacity
      transparent
      style={styles.imageContainer}
      onPress={selectPhotoSource}>
      {renderAvatarBody()}
      <Badge success style={styles.imageChange}>
        <Text style={styles.imageChangePlus}>+</Text>
      </Badge>
    </TouchableOpacity>
  );
};

Avatar.propTypes = {};
export default Avatar;
