import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-elements';

export default () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    sideBar: {
      paddingLeft: 15,
    },
    userContent: {
      marginTop: 20,
      marginBottom: 20,
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatarPlaceholder: {
      color: 'white',
    },
    avatarOverlay: {
      backgroundColor: theme.colors?.error,
    },
    userName: {
      marginLeft: 20,
      fontSize: 17,
      color: '#000',
    },
    listItemText: {
      fontSize: 17,
    },
    signBtnContainer: {
      width: 200,
    },
    signInBtn: {
      backgroundColor: theme.colors?.primary,
    },
    signOutBtn: {
      backgroundColor: theme.colors?.error,
    },
    signBtnText: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    languageBtnContainer: {
      marginTop: 30,
      width: 100,
    },
    languageBtn: {
      backgroundColor: theme.colors?.primary,
    },
    languageBtnText: {
      paddingVertical: 5,
      textTransform: 'uppercase',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 17,
      textAlign: 'center',
    },
  });
};
