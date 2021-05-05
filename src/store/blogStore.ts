import {makeAutoObservable} from 'mobx';

export interface BlogPostProps {
  title: string;
  text?: string;
  imageUrl?: string;
  date: string;
  id: string;
}

export default class BlogStore {
  posts: BlogPostProps[] = [
    {
      title: 'Post title',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut libero massa. Quisque eget nibh gravida, imperdiet odio id, convallis elit. Cras cursus vel augue sodales varius. Sed facilisis semper justo at lacinia. Nunc sit amet leo nec elit varius ultricies id id urna. Suspendisse massa neque, venenatis at commodo et, bibendum eget orci. Fusce pretium massa eget luctus semper.',
      // imageUrl: '',
      date: '2021-05-05T20:24:59Z',
      id: '1',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  savePost = (post: {
    title: string;
    text?: string | undefined;
    imageUrl?: string | undefined;
    date: string;
    id: string;
  }) => {
    const postIndex = this.posts.findIndex(post => post.id === post.id);

    if (postIndex === -1) {
      this.posts.push(post);
    } else {
      this.posts[postIndex] = post;
    }
  };

  removePost = (postId: string) => {
    const postIndex = this.posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      this.posts.splice(postIndex, 1);
    }
  };
}
