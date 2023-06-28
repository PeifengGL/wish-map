import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#EBF1F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#75787B',
    fontSize: 24,
    fontWeight: '500',
    marginVertical: 28,
  },
  headerGoBack: { position: 'absolute', left: 16 },
  scrollView: { flex: 1 },
  scrollViewContainer: { marginHorizontal: 16 },
  contentTitleContainer: {
    marginVertical: 24,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EBF1F9',
  },
  contentTitleText: {
    color: '#0057B8',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Styles;
