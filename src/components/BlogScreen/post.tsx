import React, {useState} from 'react';

import {ActivityIndicator, Text, View} from 'react-native';
import {FAB, Icon, Image} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import styleSheet from './style';
import moment from 'moment';
import {BlogPostProps} from '../../store/blogStore';

interface Props {
  post: BlogPostProps;
  savePost: (post: BlogPostProps) => void;
  closePost: () => void;
}

const Post = ({post, savePost, closePost}: Props) => {
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  const {t} = useTranslation();

  const styles = styleSheet();

  const handleSavePost = () => {
    const postDate = post.date || moment().format('L');

    savePost({
      title: title,
      text: text,
      imageUrl: imageUrl,
      date: postDate,
      id: post.id,
    });
  };

  return (
    <View style={styles.postEdit}>
      <View style={styles.postHeader}>
        <Text style={styles.postDate}>{moment(post.date).format('L')}</Text>
        <View style={styles.postHeaderIcons}>
          <Icon
            raised
            name="edit"
            color="white"
            onPress={() => console.log('hello')}
          />
          <Icon
            raised
            name="remove"
            color="white"
            onPress={() => console.log('hello')}
          />
        </View>
      </View>
      <Text style={styles.Title}>{post.title}</Text>
      <Text style={styles.postText}>{post.text}</Text>
    </View>
  );
};

export default Post;
