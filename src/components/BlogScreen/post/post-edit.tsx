import React, {useState} from 'react';

import {ScrollView, View} from 'react-native';
import {Icon, Input, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import moment from 'moment';

import styleSheet from './style';
import {PostModalProps} from './index';
import PostUploadMedia from './media-upload';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {useStores} from '../../../store';
import storage from '@react-native-firebase/storage';

const PostEdit = ({
  post,
  setOpenedPost,
  removePost,
  userUid = '',
}: PostModalProps) => {
  const {savePost} = useStores().blogStore;

  const [title, setTitle] = useState(post.title || '');
  const [text, setText] = useState(post.text || '');
  const [imageUrl, setImageUrl] = useState({
    uri: post.imageUrl || '',
    changed: false,
  });
  const [videoUrl, setVideoUrl] = useState({
    uri: post.videoUrl || '',
    changed: false,
  });

  const {t} = useTranslation();

  const {theme} = useTheme();

  const styles = styleSheet();

  const handleSavePost = async () => {
    const postDate = post.date || moment().toISOString();

    savePost(
      {
        title: title,
        text: text,
        imageUrl: imageUrl.changed ? await handleUploadMedia() : imageUrl.uri,
        videoUrl: videoUrl.changed
          ? await handleUploadMedia(true)
          : videoUrl.uri,
        date: postDate,
        id: post.id,
      },
      userUid,
    );

    return handleClosePost();
  };

  const handleUploadMedia = async (isVideo?: boolean) => {
    const media = isVideo ? videoUrl : imageUrl;
    const mediaType = isVideo ? 'video' : 'image';

    const mediaPath = `${userUid}/posts/${post.id}/media/${mediaType}`;

    if (!media.uri) {
      return storage()
        .ref(mediaPath)
        .delete()
        .then(() => {
          return '';
        });
    } else {
      return storage()
        .ref(mediaPath)
        .putFile(media.uri)
        .then(() => {
          return storage()
            .ref(mediaPath)
            .getDownloadURL()
            .then(res => {
              console.log(res);
              return res;
            });
        });
    }
  };

  const handleClosePost = () => {
    if (post.editMode === 'screen') {
      return setOpenedPost({id: ''});
    } else {
      return setOpenedPost({...post, editMode: ''});
    }
  };

  const setUploadedMedia = (uri: string, isVideo?: boolean) => {
    if (isVideo) {
      console.log(uri);
      setVideoUrl({uri: uri, changed: true});
    } else {
      setImageUrl({uri: uri, changed: true});
    }
  };

  return (
    <ActionSheetProvider>
      <ScrollView style={styles.post}>
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
        <Input
          inputStyle={styles.titleInput}
          placeholder={t('blog.placeholder.title')}
          value={title}
          onChangeText={setTitle}
          leftIcon={{name: 'title'}}
        />
        <Input
          inputStyle={styles.textInput}
          multiline={true}
          placeholder={t('blog.placeholder.text')}
          value={text}
          onChangeText={setText}
          leftIcon={{name: 'edit'}}
        />
        <PostUploadMedia
          postId={post.id}
          videoUrl={videoUrl.uri}
          imageUrl={imageUrl.uri}
          setUploadedMedia={setUploadedMedia}
        />
      </ScrollView>
    </ActionSheetProvider>
  );
};

export default PostEdit;
