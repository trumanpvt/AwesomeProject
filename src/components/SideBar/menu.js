import React from 'react';
import {Image} from 'react-native';
import {Container, Content, List, ListItem, Text} from 'native-base';
import User from './user';

const SideBar = (props) => {
  console.log(props);
  return (
    <Container>
      <User />
      <Content>
        <List
          dataArray={props.state.routeNames}
          renderRow={(data) => {
            return (
              <ListItem button onPress={() => props.navigation.navigate(data)}>
                <Text>{data}</Text>
              </ListItem>
            );
          }}
        />
      </Content>
    </Container>
  );
};

export default SideBar;
