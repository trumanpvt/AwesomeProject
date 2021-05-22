import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  pickerButton: {
    marginHorizontal: 10,
  },
  pickerOptions: {
    textTransform: 'uppercase',
  },
  articles: {
    flex: 1,
    marginTop: 10,
  },
  article: {
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
  articleImgContainer: {
    flex: 1,
    height: 200,
    width: '100%',
  },
  articleImg: {
    flex: 1,
    height: undefined,
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
