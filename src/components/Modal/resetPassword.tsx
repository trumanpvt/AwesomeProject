import React, {useState} from 'react';

import {Text, View} from 'react-native';

import {sendPasswordResetEmail} from '../../util/auth';

import styleSheet from './style';
import ButtonCustom from '../Button';
import {Input} from 'react-native-elements';

interface Props {
  email: string | undefined;
  setModal: (data: {type: string}) => void;
}

const ModalResetPassword = ({email = '', setModal}: Props) => {
  const [userEmail, setUserEmail] = useState(email);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [error, setError] = useState(null);

  const styles = styleSheet();

  const handleSendPasswordResetEmail = () => {
    sendPasswordResetEmail(userEmail)
      .then(() => {
        setIsLinkSent(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const renderLinkSent = () => {
    return (
      <>
        <Text style={styles.error}>
          Password reset link was sent to your email
        </Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <ButtonCustom
          rounded
          onPress={handleSendPasswordResetEmail}
          containerStyle={styles.button}
          title="Send link again"
        />
      </>
    );
  };

  const renderEmail = () => {
    return (
      <>
        <Input
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="Email"
          value={userEmail}
          onChangeText={setUserEmail}
          leftIcon={{type: 'material', name: 'email'}}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <ButtonCustom
          rounded
          onPress={handleSendPasswordResetEmail}
          containerStyle={styles.button}
          title="Reset password"
        />
      </>
    );
  };

  return (
    <View style={styles.form}>
      <Text style={styles.headerText}>Reset password</Text>
      {isLinkSent ? renderLinkSent() : renderEmail()}
      <ButtonCustom
        rounded
        color="error"
        onPress={() => setModal({type: 'auth'})}
        containerStyle={styles.button}
        title={isLinkSent ? 'Close' : 'Cancel'}
      />
    </View>
  );
};

export default ModalResetPassword;
