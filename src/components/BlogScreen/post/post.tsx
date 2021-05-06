import React from 'react';

import {Text, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';

import styleSheet from '../style';
import moment from 'moment';
import {BlogPostProps} from '../index';
import {PostModalProps} from './index';

// interface Props {
//   post: BlogPostProps;
//   setOpenPost: (post: BlogPostProps) => void;
//   closePost: () => void;
//   removePost: (postId: string) => void;
// }

const Post = ({post, setOpenPost, closePost, removePost}: PostModalProps) => {
  const {theme} = useTheme();

  const styles = styleSheet();

  return (
    <View style={styles.postEdit}>
      <View style={styles.postHeader}>
        <Text style={styles.postDate}>{moment(post.date).format('L')}</Text>
        <View style={styles.postHeaderIcons}>
          <Icon
            raised
            size={20}
            name="edit"
            color={theme.colors?.secondary}
            onPress={() => setOpenPost(post)}
          />
          <Icon
            raised
            size={20}
            name="delete"
            color={theme.colors?.error}
            onPress={() => removePost(post.id)}
          />
        </View>
      </View>
      <Text style={styles.Title}>{post.title}</Text>
      <Text style={styles.postText}>{post.text}</Text>
    </View>
  );
};

export default Post;
