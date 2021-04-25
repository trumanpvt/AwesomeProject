import React from 'react';
import {Text} from 'react-native';
import {Container, Content} from 'native-base';
import {getNews} from '../../util/news.js';
import styles from './style.js';
import {useStores} from '../../store';

const News = () => {
  const {country} = useStores().localeStore;

  const news = getNews(country);

  console.log(news);

  return (
    <Container>
      <Content>
        <Text style={styles.text}>NEWS TEXT</Text>
      </Content>
    </Container>
  );
};

export default News;
