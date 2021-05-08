import {makeAutoObservable} from 'mobx';

export interface BlogSavedPostProps {
  title: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  date: string;
  id: string;
}

export default class BlogStore {
  posts: BlogSavedPostProps[] = [
    {
      title: 'Post title',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut libero massa. Quisque eget nibh gravida, imperdiet odio id, convallis elit. Cras cursus vel augue sodales varius. Sed facilisis semper justo at lacinia. Nunc sit amet leo nec elit varius ultricies id id urna. Suspendisse massa neque, venenatis at commodo et, bibendum eget orci. Fusce pretium massa eget luctus semper.',
      // imageUrl: '',
      date: '2021-04-05T20:24:59Z',
      id: '1',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  savePost = (post: BlogSavedPostProps) => {
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
