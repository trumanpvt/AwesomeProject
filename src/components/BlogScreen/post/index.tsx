import React, {useState} from 'react';

import {Modal, SafeAreaView} from 'react-native';

import PostEdit from './post-edit';
import Post from './post';
import {BlogOpenedPostProps} from '../index';
import styleSheet from './style';
import {useTranslation} from 'react-i18next';
import ModalConfirm from '../../Elements/ModalConfirm';

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
  const [modalRemovePost, setModalRemovePost] = useState(false);

  const {t} = useTranslation();

  const styles = styleSheet();

  const handleRemovePost = () => {
    setModalRemovePost(false);
    return removePost(post.id);
  };

  return post.id ? (
    <Modal supportedOrientations={['portrait', 'landscape']}>
      <SafeAreaView style={styles.container}>
        {post.editMode ? (
          <PostEdit
            post={post}
            setOpenedPost={setOpenedPost}
            removePost={() => setModalRemovePost(true)}
            userUid={userUid}
          />
        ) : (
          <Post
            post={post}
            setOpenedPost={setOpenedPost}
            removePost={() => setModalRemovePost(true)}
          />
        )}
      </SafeAreaView>
      {modalRemovePost ? (
        <ModalConfirm
          message={t('blog.removePost')}
          onOk={handleRemovePost}
          onCancel={() => setModalRemovePost(false)}
        />
      ) : null}
    </Modal>
  ) : null;
};

export default PostModal;
