import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';

export default () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
    },
  });
};
