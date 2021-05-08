import React, {useState} from 'react';

import {Platform, Text, View} from 'react-native';
import {Icon, Input, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import moment from 'moment';

import styleSheet from './style';
import {PostModalProps} from './index';
import Camera from '../../Camera';
import {useActionSheet} from '@expo/react-native-action-sheet';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {useStores} from '../../../store';
import ButtonCustom from '../../Button';

interface PostUploadMediaProps {
  postId: string;
  setUploadedMedia: (uri: string, isVideo?: boolean) => void;
}

const PostUploadMedia = ({postId, setUploadedMedia}: PostUploadMediaProps) => {
  const {user} = useStores().userStore;

  // const [uploading, setUploading] = useState(false);
  const [isOpenCamera, setIsOpenCamera] = useState(false);

  const {t} = useTranslation();

  const {theme} = useTheme();

  const {showActionSheetWithOptions} = useActionSheet();

  const styles = styleSheet();

  const selectMediaSource = () => {
    console.log('show actionsheet');
    return showActionSheetWithOptions(
      {
        options: ['Select from gallery', 'Take photo/video', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Choose image/video source',
        containerStyle: {zIndex: 100500},
      },
      buttonIndex => {
        if (buttonIndex !== 2) {
          handleUploadMedia(!!buttonIndex);
        }
      },
    );
  };

  const handleUploadMedia = (isCamera: boolean) => {
    const options = {
      // width: 80,
      // height: 80,
      cropping: true,
    };

    if (isCamera) {
      return setIsOpenCamera(true);
    }

    return ImagePicker.openPicker(options)
      .then((media: {path: string}) => {
        return uploadMedia(media.path);
      })
      .catch();
  };

  const handleSetMedia = (uri: string, isVideo?: boolean) => {
    if (isVideo) {
      return uploadMedia(uri);
    } else {
      ImagePicker.openCropper({
        mediaType: 'photo',
        path: uri,
        // width: 80,
        // height: 80,
      }).then((image: Image) => {
        setIsOpenCamera(false);
        return uploadMedia(image.path);
      });
    }
  };

  const uploadMedia = (path: string, isVideo?: boolean) => {
    if (!user) {
      return null;
    }

    // setUploading(true);

    const mediaType = isVideo ? 'video' : 'image';

    const mediaPath = `${user.uid}/posts/${postId}/${mediaType}`;
    const uploadUri =
      Platform.OS === 'ios' ? path.replace('file://', '') : path;

    return storage()
      .ref(mediaPath)
      .putFile(uploadUri)
      .then(() => {
        return saveMediaUrl(mediaPath);
      });
  };

  const saveMediaUrl = (imagePath: string, isVideo?: boolean) => {
    return storage()
      .ref('/' + imagePath)
      .getDownloadURL()
      .then((url: any) => {
        // changeUser({photoURL: url});
        // setUploading(false);
        return setUploadedMedia(url, isVideo);
      });
  };

  return (
    <View style={styles.container}>
      <ButtonCustom onPress={selectMediaSource} title="CAMERA" />
      {isOpenCamera && (
        <Camera
          setMedia={handleSetMedia}
          enableVideo
          closeCamera={() => setIsOpenCamera(false)}
        />
      )}
    </View>
  );
};

export default PostUploadMedia;
