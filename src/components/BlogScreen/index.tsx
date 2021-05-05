import React, {useState} from 'react';

import {ActivityIndicator, Modal, Text, View} from 'react-native';
import {FAB, Icon, Image, useTheme} from 'react-native-elements';

import Post from './post';

import {useTranslation} from 'react-i18next';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

import moment from 'moment';

import styleSheet from './style';
import {BlogPostProps} from '../../store/blogStore';

const BlogScreen = () => {
  const [editPost, setEditPost] = useState<BlogPostProps>({
    id: '',
    title: '',
    date: '',
  });

  const {posts, savePost, removePost} = useStores().blogStore;

  const {t} = useTranslation();

  const {theme} = useTheme();

  const styles = styleSheet();

  const renderPost = (post: BlogPostProps, index: number) => {
    return (
      <View style={styles.post} key={index.toString()}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderInfo}>
            <Text style={styles.postHeaderInfoDate}>
              {moment(post.date).format('L')}
            </Text>
            <Text style={styles.postHeaderInfoTitle}>{post.title}</Text>
          </View>
          <View style={styles.postHeaderIcons}>
            <Icon
              raised
              size={20}
              name="edit"
              color={theme.colors?.secondary}
              onPress={() => setEditPost(post)}
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

  const createPost = () => {
    const newPostId = Math.random().toString(36).substr(2, 9);

    return setEditPost({id: newPostId});
  };

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
      {editPost.id ? (
        <Modal>
          <Post
            post={editPost}
            savePost={savePost}
            closePost={() => setEditPost('')}
          />
        </Modal>
      ) : null}
    </View>
  );
};

export default observer(BlogScreen);
