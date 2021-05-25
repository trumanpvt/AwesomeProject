import {StyleSheet} from 'react-native';

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    post: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerEdit: {
      justifyContent: 'flex-end',
    },
    headerInfo: {},
    headerDate: {
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
    title: {
      marginVertical: 20,
      fontSize: 20,
      textAlign: 'center',
    },
    text: {
      fontSize: 15,
    },
    postImage: {
      marginTop: 20,
      flex: 1,
      height: 200,
      width: undefined,
    },
    postVideo: {
      marginTop: 20,
    },
    titleInput: {
      fontSize: 20,
    },
    textInput: {
      flex: 1,
      fontSize: 15,
    },
    postEditMediaContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    postEditMedia: {
      flexDirection: 'row',
    },
    postEditMediaTitle: {
      marginBottom: 20,
      fontSize: 20,
      textAlign: 'center',
    },
    postEditMediaWrap: {
      flexShrink: 0,
      flex: 1,
    },
    postEditImageContainer: {
      flex: 1,
      width: '100%',
      height: 150,
    },
    postEditImage: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
    postEditVideo: {},
    postEditMediaControls: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
    },
  });
};
