import React, {useEffect, useMemo} from 'react';

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
import ButtonCustom from '../Button';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {countries} from '../../constants';

const News = () => {
  const {localeStore, newsStore} = useStores();
  const {language, country, setCountry} = localeStore;
  const {articles, state} = newsStore;

  const {showActionSheetWithOptions} = useActionSheet();

  const {t} = useTranslation();

  useEffect(() => {
    newsStore.fetchArticles(language, country);
  }, [country, language, newsStore]);

  const sortedCountries = useMemo(() => {
    return countries.sort(a => {
      if (a === country.toLowerCase() || a === language.toLowerCase()) {
        return -1;
      }

      return 1;
    });
  }, [country, language]);

  const onRefresh = () => {
    newsStore.fetchArticles(language, country);
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

  const getLanguageSelector = () => {
    return showActionSheetWithOptions(
      {
        options: [...sortedCountries, 'Cancel'],
        cancelButtonIndex: countries.length,
        title: t('news.selectCountry'),
        useModal: true,
        showSeparators: true,
        textStyle: styles.pickerOptions,
      },
      buttonIndex => {
        if (buttonIndex !== countries.length) {
          setCountry(countries[buttonIndex]);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <ButtonCustom
        title={`${t('news.pickerTitle')}: ${country.toUpperCase()}`}
        onPress={getLanguageSelector}
        containerStyle={styles.pickerButton}
      />
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
