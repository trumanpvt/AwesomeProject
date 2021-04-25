const url =
  'https://newsapi.org/v2/top-headlines?country=us&apiKey=104f1bfc96234dfa8fb898d18d7f989f';

export async function getNews() {
  let result = await fetch(url).then((response) => response.json());
  return result.articles;
}
