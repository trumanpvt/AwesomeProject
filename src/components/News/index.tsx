import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Container, Content} from 'native-base';
import {useStores} from '../../store';
import {getNews} from '../../util/news';
import styles from './style.js';
import {observer} from 'mobx-react-lite';

const News = () => {
  const {country} = useStores().localeStore;

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getNews(country).then((res) => setArticles(res));
  }, [country]);

  console.log(articles);

  return (
    <Container>
      <Content>
        <Text style={styles.text}>NEWS TEXT</Text>
      </Content>
    </Container>
  );
};

export default observer(News);
