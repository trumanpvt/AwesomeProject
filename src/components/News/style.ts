import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  article: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 30,
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
  },
  articleDescription: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    lineHeight: 20,
  },
  articleImg: {
    height: 200,
    flex: 1,
    width: undefined,
  },
  articleData: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  articleSource: {},
  articleDate: {},
  error: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
  },
});