import {StyleSheet} from 'react-native';

export default (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    heading: {
      marginTop: 20,
      fontSize: 20,
      textAlign: 'center',
    },
    form: {},
    input: {
      marginTop: 20,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      marginTop: 20,
      width: '45%',
    },
    buttonSave: {
      backgroundColor: colors.primary,
    },
    buttonCancel: {
      backgroundColor: colors.error,
    },
    avatarContainer: {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    avatarOverlay: {
      backgroundColor: colors.error,
    },
    avatarPlaceholder: {
      color: 'white',
    },
    imageEmpty: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: 'red',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageEmptyText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
    },
    imageChange: {
      paddingLeft: 0,
      paddingRight: 0,
      position: 'absolute',
      bottom: -5,
      right: -5,
      width: 27,
      height: 27,
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageChangePlus: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
