import React from 'react';
import {SafeAreaView} from 'react-native';
import {List, ListItem, Text} from 'native-base';
import User from './user';

import styles from './style.js';

const SideBar = (props) => {
  return (
    <SafeAreaView>
      <User navigation={props.navigation} />
      <List
        dataArray={props.state.routeNames}
        renderRow={(data) => {
          if (data === 'ProfileScreen') {
            return null;
          }
          return (
            <ListItem
              style={styles.listItem}
              button
              onPress={() => props.navigation.navigate(data)}>
              <Text>{data}</Text>
            </ListItem>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default SideBar;
