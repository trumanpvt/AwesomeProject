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
  modalTabsContainer: {
    borderRadius: 20,
    display: 'flex',
    // flexWrap: 'nowrap',
    flexDirection: 'row',
    // backgroundColor: 'transparent',
  },
  modalTabs: {
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: 'transparent',
  },
  modalTab: {
    // borderRadius: 20,
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
