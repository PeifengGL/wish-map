import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: '#ebf1f9' },
  headerBlock: { overflow: 'hidden', paddingBottom: 5 },
  headerBlockShadow: {
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  headerButtonContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  capsuleButtonScrollView: {
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 16,
  },
  capsuleButtonContainer: { marginRight: 8 },
  filterResultTitle: {
    marginTop: 24,
    color: '#75787B',
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 12,
  },
  projectCardContainer: { marginHorizontal: 16, marginBottom: 16 },
  noResultContainer: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 24,
  },
  modalizeFooterContainer: {
    width: '100%',
    marginVertical: 8,
    position: 'absolute',
    bottom: 34,
  },
  modalizeFooterButton: {
    backgroundColor: '#0057B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 40,
  },
  modalizeFooterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 14,
  },
});

export default Styles;
