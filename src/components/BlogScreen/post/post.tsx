import React from 'react';

import {ScrollView, Text, View} from 'react-native';

import {Icon, useTheme} from 'react-native-elements';

import {PostModalProps} from './index';

import styleSheet from './style';
import {useStores} from '../../../store';
import {getLocaleDate} from '../../../util/date';
import VideoPlayerCustom from '../../Elements/VideoPlayer';
import {observer} from 'mobx-react-lite';
import ImageCustom from '../../Elements/Image';

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
        <ImageCustom
          style={styles.postImage}
          containerStyle={styles.postImageContainer}
          uri={post.imageUrl}
        />
      ) : null}
      {post.videoUrl ? (
        <VideoPlayerCustom
          uri={post.videoUrl}
          name={post.id}
          style={styles.postVideo}
        />
      ) : null}
    </ScrollView>
  );
};

export default observer(Post);
