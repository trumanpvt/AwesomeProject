import React from 'react';
import {View} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import {useTranslation} from 'react-i18next';

interface Props {
  openDrawer: () => void;
  name: string;
}

const AppHeader = ({openDrawer, name}: Props) => {
  const {t} = useTranslation();

  return (
    <View>
      <Header>
        <Left>
          <Button transparent onPress={openDrawer}>
            <Icon type="MaterialIcons" name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{t(name)}</Title>
        </Body>
        <Right />
      </Header>
    </View>
  );
};

export default AppHeader;
