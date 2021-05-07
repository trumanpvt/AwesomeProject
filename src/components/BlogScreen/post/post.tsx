import React from 'react';

import {Text, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';

import moment from 'moment';

import {PostModalProps} from './index';

import styleSheet from '../style';

const Post = ({post, setOpenedPost, removePost}: PostModalProps) => {
  const {theme} = useTheme();

  const styles = styleSheet();

  return (
    <View style={styles.postEdit}>
      <View style={styles.postHeader}>
        <Text style={styles.postDate}>{moment(post.date).format('L')}</Text>
        <View style={styles.postHeaderIcons}>
          <Icon
            raised
            size={25}
            name="edit"
            color={theme.colors?.secondary}
            onPress={() => setOpenedPost({...post, editMode: 'post'})}
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
            onPress={() => setOpenedPost({id: ''})}
          />
        </View>
      </View>
      <Text style={styles.Title}>{post.title}</Text>
      <Text style={styles.postText}>{post.text}</Text>
    </View>
  );
};

export default Post;
