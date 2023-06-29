import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  loadingModal: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
  },
});

export default Styles;
