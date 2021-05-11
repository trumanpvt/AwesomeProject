import React from 'react';

import {ActivityIndicator, ScrollView, Text, View} from 'react-native';

import {Icon, Image, useTheme} from 'react-native-elements';

import {PostModalProps} from './index';

import styleSheet from './style';
import {useStores} from '../../../store';
import {getLocaleDate} from '../../../util/date';
import VideoPlayerCustom from '../../VideoPlayer';

const Post = ({post, setOpenedPost, removePost}: PostModalProps) => {
  const {language} = useStores().localeStore;
  const {theme} = useTheme();

  const styles = styleSheet();

  return (
    <ScrollView style={styles.post}>
      <View style={styles.header}>
        <Text style={styles.headerDate} numberOfLines={2}>
          {getLocaleDate(post.date, language)}
        </Text>
        <View style={styles.headerIcons}>
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
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.text}>{post.text}</Text>
      {post.imageUrl ? (
        <Image
          resizeMode="contain"
          style={styles.postImage}
          source={{
            uri: post.imageUrl,
          }}
          PlaceholderContent={
            <ActivityIndicator size="large" color="#0000ff" />
          }
        />
      ) : null}
      {post.videoUrl ? (
        <VideoPlayerCustom uri={post.videoUrl} postId={post.id} />
      ) : null}
    </ScrollView>
  );
};

export default Post;
