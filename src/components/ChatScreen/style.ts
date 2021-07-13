import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  chat: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  chatTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
  },
  chatBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMessage: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    lineHeight: 20,
  },
  chatDate: {},
  chatContainer: {
    flex: 1,
  },
});
