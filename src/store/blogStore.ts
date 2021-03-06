import {action, makeAutoObservable} from 'mobx';
import {
  pushDatabaseValue,
  readDatabaseValue,
  removeDatabaseValue,
} from '../util/database';

export interface BlogSavedPostProps {
  title: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  date: string;
  id: string;
}

export default class BlogStore {
  posts: BlogSavedPostProps[] = [];

  state: string = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  savePost = (post: BlogSavedPostProps, uid: string) => {
    pushDatabaseValue(`/users/${uid}/posts/${post.id}`, post).then(() => {
      return this.fetchPosts(uid);
    });
  };

  removePost = (uid: string, postId: string) => {
    return removeDatabaseValue(`/users/${uid}/posts/${postId}`);
  };

  fetchPosts = (uid: string) => {
    // this.posts = [];

    this.state = 'pending';

    readDatabaseValue(`/users/${uid}/posts`).then(
      action('fetchSuccess', (posts: BlogSavedPostProps[]) => {
        console.log('done');
        this.state = 'done';
        this.posts = posts ? Object.values(posts) : [];
      }),
      action('fetchError', () => {
        this.state = 'error';
        this.posts = [];
      }),
    );
  };
}
