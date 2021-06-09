import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 10,
    marginTop: 50,
    marginVertical: 15,
  },
  title: {
    color: 'black',
    marginTop: 30,
    marginBottom: 25,
    fontSize: 22,
    marginRight: 10,
    textAlign: 'justify',
  },
  text: {
    color: 'black',
    marginTop: 100,
    margin: 30,
    fontSize: 16,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    backgroundColor: '#DBEBFF',
    height: 35,
    fontSize: 22,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  flagInputText: {
    color: 'black',
    fontSize: 25,
    backgroundColor: '#DBEBFF',
    borderBottomColor: 'rgba(0,0,0,0.92)',
    borderBottomWidth: 2,
    height: 30,
    marginRight: 50,
  },
  flagStyle: {
    width: 1,
    height: 1,
    borderWidth: 0,
  },
  backButton: {position: 'absolute', zIndex: 999999999, left: 20},
  inputName: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    backgroundColor: '#DBEBFF',
    height: 50,
    fontSize: 22,
  },
  button: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 6,
  },
  textButton: {
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});
