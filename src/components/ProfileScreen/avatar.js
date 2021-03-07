import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';

import {ActionSheet, Badge, Spinner, Text, Thumbnail} from 'native-base';

import styles from './style.js';
import {Platform, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Camera from '../Camera';

const Avatar = ({user, changeUser}) => {
  const [uploading, setUploading] = useState(false);
  const [isOpenCamera, setIsOpenCamera] = useState(false);

  useEffect(() => {
    setUploading(false);
  }, [user.photoURL]);

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
      width: 80,
      height: 80,
      cropping: true,
    };

    if (isPhoto) {
      setIsOpenCamera(true);
      return null;
    }

    return ImagePicker.openPicker(options)
      .then((image) => {
        return uploadPhoto(image.path);
      })
      .catch((e) => {
        console.log('ImagePicker.openCamera error', e);
      });
  };

  const handleTakePhoto = (uri) => {
    ImagePicker.openCropper({
      path: uri,
      width: 80,
      height: 80,
    })
      .then((image) => {
        setIsOpenCamera(false);
        return uploadPhoto(image.path);
      })
      .catch((e) => {
        console.log('ImagePicker.openPicker error', e);
      });
  };

  const uploadPhoto = (path) => {
    setUploading(true);
    const imagePath = user.uid + '/profile/userpic';
    const uploadUri =
      Platform.OS === 'ios' ? path.replace('file://', '') : path;

    return storage()
      .ref(imagePath)
      .putFile(uploadUri)
      .then(() => {
        return savePhotoUrl(imagePath);
      })
      .catch((e) => console.log('uploading image error => ', e));
  };

  const savePhotoUrl = (imagePath) => {
    return storage()
      .ref('/' + imagePath)
      .getDownloadURL()
      .then((url) => {
        changeUser({photoURL: url});
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
      {isOpenCamera && (
        <Camera
          takePhoto={handleTakePhoto}
          closeCamera={() => setIsOpenCamera(false)}
        />
      )}
    </TouchableOpacity>
  );
};

Avatar.propTypes = {};
export default Avatar;
