import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#EBF1F9',
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
  headerFlex: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  saveButton: { fontSize: 14, fontFamily: 'Lato', color: '#0057B8' },
  editUserEmailContainer: { marginHorizontal: 16 },
  editUserEmailTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#0057B8',
    marginBottom: 8,
  },
  editUserEmailDescription: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
    color: '#75787B',
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: '#D9D9D9',
    marginVertical: 24,
  },
  editUserMailInputContainer: {
    borderColor: '#0057B8',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  editUserMailInput: {
    flex: 1,
  },
  editUserMailInputError: {
    fontSize: 11,
    fontFamily: 'Lato',
    fontWeight: '500',
    color: '#F23A3C',
    marginTop: 4,
    marginLeft: 16,
  },
});

export default Styles;
