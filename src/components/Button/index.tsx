import React from 'react';

import {Button, useTheme} from 'react-native-elements';

interface Props {
  rounded?: boolean;
  raised?: boolean;
  color?: string;
  titleColor?: string;
  buttonStyle?: any;
  containerStyle?: any;
  titleStyle?: any;
  [x: string]: any;
}

const ButtonCustom = ({
  rounded,
  raised = true,
  color = 'primary',
  titleColor,
  buttonStyle,
  containerStyle,
  titleStyle,
  ...props
}: Props) => {
  const {theme} = useTheme();

  buttonStyle = {
    ...buttonStyle,
    backgroundColor:
      color === 'transparent' ? 'transparent' : {...theme.colors}[color],
    paddingVertical: 13,
  };

  buttonStyle = {
    ...buttonStyle,
    backgroundColor:
      color === 'transparent' ? 'transparent' : {...theme.colors}[color],
    paddingVertical: 13,
  };

  containerStyle = {
    ...containerStyle,
    // width: '100%',
  };

  if (rounded) {
    containerStyle.borderRadius = 30;
  }

  titleStyle = {
    ...titleStyle,
    color: titleColor ? {...theme.colors}[titleColor] : '#fff',
  };

  return (
    <Button
      {...props}
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
      containerStyle={containerStyle}
      raised={raised}
    />
  );
};

export default ButtonCustom;
