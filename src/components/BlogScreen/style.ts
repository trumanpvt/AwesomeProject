import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';

export default (color?: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 20,
      backgroundColor: 'white',
    },
    emptyText: {
      fontSize: 20,
      textAlign: 'center',
    },
    post: {
      margin: 10,
      padding: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor: 'white',
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    postHeaderInfo: {},
    postHeaderInfoDate: {},
    postHeaderInfoTitle: {
      marginTop: 10,
      fontSize: 18,
      lineHeight: 22,
    },
    postHeaderIcons: {
      flexDirection: 'row',
    },
    postDate: {},
    Title: {},
    postText: {},
    postImg: {},
    postEdit: {},
    postModal: {},
  });
};
