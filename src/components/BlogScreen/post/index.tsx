import React from 'react';

import {Modal} from 'react-native';

import PostEdit from './post-edit';
import Post from './post';

import {BlogPostProps} from '../index';

import styleSheet from '../style';

export interface PostModalProps {
  post: BlogPostProps;
  setOpenPost?: (post: BlogPostProps) => void;
  closePost: () => void;
  removePost: (postId: string) => void;
}

const PostModal = ({
  post,
  setOpenPost,
  closePost,
  removePost,
}: PostModalProps) => {
  const styles = styleSheet();

  return post.id ? (
    <Modal style={styles.postModal}>
      {post.isEdit ? (
        <PostEdit post={post} closePost={closePost} removePost={removePost} />
      ) : (
        <Post
          post={post}
          setOpenPost={setOpenPost}
          closePost={closePost}
          removePost={removePost}
        />
      )}
    </Modal>
  ) : null;
};

export default PostModal;
