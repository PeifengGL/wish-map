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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    marginBottom: 14,
    marginTop: 10,
    color: '#75787B',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Lato',
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  headerGoBack: { position: 'absolute', left: 0, top: 0 },
  contentBlock: { flex: 1 },
  contentContainer: { paddingHorizontal: 16, marginTop: 24 },
  contentText: { color: '#000000', fontSize: 16, fontFamily: 'Lato' },
});

export default Styles;
