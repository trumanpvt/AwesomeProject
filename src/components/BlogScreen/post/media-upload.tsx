import React, {useState} from 'react';

import {ActivityIndicator, Platform, Text, View} from 'react-native';
import {Icon, Image, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import styleSheet from './style';
import Camera from '../../Camera';
import {useActionSheet} from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {useStores} from '../../../store';
import VideoPlayerCustom from '../../VideoPlayer';

interface PostUploadMediaProps {
  postId: string;
  videoUrl?: string;
  imageUrl?: string;
  setUploadedMedia: (uri: string, isVideo?: boolean) => void;
}

const PostUploadMedia = ({
  postId,
  videoUrl,
  imageUrl,
  setUploadedMedia,
}: PostUploadMediaProps) => {
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
      }).then(image => {
        setCamera({open: false});
        return uploadMedia(image.path);
      });
    }
  };

  const uploadMedia = (path: string, isVideo: boolean = false) => {
    if (!user) {
      return null;
    }

    const uploadUri =
      Platform.OS === 'ios' ? path.replace('file://', '') : path;

    setCamera({open: false});
    return setUploadedMedia(uploadUri, isVideo);
  };

  const renderImageBlock = () => {
    if (!imageUrl) {
      return (
        <View style={styles.postEditMediaContainer}>
          <Text style={styles.postEditMediaTitle}>Add image</Text>
          <Icon
            raised
            size={25}
            name="add-a-photo"
            color={theme.colors?.secondary}
            onPress={selectPhotoSource}
          />
        </View>
      );
    }

    return (
      <View style={styles.postEditMediaContainer}>
        <Text style={styles.postEditMediaTitle}>Change image</Text>
        <View style={styles.postEditMedia}>
          <View style={styles.postEditMediaWrap}>
            <Image
              resizeMode="contain"
              style={styles.postEditImage}
              source={{
                uri: imageUrl,
              }}
              PlaceholderContent={
                <ActivityIndicator size="large" color="#0000ff" />
              }
            />
          </View>
          <View style={styles.postEditMediaControls}>
            <Icon
              raised
              size={25}
              name="edit"
              color={theme.colors?.secondary}
              onPress={selectPhotoSource}
            />
            <Icon
              raised
              size={25}
              name="delete"
              color={theme.colors?.error}
              onPress={() => setUploadedMedia('')}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderVideoBlock = () => {
    if (!videoUrl) {
      return (
        <View style={styles.postEditMediaContainer}>
          <Text style={styles.postEditMediaTitle}>Add video</Text>
          <View style={styles.postEditMedia}>
            <Icon
              raised
              size={25}
              name="video-library"
              color={theme.colors?.secondary}
              onPress={selectVideoSource}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.postEditMediaContainer}>
        <Text style={styles.postEditMediaTitle}>Change video</Text>
        <View style={styles.postEditMedia}>
          <View style={styles.postEditMediaWrap}>
            <VideoPlayerCustom
              uri={videoUrl}
              postId={postId}
              style={styles.postEditVideo}
            />
          </View>
          <View style={styles.postEditMediaControls}>
            <Icon
              raised
              size={25}
              name="edit"
              color={theme.colors?.secondary}
              onPress={selectVideoSource}
            />
            <Icon
              raised
              size={25}
              name="delete"
              color={theme.colors?.error}
              onPress={() => setUploadedMedia('', true)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderImageBlock()}
      {renderVideoBlock()}
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
