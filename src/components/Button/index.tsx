import React from 'react';

import {Button, useTheme} from 'react-native-elements';

interface AdditionalProps {
  type?: string;
  color?: string;
}

const ButtonCustom = (
  props: any,
  {type, color = 'primary'}: AdditionalProps,
) => {
  const {theme} = useTheme();

  const modifiedProps = {...props};
  modifiedProps.buttonStyle = {
    ...props.buttonStyle,
    backgroundColor: {...theme.colors}[color],
  };

  return <Button {...modifiedProps} />;
};

export default ButtonCustom;
