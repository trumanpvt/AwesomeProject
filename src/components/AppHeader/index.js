import React from 'react';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';

import styles from './style.js';

const AppHeader = (props) => {
  return (
    <Header style={styles.header}>
      <Left style={styles.headerLeft}>
        <Button
          transparent
          onPress={props.scene.descriptor.navigation.openDrawer}
          style={styles.menuBtn}>
          <Icon type="MaterialIcons" name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon type="MaterialIcons" name="person" />
        </Button>
      </Right>
    </Header>
  );
};

AppHeader.propTypes = {
  // mode: PropTypes.string,
  // setMode: PropTypes.func,
};
export default AppHeader;
