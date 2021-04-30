import React from 'react';

import {Button, ButtonProps, useTheme} from 'react-native-elements';

interface AdditionalProps {
  type?: string;
  color?: string;
}

const ButtonCustom = (
  props: ButtonProps,
  {type, color = 'primary'}: AdditionalProps,
) => {
  const {theme} = useTheme();

  props.buttonStyle = props.buttonStyle || {};

  // props.buttonStyle = {
  //   ...props.buttonStyle,
  //   backgroundColor: theme.colors[color],
  // };

  props.buttonStyle.backgroundColor = theme.colors[color];

  return (
    <Button
      title={type}
      {...props}
      // buttonStyle={{
      //   ...props.buttonStyle,
      //   backgroundColor: theme.colors[color],
      // }}
    />
  );
};

export default ButtonCustom;
