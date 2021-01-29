import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    width: '45%',
  },
  imageContainer: {
    position: 'relative',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imageChange: {
    padding: 0,
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 30,
    height: 30,
    borderRadius: 50,
    // backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageChangePlus: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
  },
});
