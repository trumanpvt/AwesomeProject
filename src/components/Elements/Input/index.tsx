import React from 'react';
import {I18nManager, StyleSheet} from 'react-native';

import {Input} from 'react-native-elements';

interface Props {
  inputStyle?: any;
  [x: string]: any;
}

const InputCustom = ({inputStyle = {}, ...props}: Props) => {
  const styles = StyleSheet.create({
    input: {
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      flexDirection: 'row-reverse',
    },
  });

  return (
    <Input
      {...props}
      inputStyle={{
        ...inputStyle,
        ...styles.input,
      }}
    />
  );
};

export default InputCustom;
