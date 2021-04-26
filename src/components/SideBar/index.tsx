import React from 'react';

import {useStores} from '../../store';

import {SafeAreaView, View, Text} from 'react-native';
import {List, ListItem, Button} from 'native-base';
import User from './user';

import styles from './style.js';

interface Props {
  routeNames: string[];
  navigation: any;
}

const SideBar = ({navigation, routeNames}: Props) => {
  const {locale} = useStores().localeStore;

  const routes = routeNames.filter((route) => route !== 'ProfileScreen');

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
        <Button light style={styles.languageBtn}>
          <Text style={styles.buttonText}>{locale}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SideBar;
