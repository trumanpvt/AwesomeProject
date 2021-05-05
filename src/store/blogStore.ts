import {makeAutoObservable} from 'mobx';

export default class BlogStore {
  posts: {
    title: string;
    text: string;
    imageUrl?: string;
    date: string;
    id: string;
  }[] = [
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

  addPost = (post: {
    title: string;
    text: string;
    imageUrl?: string | undefined;
    date: string;
    id: string;
  }) => {
    this.posts.push(post);
  };

  removePost = (postId: string) => {
    const postIndex = this.posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      this.posts.splice(postIndex, 1);
    }
  };
}
