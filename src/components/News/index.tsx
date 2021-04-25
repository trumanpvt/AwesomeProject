import React, {useEffect, useState} from 'react';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';
import moment from 'moment';

import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Container, Content} from 'native-base';
import {getNews} from '../../util/news';

import styles from './style.js';

const News = () => {
  const {country} = useStores().localeStore;

  moment.locale('fr');

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getNews(country).then((res) => setArticles(res));
  }, [country]);

  console.log(articles);

  const renderArticle = (article: any, index: number): JSX.Element => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.article}
        onPress={() => Linking.openURL(article.url)}>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleDescription}>{article.description}</Text>
        <Image
          resizeMode={'cover'}
          style={styles.articleImg}
          source={{
            uri: article.urlToImage,
          }}
        />
        <View style={styles.articleData}>
          <Text style={styles.articleSource}>{article.source.name}</Text>
          <Text style={styles.articleDate}>
            {moment(article.publishedAt).format('L')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return articles.length ? (
    <Container>
      <Content style={styles.articles}>{articles.map(renderArticle)}</Content>
    </Container>
  ) : null;
};

export default observer(News);
