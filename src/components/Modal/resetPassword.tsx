import React, {useState} from 'react';

import {Text, View} from 'react-native';

import {sendPasswordResetEmail} from '../../util/auth';

import ButtonCustom from '../Elements/Button';
import InputCustom from '../Elements/Input';
import {useTranslation} from 'react-i18next';

import styleSheet from './style';

interface Props {
  email: string | undefined;
  setModal: (data: {type: string}) => void;
}

const ModalResetPassword = ({email = '', setModal}: Props) => {
  const [userEmail, setUserEmail] = useState(email);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [error, setError] = useState(null);

  const {t} = useTranslation();

  const styles = styleSheet();

  const handleSendPasswordResetEmail = () => {
    sendPasswordResetEmail(userEmail)
      .then(() => {
        setIsLinkSent(true);
      })
      .catch(err => {
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
          title={t('modal.button.resetPasswordAgain')}
        />
      </>
    );
  };

  const renderEmail = () => {
    return (
      <>
        <InputCustom
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
          disabled={!userEmail}
          onPress={handleSendPasswordResetEmail}
          containerStyle={styles.button}
          title={t('modal.button.resetPassword')}
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
        title={isLinkSent ? t('misc.close') : t('misc.cancel')}
      />
    </View>
  );
};

export default ModalResetPassword;
