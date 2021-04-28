import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
  placeholder: {
    color: 'white',
  },
  userName: {
    marginLeft: 20,
    fontSize: 17,
    color: '#000',
  },
  listItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listItemText: {
    fontSize: 17,
  },
  signBtn: {
    width: 200,
  },
  signButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  languageBtn: {
    marginTop: 35,
    width: 100,
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
