import React, {useState} from 'react';

import {Text, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import moment from 'moment';

import styleSheet from './style';
import {PostModalProps} from './index';

const PostEdit = ({
  post,
  setOpenedPost,
  removePost,
  savePost,
}: PostModalProps) => {
  const [title, setTitle] = useState(post.title || '');
  const [text, setText] = useState(post.text || '');
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '');

  const {t} = useTranslation();

  const {theme} = useTheme();

  const styles = styleSheet();

  const handleSavePost = () => {
    const postDate = post.date || moment().format('L');

    if (savePost) {
      return savePost({
        title: title,
        text: text,
        imageUrl: imageUrl,
        date: postDate,
        id: post.id,
      });
    }
  };

  const handleClosePost = () => {
    if (post.editMode === 'screen') {
      return setOpenedPost({id: ''});
    } else {
      return setOpenedPost({id: post.id});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>{moment(post.date).format('L')}</Text>
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
      <Text style={styles.Title}>{post.title}</Text>
      <Text style={styles.postText}>{post.text}</Text>
    </View>
  );
};

export default PostEdit;
