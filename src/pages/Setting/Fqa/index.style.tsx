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
    color: '#75787B',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 28,
  },
  fqaItemContainer: {
    borderColor: '#0057B880',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  fqaTopBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fqaItemTitle: {
    marginVertical: 12,
    color: '#0057B8',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '500',
    flex: 1,
  },
  fqaBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  fqaGoBack: { position: 'absolute', left: 0, top: 0 },
  fqaHeaderText: {
    marginBottom: 14,
    marginTop: 10,
    color: '#75787B',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Lato',
  },
  fqaContent: { flex: 1 },
  fqaExpandSeparator: { backgroundColor: '#CCCCCC', marginBottom: 12 },
  fqaExpandText: {
    color: '#2D2D2D',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '400',
  },
  fqaContainer: { flex: 1, paddingHorizontal: 16, paddingVertical: 24 },
});

export default Styles;
