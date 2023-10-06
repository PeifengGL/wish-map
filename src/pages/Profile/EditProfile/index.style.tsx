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
    paddingHorizontal: 16,
  },
  headerFlex: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#75787B',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 28,
  },
  goBackButton: { marginVertical: 16 },
  editDoneButton: { fontSize: 14, fontFamily: 'Lato', color: '#0057B8' },
  editProfileContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 24,
  },
  changeProfileAvatarButton: { position: 'absolute', bottom: 0, right: 0 },
  editProfileBlock: { marginHorizontal: 16 },
  editProfileField: { marginVertical: 12 },
  editProfileFieldLabel: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: '500',
    color: '#1A1A1A',
  },
  readOnly: {
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '500',
    color: '#909090',
  },
  editProfileFieldButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#0057B8',
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 8,
  },
  editProfileFieldButtonText: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#0057B8',
    marginVertical: 12,
  },
  noProfileFieldText: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#CCCCCC',
    marginVertical: 12,
    fontWeight: '500',
  },
  modalHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderText: { marginVertical: 36 },
  modalHeaderCloseButton: { position: 'absolute', right: 16 },
  chooseAvatarOptionsContainer: { marginBottom: 28, marginHorizontal: 16 },
  chooseAvatarOptionButton: {
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderRadius: 50,
  },
  chooseAvatarOptionButtonText: { color: 'white', marginVertical: 12 },
  removeAvatarButtonFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeAvatarButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#FF585D',
  },
  removeAvatarButtonText: {
    color: '#FF585D',
    marginVertical: 12,
    marginLeft: 6,
  },
});

export default Styles;
