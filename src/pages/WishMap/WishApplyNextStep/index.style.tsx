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
});

export default Styles;
