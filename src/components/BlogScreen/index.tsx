import React from 'react';

import {ActivityIndicator, Text, View} from 'react-native';
import {FAB, Icon, Image} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import styleSheet from './style';
import {useStores} from '../../store';
import styles from '../News/style';
import moment from 'moment';

const BlogScreen = () => {
  const {posts, addPost, removePost} = useStores().blogStore;

  const {t} = useTranslation();

  const styles = styleSheet();

  const renderPost = (
    post: {
      title: string;
      text: string;
      imageUrl?: string;
      date: string;
      id: string;
    },
    index: number,
  ) => {
    return (
      <View style={styles.post} key={index.toString()}>
        <View style={styles.postHeader}>
          <Text style={styles.postDate}>{moment(post.date).format('L')}</Text>
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
        <Text style={styles.Title}>{post.title}</Text>
        <Text style={styles.postText}>{post.text}</Text>
        {post.imageUrl && (
          <Image
            resizeMode="contain"
            style={styles.postImg}
            source={{
              uri: post.imageUrl,
            }}
            PlaceholderContent={
              <ActivityIndicator size="large" color="#0000ff" />
            }
          />
        )}
      </View>
    );
  };

  const createPost = () => {};

  return (
    <View style={styles.container}>
      {posts.length ? (
        posts.map(renderPost)
      ) : (
        <Text style={styles.emptyText}>{t('blog.empty')}</Text>
      )}
      <FAB
        icon={{
          name: 'post-add',
          size: 25,
          color: 'white',
        }}
        onPress={createPost}
        raised
      />
    </View>
  );
};

export default BlogScreen;
