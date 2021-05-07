import {StyleSheet} from 'react-native';

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerEdit: {
      justifyContent: 'flex-end',
    },
    headerInfo: {},
    headerDate: {
      // width: '20%',
      paddingRight: 40,
      flexShrink: 1,
      fontSize: 15,
    },
    postHeaderInfoTitle: {
      marginTop: 10,
      fontSize: 18,
    },
    headerIcons: {
      flexShrink: 0,
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
