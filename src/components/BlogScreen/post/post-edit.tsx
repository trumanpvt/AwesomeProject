import React, {useState} from 'react';

import {ScrollView, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import moment from 'moment';

import {PostModalProps} from './index';
import PostUploadMedia from './media-upload';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {useStores} from '../../../store';
import storage from '@react-native-firebase/storage';
import {BlogOpenedPostProps} from '..';
import InputCustom from '../../Elements/Input';

import styleSheet from './style';
import {removeFromStorage} from '../../../util/media';

const PostEdit = ({
  post,
  setOpenedPost,
  removePost,
  userUid = '',
}: PostModalProps) => {
  const {blogStore, stateStore} = useStores();
  const {savePost} = blogStore;
  const {setLoading} = stateStore;

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

    setLoading(true);

    const savedPost = {
      title: title,
      text: text,
      imageUrl: imageUrl.changed ? await handleUploadMedia() : imageUrl.uri,
      videoUrl: videoUrl.changed ? await handleUploadMedia(true) : videoUrl.uri,
      date: postDate,
      id: post.id,
    };

    setLoading(false);

    savePost(savedPost, userUid);

    removeMediaFromStorage().catch(e => {
      console.log('removeMediaFromStorage error', e);
    });

    return handleClosePost(savedPost);
  };

  const removeMediaFromStorage = async () => {
    const path = userUid + '/' + post.id + '/';

    if (imageUrl.changed && !imageUrl.uri) {
      await removeFromStorage(path + 'image');
    }

    if (videoUrl.changed && !videoUrl.uri) {
      await removeFromStorage(path + 'video');
    }
  };

  const handleUploadMedia = async (isVideo?: boolean) => {
    const media = isVideo ? videoUrl : imageUrl;
    const mediaType = isVideo ? 'video' : 'image';

    const mediaPath = `${userUid}/posts/${post.id}/media/${mediaType}${
      isVideo ? '.mp4' : '.jpg'
    }`;

    if (!media.uri) {
      return storage()
        .ref(mediaPath)
        .delete()
        .then(() => {
          return '';
        })
        .catch(() => {
          setLoading(false);
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
              return res;
            })
            .catch(() => {
              setLoading(false);
            });
        });
    }
  };

  const handleClosePost = (savedPost?: BlogOpenedPostProps) => {
    if (post.editMode === 'screen') {
      return setOpenedPost({id: ''});
    } else if (savedPost) {
      return setOpenedPost({...savedPost, editMode: ''});
    } else {
      return setOpenedPost({...post, editMode: ''});
    }
  };

  const setUploadedMedia = (uri: string, isVideo?: boolean) => {
    console.log(uri);
    if (isVideo) {
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
              disabled={!title && !text && !imageUrl.uri && !videoUrl.uri}
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
              onPress={() => handleClosePost()}
            />
          </View>
        </View>
        <InputCustom
          inputStyle={styles.titleInput}
          placeholder={t('blog.placeholder.title')}
          value={title}
          onChangeText={setTitle}
          leftIcon={{name: 'title'}}
        />
        <InputCustom
          inputStyle={styles.textInput}
          multiline={true}
          placeholder={t('blog.placeholder.text')}
          value={text}
          onChangeText={setText}
          leftIcon={{name: 'edit'}}
        />
        <PostUploadMedia
          videoUrl={videoUrl.uri}
          imageUrl={imageUrl.uri}
          setUploadedMedia={setUploadedMedia}
          postId={post.id}
        />
      </ScrollView>
    </ActionSheetProvider>
  );
};

export default PostEdit;
