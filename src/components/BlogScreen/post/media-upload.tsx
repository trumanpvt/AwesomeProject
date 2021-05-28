import React, {useState} from 'react';

import {Platform, Text, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import styleSheet from './style';
import Camera from '../../Camera';
import {useActionSheet} from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {useStores} from '../../../store';
import VideoPlayerCustom from '../../Elements/VideoPlayer';
import ImageCustom from '../../Elements/Image';

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
        options: [
          t('blog.media.gallery'),
          t('blog.media.takePhoto'),
          t('misc.cancel'),
        ],
        cancelButtonIndex: 2,
        title: t('blog.media.imageSource'),
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
        options: [
          t('blog.media.gallery'),
          t('blog.media.takeVideo'),
          t('misc.cancel'),
        ],
        cancelButtonIndex: 2,
        title: t('blog.media.videoSource'),
      },
      buttonIndex => {
        if (buttonIndex !== 2) {
          handleUploadMedia(!!buttonIndex, true);
        }
      },
    );
  };

  const handleUploadMedia = (isCamera: boolean, isVideo: boolean = false) => {
    if (isCamera) {
      return setCamera({open: true, isVideo});
    }

    const options: {
      cropping: boolean;
      mediaType?: 'video' | 'photo';
    } = {
      cropping: !isVideo,
      mediaType: isVideo ? 'video' : 'photo',
    };

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
          <Text style={styles.postEditMediaTitle}>
            {t('blog.media.imageAdd')}
          </Text>
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
        <Text style={styles.postEditMediaTitle}>
          {t('blog.media.imageChange')}
        </Text>
        <View style={styles.postEditMedia}>
          <View style={styles.postEditMediaWrap}>
            <ImageCustom
              style={styles.postEditImage}
              containerStyle={styles.postEditImageContainer}
              uri={imageUrl}
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
          <Text style={styles.postEditMediaTitle}>
            {t('blog.media.videoAdd')}
          </Text>
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
        <Text style={styles.postEditMediaTitle}>
          {t('blog.media.videoChange')}
        </Text>
        <View style={styles.postEditMedia}>
          <View style={styles.postEditMediaWrap}>
            <VideoPlayerCustom
              uri={videoUrl}
              name={postId}
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
