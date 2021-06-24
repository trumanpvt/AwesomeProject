import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';

export default () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalWrap: {
      width: 300,
      borderRadius: 20,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    modalWrapLandscape: {
      width: '100%',
      backgroundColor: 'white',
    },
    modalTabsContainer: {
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'row',
    },
    tabIndicator: {
      backgroundColor: theme.colors?.primary,
    },
    modalTabLeft: {
      borderTopLeftRadius: 20,
      backgroundColor: theme.colors?.primary,
    },
    modalTabRight: {
      borderTopRightRadius: 20,
      backgroundColor: theme.colors?.primary,
    },
    modalTabLandscape: {
      backgroundColor: theme.colors?.primary,
    },
    modalTabTitle: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 'bold',
    },
    buttonTab: {
      width: '50%',
      borderRadius: 50,
    },
    form: {
      padding: 35,
    },
    input: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    button: {
      marginTop: 20,
    },
    socialButton: {
      width: '100%',
      marginBottom: 20,
      marginHorizontal: 0,
    },
    socialButtonTitle: {
      fontSize: 16,
    },
    socialButtonExist: {
      marginBottom: 0,
    },
    headerText: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 10,
    },
    messageText: {
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    error: {
      marginTop: 20,
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
};
