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
  contentSubTitleText: { fontSize: 22, color: '#0057B8', marginBottom: 24 },
  fieldContainer: { marginBottom: 20 },
  fieldHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
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
    padding: 16,
    marginBottom: 4,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: 12,
    marginBottom: 24,
  },
  serviceTimeHeader: {
    borderBottomColor: '#0057B880',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderOptionContainer: { flexDirection: 'row' },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
  },
  birthdaySelectionContainer: {
    alignSelf: 'flex-start',
  },
  birthdaySelectionButton: {
    borderColor: '#0057B8',
    borderRadius: 30,
    borderWidth: 1,
    alignSelf: 'center',
  },
  birthdaySelectionButtonTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  birthdaySelectionButtonText: {
    fontSize: 12,
    color: '#0057B8',
    marginVertical: 12,
    marginRight: 24,
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volunteerTypeSelectionContainer: { marginRight: 6 },
  volunteerTypeTitle: { fontSize: 14, color: '#2D2D2D' },
  volunteerTypeContent: { fontSize: 12, marginLeft: 30, color: '#4B4B4B' },
  checkBox: {
    flex: 1,
    height: 20,
  },
  volunteerServiceTimeContainer: {
    flexDirection: 'row',
    borderColor: '#0057B880',
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  volunteerServiceTimeBlockContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volunteerServiceTimeText: {
    marginHorizontal: 8,
    marginVertical: 8,
    fontSize: 12,
  },
  privateInfoContainer: { flexDirection: 'row' },
  privateText1: { fontSize: 14, color: '#2D2D2D', marginLeft: 4 },
  privateText2: { color: '#0057B8' },
  privateText3: { fontSize: 14, color: '#2D2D2D' },
  emptyBlock: {
    marginHorizontal: 8,
    marginVertical: 8,
    fontSize: 12,
  },
});

export default Styles;
