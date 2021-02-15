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
      width: 10,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  modalTabs: {
    borderRadius: 20,
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
