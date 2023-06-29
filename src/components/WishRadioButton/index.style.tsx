import { StyleSheet, Dimensions } from 'react-native';

const screenWidthRate = 360 / Dimensions.get('window').width;

const Styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 25,
    width: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00BAB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerSelected: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#00BAB3',
  },
  radioInnerUnSelected: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  radioItem: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D2D2D',
    marginLeft: 16,
  },
});

export default Styles;
