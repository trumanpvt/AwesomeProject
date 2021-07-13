import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
  form: {
    padding: 35,
  },
  button: {
    marginTop: 20,
  },
  messageText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  nameInput: {
    fontSize: 20,
  },
});
