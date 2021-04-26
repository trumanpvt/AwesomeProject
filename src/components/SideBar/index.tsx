import React from 'react';

import {useStores} from '../../store';

import {SafeAreaView, View, Text} from 'react-native';
import {List, ListItem, Button, Icon} from 'native-base';
import User from './user';

import styles from './style.js';

interface Props {
  routeNames: string[];
  navigation: any;
}

const SideBar = ({navigation, routeNames}: Props) => {
  const {language, setLanguage} = useStores().localeStore;

  const routes = routeNames.filter((route) => route !== 'ProfileScreen');

  const changeLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';

    setLanguage(newLanguage);
  };

  return (
    <SafeAreaView>
      <User navigation={navigation} />
      <List
        dataArray={routes}
        renderRow={(data: string) => {
          return (
            <ListItem
              style={styles.listItem}
              button
              onPress={() => navigation.navigate(data)}>
              <Text>{data}</Text>
            </ListItem>
          );
        }}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
      <View>
        <Button info style={styles.languageBtn} onPress={changeLanguage}>
          <Icon type="MaterialIcons" name="language" />
          <Text style={styles.languageBtnText}>{language}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SideBar;
