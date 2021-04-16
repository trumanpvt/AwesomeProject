import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
    width: '100%',
  },
  flashmode: {},
  controlsBottom: {
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
