export async function getNews(locale) {
  const url = `https://newsapi.org/v2/top-headlines?country=${locale}&apiKey=104f1bfc96234dfa8fb898d18d7f989f`;

  const result = await fetch(url).then((response) => response.json());

  return result.articles;
}
