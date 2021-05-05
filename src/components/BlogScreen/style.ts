import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';

export default () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 20,
      backgroundColor: 'white',
    },
    emptyText: {
      fontSize: 20,
      textAlign: 'center',
    },
    post: {
      shadowColor: 'red',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    postHeader: {},
    postDate: {},
    Title: {},
    postText: {},
    postImg: {},
  });
};
