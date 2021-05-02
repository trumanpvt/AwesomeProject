import React from 'react';

import {Text, View} from 'react-native';
import ButtonCustom from '../Button';

import styleSheet from './style';

interface Props {
  message: string | undefined;
  setCloseModal: () => void;
}

const ModalMessage = ({message = '', setCloseModal}: Props) => {
  const styles = styleSheet();
  return (
    <View style={styles.form}>
      <Text style={styles.headerText}>{message}</Text>
      <ButtonCustom
        rounded
        color="error"
        onPress={setCloseModal}
        buttonStyle={styles.button}
        title="OK"
      />
    </View>
  );
};

export default ModalMessage;
