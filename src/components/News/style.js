import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // container: {
  //   padding: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#43a1c9',
  // },
  articles: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  article: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
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
  articleImg: {width: 'auto'},
  articleData: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  articleSource: {},
  articleDate: {},
});
