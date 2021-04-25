import React from 'react';
import {View} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';

interface Props {
  openDrawer: () => void;
  name: string;
}

const AppHeader = ({openDrawer, name}: Props) => {
  return (
    <View>
      <Header>
        <Left>
          <Button transparent onPress={openDrawer}>
            <Icon type="MaterialIcons" name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{name}</Title>
        </Body>
        <Right />
      </Header>
    </View>
  );
};

export default AppHeader;
