import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {FAB, Icon, Image, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

import PostModal from './post';
import {BlogSavedPostProps} from '../../store/blogStore';
import {getLocaleDate} from '../../util/date';

import styles from './style';
import {removeFromStorage} from '../../util/media';

export interface BlogOpenedPostProps {
  title?: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  date?: string;
  id: string;
  editMode?: string;
}

const BlogScreen = () => {
  const [openedPost, setOpenedPost] = useState<BlogOpenedPostProps>({id: ''});

  const {blogStore, localeStore, userStore} = useStores();

  const {posts, state, removePost, fetchPosts} = blogStore;
  const {user} = userStore;
  const {language} = localeStore;

  const {t} = useTranslation();

  const {theme} = useTheme();

  useEffect(() => {
    // if (user && !posts.length && state !== 'pending') {
    user && fetchPosts(user.uid);
    // }
  }, [fetchPosts, user]);

  if (!user) {
    return <Text>Test</Text>;
  }

  const handleRemovePost = (postId: string) => {
    if (user) {
      removePost(user.uid, postId).then(() => {
        if (openedPost.id) {
          setOpenedPost({id: ''});
        }
        fetchPosts(user.uid);
      });

      const path = user.uid + '/' + postId;
      removeFromStorage(path).catch(e => {
        console.log('removeFromStorage error', e);
      });
    }
  };

  const renderPost = (post: BlogSavedPostProps, index: number) => {
    return (
      <TouchableOpacity
        style={styles.post}
        key={index.toString()}
        onPress={() => setOpenedPost(post)}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderInfo}>
            <Text style={styles.postHeaderInfoDate}>
              {getLocaleDate(post.date, language)}
            </Text>
            <Text style={styles.postHeaderInfoTitle}>{post.title}</Text>
          </View>
          <View style={styles.postHeaderIcons}>
            <Icon
              raised
              size={20}
              name="edit"
              color={theme.colors?.secondary}
              onPress={() => setOpenedPost({...post, editMode: 'screen'})}
            />
            <Icon
              raised
              size={20}
              name="delete"
              color={theme.colors?.error}
              onPress={() => handleRemovePost(post.id)}
            />
          </View>
        </View>
        <Text style={styles.postText}>{post.text}</Text>
        {post.imageUrl ? (
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
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderPostsBlock = () => {
    if (posts.length) {
      return <View>{posts.map(renderPost)}</View>;
    }

    return <Text style={styles.emptyText}>{t('blog.empty')}</Text>;
  };

  const createPost = () => {
    const newPostId = Math.random().toString(36).substr(2, 9);

    return setOpenedPost({id: newPostId, editMode: 'screen'});
  };

  return (
    <View style={styles.container}>
      {state !== 'pending' ? (
        renderPostsBlock()
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <FAB
        icon={{
          name: 'post-add',
          size: 25,
          color: 'white',
        }}
        onPress={createPost}
        raised
        buttonStyle={styles.newPostBtn}
      />
      <PostModal
        post={openedPost}
        userUid={user.uid}
        setOpenedPost={setOpenedPost}
        removePost={handleRemovePost}
      />
    </View>
  );
};

export default observer(BlogScreen);
