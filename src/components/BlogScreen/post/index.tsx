import React from 'react';

import {Modal, SafeAreaView} from 'react-native';

import PostEdit from './post-edit';
import Post from './post';
import {BlogOpenedPostProps} from '../index';
import styleSheet from './style';

export interface PostModalProps {
  post: BlogOpenedPostProps;
  setOpenedPost: (post: BlogOpenedPostProps) => void;
  removePost: (postId: string) => void;
  userUid?: string;
}

const PostModal = ({
  post,
  setOpenedPost,
  removePost,
  userUid,
}: PostModalProps) => {
  const styles = styleSheet();

  return post.id ? (
    <Modal supportedOrientations={['portrait', 'landscape']}>
      <SafeAreaView style={styles.container}>
        {post.editMode ? (
          <PostEdit
            post={post}
            setOpenedPost={setOpenedPost}
            removePost={removePost}
            userUid={userUid}
          />
        ) : (
          <Post
            post={post}
            setOpenedPost={setOpenedPost}
            removePost={removePost}
          />
        )}
      </SafeAreaView>
    </Modal>
  ) : null;
};

export default PostModal;
