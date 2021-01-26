import React, {useState, useEffect} from 'react';
import {Button, Container, Content, Form, Input, Item, Text} from 'native-base';

import styles from './style.js';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

const ProfileScreen = (props) => {
  const [user] = useState(useSelector((state) => state.user));

  const [displayName, setDisplayName] = useState(user.displayName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [email, setEmail] = useState(user.email);

  const handleCancelDataChange = () => {
    setDisplayName(user.displayName);
    setPhoneNumber(user.phoneNumber);
    setPhotoURL(user.photoURL);
  };

  const handleDataChange = () => {
    user
      .updateProfile({
        displayName,
        photoURL,
        phoneNumber,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const handleCancelPasswordChange = () => {
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handlePasswordChange = () => {};

  return (
    <Container style={styles.container}>
      <Content>
        <Text style={styles.heading}>Profile</Text>
        <Form style={styles.form}>
          <Item style={styles.input}>
            <Input
              textContentType="username"
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Username"
            />
            <Text>Username</Text>
          </Item>

          <Item style={styles.input}>
            <Input
              textContentType="telephoneNumber"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone"
            />
            <Text>Phone</Text>
          </Item>
          <View style={styles.buttons}>
            <Button
              full
              rounded
              primary
              style={styles.button}
              onPress={handleDataChange}>
              <Text>Save</Text>
            </Button>
            <Button
              full
              rounded
              danger
              style={styles.button}
              onPress={handleCancelDataChange}>
              <Text>Cancel</Text>
            </Button>
          </View>

          <Text style={styles.heading}>Change password</Text>
          <Item style={styles.input}>
            <Input
              textContentType="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Old password"
            />
            <Text>Old password</Text>
          </Item>
          <Item style={styles.input}>
            <Input
              textContentType="password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New password"
            />
            <Text>New password</Text>
          </Item>
          <Item style={styles.input}>
            <Input
              textContentType="password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
            />
            <Text>Confirm password</Text>
          </Item>
          <View style={styles.buttons}>
            <Button
              full
              rounded
              primary
              style={styles.button}
              onPress={handlePasswordChange}>
              <Text>Save</Text>
            </Button>
            <Button
              full
              rounded
              danger
              style={styles.button}
              onPress={handleCancelPasswordChange}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
};

ProfileScreen.propTypes = {};
export default ProfileScreen;
