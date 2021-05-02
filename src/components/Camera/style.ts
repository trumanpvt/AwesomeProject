import {StyleSheet} from 'react-native';

export default () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    controls: {
      flex: 1,
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    controlsTop: {
      flex: 1,
      width: '100%',
      marginBottom: 50,
    },
    flashContainer: {
      borderRadius: 50,
      overflow: 'hidden',
    },
    flashAuto: {
      backgroundColor: '#34A34F',
    },
    flashOff: {
      backgroundColor: '#3B5998',
    },
    flashOn: {
      backgroundColor: '#DD5144',
    },
    controlsBottom: {
      marginBottom: 20,
      flex: 0,
      width: '90%',
      maxWidth: 300,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    controlBtn: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 15,
    },
    pending: {
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
