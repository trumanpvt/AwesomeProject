import React from 'react';

import {Text, View} from 'react-native';
import ButtonCustom from '../Button';

import {sendEmailVerification} from '../../util/auth';

import styleSheet from './style';

interface Props {
  setCloseModal: () => void;
}

const ModalConfirmEmail = ({setCloseModal}: Props) => {
  const styles = styleSheet();

  return (
    <View style={styles.form}>
      <Text style={styles.headerText}>
        Please confirm your email, confirmation link was sent to you
      </Text>
      <ButtonCustom
        rounded
        onPress={sendEmailVerification}
        buttonStyle={styles.button}
        title="Send verification again"
      />
      <ButtonCustom
        rounded
        color="error"
        onPress={setCloseModal}
        buttonStyle={styles.button}
        title="Close"
      />
    </View>
  );
};

export default ModalConfirmEmail;
