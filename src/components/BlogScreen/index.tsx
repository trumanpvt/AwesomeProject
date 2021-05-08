import React, {useState} from 'react';

import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {FAB, Icon, Image, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

import moment from 'moment';

import styleSheet from './style';
import PostModal from './post';
import {BlogSavedPostProps} from '../../store/blogStore';

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

  const {blogStore, localeStore} = useStores();

  const {posts, removePost, savePost} = blogStore;
  const {language} = localeStore;

  const {t} = useTranslation();

  const {theme} = useTheme();

  const styles = styleSheet();

  const renderPost = (post: BlogSavedPostProps, index: number) => {
    console.log(post);
    return (
      <TouchableOpacity
        style={styles.post}
        key={index.toString()}
        onPress={() => setOpenedPost(post)}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderInfo}>
            <Text style={styles.postHeaderInfoDate}>
              {moment(post.date).locale(language).format('LLL')}
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
              onPress={() => removePost(post.id)}
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

  const createPost = () => {
    const newPostId = Math.random().toString(36).substr(2, 9);

    return setOpenedPost({id: newPostId, editMode: 'screen'});
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
      <PostModal
        post={openedPost}
        setOpenedPost={setOpenedPost}
        removePost={removePost}
        savePost={savePost}
      />
    </View>
  );
};

export default observer(BlogScreen);
