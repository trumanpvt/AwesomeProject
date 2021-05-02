import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';

export default () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    indicator: {
      backgroundColor: theme.colors?.primary,
    },
    tabContainer: {
      backgroundColor: 'transparent',
    },
    tabTitle: {
      color: theme.colors?.primary,
      fontSize: 15,
    },
  });
};
