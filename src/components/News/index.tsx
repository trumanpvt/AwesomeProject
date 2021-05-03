import React, {useEffect} from 'react';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store';
import moment from 'moment';

import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useTranslation} from 'react-i18next';
import styles from './style';

const News = () => {
  const {localeStore, newsStore} = useStores();
  const {country} = localeStore;
  const {articles, state} = newsStore;

  const {t} = useTranslation();

  useEffect(() => {
    newsStore.fetchArticles(country);
  }, [country, newsStore]);

  const onRefresh = () => {
    newsStore.fetchArticles(country);
  };

  const renderArticle = (article: any, index: number): JSX.Element => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.article}
        onPress={() => Linking.openURL(article.url)}>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleDescription}>{article.description}</Text>
        {article.urlToImage && (
          <Image
            resizeMode="contain"
            style={styles.articleImg}
            source={{
              uri: article.urlToImage,
            }}
          />
        )}
        <View style={styles.articleData}>
          <Text style={styles.articleSource}>{article.source.name}</Text>
          <Text style={styles.articleDate}>
            {moment(article.publishedAt).format('L')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>{t('news.pickerTitle')}</Text>
      </View>
      <ScrollView
        style={styles.articles}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={state === 'pending'}
          />
        }>
        {state !== 'error' ? (
          articles.map(renderArticle)
        ) : (
          <Text style={styles.error}>News loading error</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default observer(News);
