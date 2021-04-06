import React from 'react';
import {SafeAreaView} from 'react-native';
import {List, ListItem, Text} from 'native-base';
import User from './user';

import styles from './style.js';

export interface Props {
  routeNames: string[];
  navigation: any;
}

const SideBar = ({navigation, routeNames}: Props) => {
  return (
    <SafeAreaView>
      <User navigation={navigation} />
      <List
        dataArray={routeNames}
        renderRow={(data: string) => {
          if (data === 'ProfileScreen') {
            return null;
          }
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
    </SafeAreaView>
  );
};

export default SideBar;
