import React from 'react';

import {Modal} from 'react-native';

import PostEdit from './post-edit';
import Post from './post';

import styleSheet from '../style';
import {
  BlogOpenedPostProps,
  BlogSavedPostProps,
} from '../../../store/blogStore';

export interface PostModalProps {
  post: BlogOpenedPostProps;
  setOpenedPost: (post: BlogOpenedPostProps) => void;
  removePost: (postId: string) => void;
  savePost?: (post: BlogSavedPostProps) => void;
}

const PostModal = ({
  post,
  setOpenedPost,
  removePost,
  savePost,
}: PostModalProps) => {
  const styles = styleSheet();

  return post.id ? (
    <Modal style={styles.postModal}>
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
    </Modal>
  ) : null;
};

export default PostModal;
