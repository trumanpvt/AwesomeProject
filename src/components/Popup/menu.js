import React from 'react';
import {Text} from 'react-native';
import {Button, Container, Content, Icon} from 'native-base';
import styles from './style.js';

const MenuPopup = (props) => (
  <Container style={styles.container}>
    <Content style={styles.content}>
      <Button transparent onPress={props.handleMenuClick} style={styles.btn}>
        <Icon type="MaterialIcons" name="close" style={styles.icon} />
      </Button>
      <Text style={styles.text}>MENU</Text>
    </Content>
  </Container>
);

export default MenuPopup;
