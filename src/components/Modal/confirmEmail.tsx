import React from 'react';

import {Text, View} from 'react-native';
import ButtonCustom from '../Elements/Button';

import {sendEmailVerification} from '../../util/auth';

import styleSheet from './style';
import {useTranslation} from 'react-i18next';

interface Props {
  setCloseModal: () => void;
}

const ModalConfirmEmail = ({setCloseModal}: Props) => {
  const {t} = useTranslation();

  const styles = styleSheet();

  return (
    <View style={styles.form}>
      <Text style={styles.headerText}>{t('modal.confirmEmailMessage')}</Text>
      <ButtonCustom
        rounded
        onPress={sendEmailVerification}
        containerStyle={styles.button}
        title={t('modal.button.resetPasswordAgain')}
      />
      <ButtonCustom
        rounded
        color="error"
        onPress={setCloseModal}
        containerStyle={styles.button}
        title={t('misc.close')}
      />
    </View>
  );
};

export default ModalConfirmEmail;
