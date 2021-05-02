import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pickerTitle: {
    fontSize: 15,
  },
  picker: {
    width: 90,
  },
  articles: {
    flex: 1,
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
    flex: 1,
    height: 200,
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
