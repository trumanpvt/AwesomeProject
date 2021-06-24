import React from 'react';

import {Text, View} from 'react-native';
import ButtonCustom from '../Elements/Button';

import styleSheet from './style';
import {useTranslation} from 'react-i18next';

interface Props {
  message: string | undefined;
  setCloseModal: () => void;
}

const ModalMessage = ({message = '', setCloseModal}: Props) => {
  const {t} = useTranslation();

  const styles = styleSheet();

  return (
    <View style={styles.form}>
      <Text style={styles.headerText}>{message}</Text>
      <ButtonCustom
        rounded
        color="error"
        onPress={setCloseModal}
        buttonStyle={styles.button}
        title={t('misc.ok')}
      />
    </View>
  );
};

export default ModalMessage;
