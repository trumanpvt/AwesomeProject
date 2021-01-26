import React, {useState} from 'react';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';

import styles from './style.js';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

const ProfileScreen = (props) => {
  const [user] = useState(useSelector((state) => state.user));

  const [displayName, setDisplayName] = useState(user.displayName || null);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL || null);
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
          <Item style={styles.input} floatingLabel>
            <Label>Username</Label>
            <Input
              textContentType="username"
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Username"
            />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label>Phone</Label>
            <Input
              textContentType="telephoneNumber"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone"
            />
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
          <Item style={styles.input} floatingLabel>
            <Label>Old password</Label>
            <Input
              textContentType="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Old password"
            />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label>New password</Label>
            <Input
              textContentType="password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New password"
            />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label>Confirm password</Label>
            <Input
              textContentType="password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
            />
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
