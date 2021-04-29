import {StyleSheet} from 'react-native';

export default (colors: any) =>
  StyleSheet.create({
    indicator: {
      backgroundColor: colors.primary,
    },
    tabContainer: {
      backgroundColor: 'transparent',
    },
    tabTitle: {
      color: colors.primary,
      fontSize: 15,
    },
  });
