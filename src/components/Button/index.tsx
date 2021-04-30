import React from 'react';

import {Button, useTheme} from 'react-native-elements';

interface AdditionalProps {
  type?: string;
  color?: string;
  buttonStyle?: any;
  [x: string]: any;
}

const ButtonCustom = ({
  type,
  color = 'primary',
  buttonStyle = {},
  ...props
}: AdditionalProps) => {
  const {theme} = useTheme();

  buttonStyle = {
    ...buttonStyle,
    backgroundCOlor: {...theme.colors}[color],
  };

  return <Button {...props} buttonStyle={buttonStyle} />;
};

export default ButtonCustom;
