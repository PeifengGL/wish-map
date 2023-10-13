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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  goBackButton: { marginVertical: 16 },
  saveButton: { fontSize: 14, fontFamily: 'Lato', color: '#0057B8' },
  editUserPhoneContainer: { marginHorizontal: 16 },
  editUserPhoneTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Lato',
    color: '#0057B8',
    marginBottom: 8,
  },
  editUserPhoneDescription: {
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
  editUserPhoneInputContainer: {
    borderColor: '#0057B8',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  editUserPhoneInput: {
    flex: 1,
  },
  editUserPhoneInputError: {
    fontSize: 11,
    fontFamily: 'Lato',
    fontWeight: '500',
    color: '#F23A3C',
    marginTop: 4,
    marginLeft: 16,
  },
  toast: {
    backgroundColor: 'rgba(50, 47, 53, 0.9)',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    paddingHorizontal: 16,
    borderLeftColor: 'rgba(50, 47, 53, 0.9)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastText: { fontSize: 15, color: '#fff', marginVertical: 12 },
});

export default Styles;
