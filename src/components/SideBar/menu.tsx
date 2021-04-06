import React from 'react';
import {SafeAreaView} from 'react-native';
import {List, ListItem, Text} from 'native-base';
import User from './user';

import styles from './style.js';
import {useNavigation} from '@react-navigation/native';

export interface Props {
  routeNames: string[];
}

const SideBar = ({routeNames}: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <User />
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
