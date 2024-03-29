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
  fieldContainer: { marginBottom: 20 },
  fieldHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  fieldHeaderText: { fontSize: 14, fontWeight: '500', color: '#1A1A1A' },
  fieldHeaderRequiredText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '400',
    color: '#909090',
  },
  fieldTextInputStyle: {
    borderColor: '#0057B899',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  fieldMultilineTextInputStyle: {
    borderColor: '#0057B899',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 192,
    textAlignVertical: 'top',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: 4,
    marginBottom: 24,
  },
  renderSelectedImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  renderSelectedImage: {
    width: 60,
    height: 80,
    marginVertical: 8,
    borderRadius: 8,
  },
  renderSelectedImageText: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  blockTitleText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#0057B8',
    marginBottom: 16,
  },
  genderContainer: { flexDirection: 'row' },
  genderItemContainer: { flex: 0.5 },
  birthdayContainer: {
    alignSelf: 'flex-start',
  },
  selectBirthdayButton: {
    borderColor: '#0057B8',
    borderRadius: 30,
    borderWidth: 1,
    alignSelf: 'center',
  },
  selectBirthdayButtonTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  selectBirthdayButtonText: {
    fontSize: 12,
    color: '#0057B8',
    marginVertical: 12,
    marginRight: 24,
  },
  medicalRecordsButton: {
    borderWidth: 1,
    borderColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 20,
  },
  medicalRecordsButtonText: {
    marginVertical: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#0057B8',
  },
  otherBlockContainer: { flexDirection: 'row', marginBottom: 12 },
  otherBlockContainer2: { flexDirection: 'row' },
  otherRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
  },
  otherRowCheckBoxText: { fontSize: 14, color: '#2D2D2D', marginLeft: 4 },
  policyButtonText: { color: '#0057B8' },
  readTermsText: { fontSize: 14, color: '#2D2D2D' },
  sendApplyButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 50,
  },
  sendApplyButtonText: { marginVertical: 14 },
  selectBirthdayModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  selectBirthdayModalContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },
  selectImageModalContainer: { justifyContent: 'center', alignItems: 'center' },
  selectImageModalHeaderTitle: { marginVertical: 36 },
  selectImageModalClose: { position: 'absolute', right: 16 },
  selectImageButtonsContainer: { marginBottom: 28, marginHorizontal: 16 },
  selectImageModalFileButton: {
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderRadius: 50,
  },
  selectImageModalAlbumButton: {
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  selectImageModeButtonText: { color: 'white', marginVertical: 12 },
  showImageOpenModalContainer: {
    position: 'absolute',
    zIndex: 10000,
    backgroundColor: '#00000066',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showImageOpenModalCloseButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});

export default Styles;
