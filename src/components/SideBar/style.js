import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  userContent: {
    marginTop: 20,
    marginLeft: 17,
    marginBottom: 20,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userPic: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  userName: {
    marginLeft: 20,
    color: '#000',
  },
  listItem: {
    marginLeft: 0,
    paddingLeft: 17,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  languageBtn: {
    marginTop: 20,
    marginLeft: 17,
    paddingRight: 15,
  },
  languageBtnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
