import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  privacyContentHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyContentHeaderTitle: {
    color: '#75787B',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 36,
  },
  closePrivacyButton: {
    position: 'absolute',
    right: 16,
  },
  closePrivacyIcon: {
    width: 48,
    height: 48,
  },
  privacyContentContainer: {
    marginHorizontal: 16,
  },
  privacyBlockTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0057B8',
    marginBottom: 8,
  },
  privacyBlockContent: {
    fontSize: 16,
    color: '#2D2D2D',
    marginBottom: 24,
  },
});

export default Styles;
