import React, {useState} from 'react';

import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {FAB, Icon, Image, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';

import moment from 'moment';

import styleSheet from './style';
import PostModal from './post';

export interface BlogPostProps {
  title?: string;
  text?: string;
  imageUrl?: string;
  date?: string;
  id: string;
  isEdit?: boolean;
}

const BlogScreen = () => {
  const [openPost, setOpenPost] = useState<BlogPostProps>({
    id: '',
  });

  const {posts, removePost} = useStores().blogStore;

  const {t} = useTranslation();

  const {theme} = useTheme();

  const styles = styleSheet();

  const renderPost = (post: BlogPostProps, index: number) => {
    return (
      <TouchableOpacity
        style={styles.post}
        key={index.toString()}
        onPress={() => {
          console.log('click post');
        }}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderInfo}>
            <Text style={styles.postHeaderInfoDate}>
              {moment(post.date).format('LLL')}
            </Text>
            <Text style={styles.postHeaderInfoTitle}>{post.title}</Text>
          </View>
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
      </TouchableOpacity>
    );
  };

  const createPost = () => {
    const newPostId = Math.random().toString(36).substr(2, 9);

    return setOpenPost({id: newPostId, title: '', date: ''});
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
        post={openPost}
        setOpenPost={setOpenPost}
        closePost={() => setOpenPost({id: ''})}
        removePost={removePost}
      />
    </View>
  );
};

export default observer(BlogScreen);
