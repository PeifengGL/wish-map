import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 6,
    marginRight: 7,
  },
  checkbox: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#00BAB3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxFill: {
    width: 22,
    height: '100%',
    borderRadius: 4,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
