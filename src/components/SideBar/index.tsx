import React from 'react';

import {useStores} from '../../store';

import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {Button, useTheme} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import User from './user';

import styles from './style.js';

interface Props {
  routeNames: string[];
  navigation: any;
}

const SideBar = ({navigation, routeNames}: Props) => {
  const {language, setLanguage} = useStores().localeStore;

  const {theme} = useTheme();

  const {t} = useTranslation();

  const routes = routeNames.filter((route) => route !== 'ProfileScreen');

  const changeLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';

    setLanguage(newLanguage);
  };

  const renderListItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate(item)}>
      <Text style={styles.listItemText}>{t(`routes.${item}`)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.sideBar}>
      <User navigation={navigation} />
      <FlatList
        data={routes}
        renderItem={renderListItem}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
      <Button
        icon={{
          name: 'language',
          size: 20,
          color: 'white',
        }}
        title={language}
        containerStyle={styles.languageBtn}
        buttonStyle={{backgroundColor: theme.colors?.primary}}
        titleStyle={styles.languageBtnText}
        onPress={changeLanguage}
      />
    </SafeAreaView>
  );
};

export default SideBar;
