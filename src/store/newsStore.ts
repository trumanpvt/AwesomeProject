import {flow, makeAutoObservable} from 'mobx';

export default class NewsStore {
  articles: any[] = [];

  state = 'done';

  constructor() {
    makeAutoObservable(this, {
      fetchArticles: flow,
    });
  }

  *fetchArticles(country: string) {
    this.articles = [];

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=104f1bfc96234dfa8fb898d18d7f989f`;
    this.state = 'pending';
    try {
      const result: {articles: any[]} = yield fetch(url).then((response) =>
        response.json(),
      );
      this.state = 'done';
      this.articles = result.articles;
    } catch (error) {
      this.state = 'error';
    }
  }
}
