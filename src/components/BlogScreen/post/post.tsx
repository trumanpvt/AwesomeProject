import React, {useRef} from 'react';

import {ActivityIndicator, ScrollView, Text, View} from 'react-native';

import Video from 'react-native-video';

import {Icon, Image, useTheme} from 'react-native-elements';

import {PostModalProps} from './index';

import styleSheet from './style';
import {useStores} from '../../../store';
import {getLocaleDate} from '../../../util/date';

const Post = ({post, setOpenedPost, removePost}: PostModalProps) => {
  const {language} = useStores().localeStore;
  const {theme} = useTheme();

  let videoPlayer = useRef(null);

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
        <Video
          source={{uri: post.videoUrl}} // Can be a URL or a local file.
          ref={ref => {
            videoPlayer = ref;
          }} // Store reference
          // onBuffer={() => <ActivityIndicator size="large" color="#0000ff" />} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          style={styles.postVideo}
        />
      ) : null}
    </ScrollView>
  );
};

export default Post;
