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
  savePost?: (post: {
    date: string;
    videoUrl: string;
    imageUrl: string;
    text: string;
    id: string;
    title: string;
  }) => void;
}

const PostModal = ({
  post,
  setOpenedPost,
  removePost,
  savePost,
}: PostModalProps) => {
  const styles = styleSheet();

  return post.id ? (
    <Modal>
      <SafeAreaView style={styles.container}>
        {post.editMode ? (
          <PostEdit
            post={post}
            setOpenedPost={setOpenedPost}
            removePost={removePost}
            savePost={savePost}
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
