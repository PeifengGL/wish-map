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
  saveButtonText: { fontSize: 14, fontFamily: 'Lato', color: '#0057B8' },
  editUserAddressContainer: { marginHorizontal: 16 },
  editUserAddressTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#0057B8',
    marginBottom: 8,
  },
  editUserAddressDescription: {
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
  editUserAddressInputContainer: {
    borderColor: '#0057B8',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  editUserAddressInput: {
    flex: 1,
  },
  editUserZipAndCityInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    marginHorizontal: 5,
    color: '#0057B8',
  },
  editUserZipInput: {
    display: 'flex',
    flex: 2,
    borderColor: '#0057B8',
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  editUserCityInput: {
    display: 'flex',
    flex: 5,
    borderColor: '#0057B8',
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});

export default Styles;
