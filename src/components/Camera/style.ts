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
    controlsLandscape: {
      flex: 1,
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      // alignItems: 'flex-start',
    },
    controlsAdditional: {
      flex: 1,
      width: '100%',
      marginBottom: 50,
    },
    controlsAdditionalLandscape: {
      flex: 1,
      marginRight: 20,
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
    controlsMain: {
      marginBottom: 20,
      flex: 0,
      width: '90%',
      maxWidth: 300,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    controlsMainLandscape: {
      marginRight: 20,
      flex: 0,
      height: '90%',
      maxHeight: 250,
      alignSelf: 'center',
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
    },
    controlBtn: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 15,
      elevation: 5,
    },
    pending: {
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
