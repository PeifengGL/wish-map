import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
  },
  background: {
    width: '100%',
    aspectRatio: 1.5,
    height: undefined,
  },
  settingsButton: {
    width: 48,
    height: 48,
    top: 46,
    right: 16,
    position: 'absolute',
  },
  card: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export default Styles;
