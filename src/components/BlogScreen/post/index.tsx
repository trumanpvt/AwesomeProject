import React from 'react';

import {Modal, SafeAreaView} from 'react-native';

import PostEdit from './post-edit';
import Post from './post';
import {BlogOpenedPostProps} from '../index';

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
  return post.id ? (
    <SafeAreaView>
      <Modal>
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
    </SafeAreaView>
  ) : null;
};

export default PostModal;
