import React from 'react';

import {Button, useTheme} from 'react-native-elements';

interface Props {
  rounded?: boolean;
  raised?: boolean;
  type?: 'solid' | 'clear' | 'outline';
  color?: string;
  buttonStyle?: any;
  containerStyle?: any;
  [x: string]: any;
}

const ButtonCustom = ({
  rounded,
  raised = true,
  type = 'solid',
  color = 'primary',
  buttonStyle,
  containerStyle,
  ...props
}: Props) => {
  const {theme} = useTheme();

  buttonStyle = {
    ...buttonStyle,
    paddingVertical: 13,
  };

  if (type !== 'clear') {
    buttonStyle.backgroundColor = {...theme.colors}[color];
  }

  if (rounded) {
    containerStyle = {
      ...containerStyle,
      borderRadius: 30,
    };
  }

  return (
    <Button
      {...props}
      buttonStyle={buttonStyle}
      containerStyle={containerStyle}
      raised={raised}
      type={type}
    />
  );
};

export default ButtonCustom;
