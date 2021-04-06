import React from 'react';
import {View} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import {useRoute, useNavigation} from '@react-navigation/native';

import styles from './style.js';

export interface Props {
  openDrawer: void;
  name: string;
}

const AppHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Header>
        <Left>
          <Button transparent onPress={navigation.openDrawer}>
            <Icon type="MaterialIcons" name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{route.name}</Title>
        </Body>
        <Right>
          {/*<Button transparent>*/}
          {/*  <Icon type="MaterialIcons" name="person" />*/}
          {/*</Button>*/}
        </Right>
      </Header>
    </View>
  );
};

export default AppHeader;
