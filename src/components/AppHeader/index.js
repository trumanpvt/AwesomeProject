import React from 'react';
import {View} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';

import styles from './style.js';

const AppHeader = (props) => {
  return (
    <View style={styles.header}>
      <Header>
        <Left>
          <Button
            transparent
            onPress={props.scene.descriptor.navigation.openDrawer}>
            <Icon type="MaterialIcons" name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{props.scene.route.name}</Title>
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

AppHeader.propTypes = {};
export default AppHeader;
