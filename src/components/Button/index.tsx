import React from 'react';

import {Button, useTheme} from 'react-native-elements';

interface Props {
  rounded?: boolean;
  color?: string;
  buttonStyle?: any;
  [x: string]: any;
}

const ButtonCustom = ({
  rounded,
  color = 'primary',
  buttonStyle = {},
  ...props
}: Props) => {
  const {theme} = useTheme();

  buttonStyle = {
    ...buttonStyle,
    backgroundColor: {...theme.colors}[color],
  };

  if (rounded) {
    buttonStyle.borderRadius = 20;
  }

  return <Button {...props} buttonStyle={buttonStyle} />;
};

export default ButtonCustom;
