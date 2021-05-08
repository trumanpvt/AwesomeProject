import React, {useMemo, useState} from 'react';
import storage from '@react-native-firebase/storage';

import styleSheet from './style';
import {ActivityIndicator, Platform, View} from 'react-native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import Camera from '../Camera';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Avatar} from 'react-native-elements';
import {useActionSheet} from '@expo/react-native-action-sheet';

interface Props {
  user: FirebaseAuthTypes.User;
  changeUser: ({}) => void;
}

const ProfileAvatar = ({user, changeUser}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [isOpenCamera, setIsOpenCamera] = useState(false);

  const {showActionSheetWithOptions} = useActionSheet();

  const styles = styleSheet();

  const selectPhotoSource = () => {
    return showActionSheetWithOptions(
      {
        options: ['Select from gallery', 'Take photo', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Choose image source',
      },
      buttonIndex => {
        if (buttonIndex !== 2) {
          handleChangeAvatar(!!buttonIndex);
        }
      },
    );
  };

  const handleChangeAvatar = (isPhoto: boolean) => {
    const options = {
      width: 80,
      height: 80,
      cropping: true,
    };

    if (isPhoto) {
      return setIsOpenCamera(true);
    }

    return ImagePicker.openPicker(options)
      .then((image: {path: string}) => {
        return uploadPhoto(image.path);
      })
      .catch();
  };

  const handleTakePhoto = (uri: string) => {
    ImagePicker.openCropper({
      mediaType: 'photo',
      path: uri,
      width: 80,
      height: 80,
    }).then((image: Image) => {
      setIsOpenCamera(false);
      return uploadPhoto(image.path);
    });
  };

  const uploadPhoto = (path: string) => {
    setUploading(true);
    const imagePath = user.uid + '/profile/userpic';
    const uploadUri =
      Platform.OS === 'ios' ? path.replace('file://', '') : path;

    return storage()
      .ref(imagePath)
      .putFile(uploadUri)
      .then(() => {
        return savePhotoUrl(imagePath);
      });
  };

  const savePhotoUrl = (imagePath: string) => {
    return storage()
      .ref('/' + imagePath)
      .getDownloadURL()
      .then((url: any) => {
        changeUser({photoURL: url});
        setUploading(false);
      });
  };

  const userName = useMemo(() => {
    return user.displayName || user.email || '';
  }, [user]);

  return (
    <View style={styles.avatarContainer}>
      {!uploading ? (
        <Avatar
          rounded
          size="large"
          onPress={selectPhotoSource}
          source={
            user.photoURL
              ? {
                  uri: user.photoURL,
                }
              : undefined
          }
          title={userName[0].toUpperCase()}
          overlayContainerStyle={styles.avatarOverlay}
          titleStyle={styles.avatarPlaceholder}>
          <Avatar.Accessory type="material" name="edit" size={26} />
        </Avatar>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {isOpenCamera && (
        <Camera
          setMedia={handleTakePhoto}
          closeCamera={() => setIsOpenCamera(false)}
        />
      )}
    </View>
  );
};

export default ProfileAvatar;
