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

interface PostUploadMediaProps {
  postId: string;
}

const PostUploadMedia = ({postId}: PostUploadMediaProps) => {
  const [uploading, setUploading] = useState(false);
  const [isOpenCamera, setIsOpenCamera] = useState(false);

  const {t} = useTranslation();

  const {theme} = useTheme();

  const {showActionSheetWithOptions} = useActionSheet();

  const styles = styleSheet();

  const selectMediaSource = () => {
    return showActionSheetWithOptions(
      {
        options: ['Select from gallery', 'Take photo/video', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Choose image/video source',
      },
      buttonIndex => {
        if (buttonIndex !== 2) {
          handleChangeAvatar(!!buttonIndex);
        }
      },
    );
  };

  const handleChangeAvatar = (isCamera: boolean) => {
    const options = {
      width: 80,
      height: 80,
      cropping: true,
    };

    if (isCamera) {
      return setIsOpenCamera(true);
    }

    return ImagePicker.openPicker(options)
      .then((image: {path: string}) => {
        return uploadMedia(image.path);
      })
      .catch();
  };

  const handleGetMedia = (uri: string, type: string) => {
    ImagePicker.openCropper({
      mediaType: 'photo',
      path: uri,
      width: 80,
      height: 80,
    }).then((image: Image) => {
      setIsOpenCamera(false);
      return uploadMedia(image.path);
    });
  };

  const uploadMedia = (path: string) => {
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
        // changeUser({photoURL: url});
        setUploading(false);
      });
  };

  const handleClosePost = () => {
    if (post.editMode === 'screen') {
      return setOpenedPost({id: ''});
    } else {
      return setOpenedPost({...post, editMode: ''});
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.headerEdit]}>
        <View style={styles.headerIcons}>
          <Icon
            raised
            size={25}
            name="save"
            color={theme.colors?.secondary}
            onPress={handleSavePost}
          />
          <Icon
            raised
            size={25}
            name="delete"
            color={theme.colors?.error}
            onPress={() => removePost(post.id)}
          />
          <Icon
            raised
            size={25}
            name="close"
            color={theme.colors?.error}
            onPress={handleClosePost}
          />
        </View>
      </View>
      {/*<Text style={styles.Title}>{post.title}</Text>*/}
      {/*<Text style={styles.postText}>{post.text}</Text>*/}
      <Input
        inputStyle={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        leftIcon={{name: 'title'}}
      />
      <Input
        inputStyle={styles.textInput}
        multiline={true}
        placeholder="Text"
        value={text}
        onChangeText={setText}
        leftIcon={{name: 'edit'}}
      />
      {isOpenCamera && (
        <Camera
          getMedia={handleGetMedia}
          closeCamera={() => setIsOpenCamera(false)}
        />
      )}
    </View>
  );
};

export default PostUploadMedia;
