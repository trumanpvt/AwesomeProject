import React, {useRef, useState} from 'react';
import {
  Body,
  Button,
  Content,
  Drawer,
  Header,
  Icon,
  Left,
  Right,
  Title,
  Text,
} from 'native-base';

import SideMenu from '../Popup/sideMenu';

import styles from './style.js';

const AppHeader = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  let drawer = useRef(null);

  const openDrawer = () => {
    drawer._root.open();
  };

  const closeDrawer = () => {
    drawer._root.close();
  };

  return (
    <Header style={styles.header}>
      <Left style={styles.headerLeft}>
        <Content>
          <Button
            transparent
            onPress={props.navigation.openDrawer}
            style={styles.menuBtn}>
            <Icon type="MaterialIcons" name="menu" />
          </Button>
        </Content>
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
