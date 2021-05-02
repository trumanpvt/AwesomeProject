import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Button} from 'react-native-elements';

import {observer} from 'mobx-react-lite';

import {signOut} from '../../util/auth';
import {useStores} from '../../store';

import styleSheet from './style';

interface Props {
  navigation: any;
}

const User = ({navigation}: Props) => {
  const {modalStore, userStore} = useStores();
  const {setModal} = modalStore;

  const {user} = userStore;

  const styles = styleSheet();

  const handleSignOut = () => {
    signOut().then(() => {
      navigation.navigate('HomeScreen');
    });
  };

  const renderUser = () => {
    const {displayName, email, photoURL} = user || {};

    const userName = displayName || email || '';

    return (
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => navigation.navigate('ProfileScreen')}>
        <Avatar
          rounded
          size="small"
          source={
            photoURL
              ? {
                  uri: photoURL,
                }
              : undefined
          }
          title={userName[0].toUpperCase()}
          overlayContainerStyle={styles.avatarOverlay}
          titleStyle={styles.avatarPlaceholder}
        />
        <Text style={styles.userName}>{userName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.userContent}>
      {!user ? (
        <Button
          onPress={() => setModal({type: 'auth'})}
          title="SignIn/SignUp"
          containerStyle={styles.signBtnContainer}
          buttonStyle={styles.signInBtn}
          titleStyle={styles.signBtnText}
        />
      ) : (
        <>
          {renderUser()}
          <Button
            onPress={handleSignOut}
            title="SignOut"
            containerStyle={styles.signBtnContainer}
            buttonStyle={styles.signOutBtn}
            titleStyle={styles.signBtnText}
          />
        </>
      )}
    </View>
  );
};

export default observer(User);
