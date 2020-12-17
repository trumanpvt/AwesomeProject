import React, {useState} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';

import MenuPopup from '../Popup/menu';

import styles from './style.js';

const AppHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Header style={styles.header}>
      <Left style={styles.headerLeft}>
        <Button transparent onPress={handleMenuClick} style={styles.menuBtn}>
          <Icon type="MaterialIcons" name="menu" />
        </Button>
        {showMenu ? <MenuPopup handleMenuClick={handleMenuClick} /> : null}
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
