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
  },
  modalTabsContainer: {
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  modalTabs: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTab: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
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
