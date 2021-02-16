import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrap: {
    width: 250,
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
    // padding: 0,
  },
  modalTabs: {
    borderRadius: 20,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  buttonTab: {
    width: '50%',
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
  googleButton: {
    width: '100%',
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
