import React, {useState} from 'react';

import {Platform, View} from 'react-native';
import {useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import styleSheet from './style';
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
  const [camera, setCamera] = useState<{open: boolean; isVideo?: boolean}>({
    open: false,
    isVideo: false,
  });

  const {t} = useTranslation();

  const {theme} = useTheme();

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
          handleUploadMedia(!!buttonIndex);
        }
      },
    );
  };

  const selectVideoSource = () => {
    return showActionSheetWithOptions(
      {
        options: ['Select from gallery', 'Take video', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Choose video source',
      },
      buttonIndex => {
        if (buttonIndex !== 2) {
          handleUploadMedia(!!buttonIndex, true);
        }
      },
    );
  };

  const handleUploadMedia = (isCamera: boolean, isVideo: boolean = false) => {
    const options = {
      cropping: true,
    };

    if (isCamera) {
      return setCamera({open: true, isVideo});
    }

    return ImagePicker.openPicker(options)
      .then((media: {path: string}) => {
        return uploadMedia(media.path, isVideo);
      })
      .catch();
  };

  const handleSetMedia = (uri: string, isVideo: boolean = false) => {
    if (isVideo) {
      return uploadMedia(uri, isVideo);
    } else {
      ImagePicker.openCropper({
        mediaType: 'photo',
        path: uri,
        // width: 80,
        // height: 80,
      }).then((image: Image) => {
        setCamera({open: false});
        return uploadMedia(image.path);
      });
    }
  };

  const uploadMedia = (path: string, isVideo: boolean = false) => {
    if (!user) {
      return null;
    }

    const mediaType = isVideo ? 'video' : 'image';

    const mediaPath = `${user.uid}/posts/${postId}/media/${mediaType}`;
    const uploadUri =
      Platform.OS === 'ios' ? path.replace('file://', '') : path;

    return storage()
      .ref(mediaPath)
      .putFile(uploadUri)
      .then(() => {
        return saveMediaUrl(mediaPath, isVideo);
      });
  };

  const saveMediaUrl = (imagePath: string, isVideo: boolean = false) => {
    return storage()
      .ref('/' + imagePath)
      .getDownloadURL()
      .then((url: any) => {
        setCamera({open: false});
        return setUploadedMedia(url, isVideo);
      });
  };

  return (
    <View style={styles.container}>
      <ButtonCustom onPress={selectPhotoSource} title="Upload image" />
      <ButtonCustom onPress={selectVideoSource} title="Upload video" />
      {camera.open && (
        <Camera
          setMedia={handleSetMedia}
          enableVideo={camera.isVideo}
          closeCamera={() => setCamera({open: false})}
        />
      )}
    </View>
  );
};

export default PostUploadMedia;
