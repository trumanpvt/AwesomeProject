import React from 'react';

import {Text, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';

import moment from 'moment';

import {PostModalProps} from './index';

// import 'moment/locale/ru';
// moment.locale('ru');

import styleSheet from './style';
import {useStores} from '../../../store';

const Post = ({post, setOpenedPost, removePost}: PostModalProps) => {
  const {language} = useStores().localeStore;
  const {theme} = useTheme();

  const styles = styleSheet();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate} numberOfLines={2}>
          {moment(post.date).locale('ru').format('LLL')}
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
    </View>
  );
};

export default Post;
